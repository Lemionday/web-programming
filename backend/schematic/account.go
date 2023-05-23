package schematic

import (
	"context"
	"crypto/rand"
	"errors"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrUserAlreadyExisted = errors.New("user already existed")
)

type Account struct {
	Id             primitive.ObjectID `json:"-" bson:"_id"`
	Username       string             `json:"username" bson:"username" validate:"required,min=3,max=25"`
	Role           Role               `json:"role" bson:"role"`
	Center         string             `json:"center" bson:"center"`
	Password       string             `json:"password" bson:"-" validate:"required,min=8"`
	HashedPassword []byte             `json:"-" bson:"hashpassword"`
	Salt           []byte             `json:"-" bson:"salt"`
	// CreatedAt      time.Time
	// ModifiedAt     time.Time
}

func (a Account) GetID() string {
	return a.Id.Hex()
}

func (account *Account) validate() (errors []*ErrorValidate) {
	err := validate.Struct(account)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorValidate
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return
}

func ValidateAccountDataFromRequest(c *fiber.Ctx) error {
	data := new(Account)
	if err := c.BodyParser(data); err != nil {
		log.Error().Stack().Err(err).Msg("")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	errors := data.validate()
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}

	c.Locals("username", data.Username)
	c.Locals("password", data.Password)

	return c.Next()
}

func GenerateSalt() ([]byte, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return nil, err
	}
	return salt, nil
}

func AddAccount(account *Account) error {
	salt, err := GenerateSalt()
	if err != nil {
		return err
	}

	toHash := append([]byte(account.Password), salt...)
	hashedPassword, err := bcrypt.GenerateFromPassword(toHash, bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	account.Salt = salt
	account.HashedPassword = hashedPassword

	if account.Role == Unauthorized {
		account.Role = AuthorizedFromRegistryCenter
	}

	accountsCol := database.GetCol("accounts")
	_, err = accountsCol.InsertOne(context.TODO(), account)
	if mongo.IsDuplicateKeyError(err) {
		return ErrUserAlreadyExisted
	} else if err != nil {
		return err
	}
	return nil
}

func Authenticate(username, password string) (*Account, error) {
	var account Account
	err := database.GetCol("accounts").FindOne(context.TODO(), bson.D{{"username", username}}).Decode(&account)
	if err != nil {
		return nil, err
	}

	salted := append([]byte(password), account.Salt...)
	if err := bcrypt.CompareHashAndPassword(account.HashedPassword, salted); err != nil {
		return nil, err
	}
	return &account, nil
}

func ListAllAccounts(start string, nPerPage int64) ([]Account, string, error) {
	return getAllWithPaging[Account]("accounts", bson.M{}, start, nPerPage)
}

func DeleteAccount(username string) (int64, error) {
	res, err := database.GetCol("accounts").DeleteOne(context.TODO(), bson.D{{"username", username}, {"role", bson.D{{"$ne", Admin}}}})
	if err != nil {
		return res.DeletedCount, err
	}

	return res.DeletedCount, nil
}
