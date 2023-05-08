package schematic

import (
	"context"
	"crypto/rand"
	"errors"

	"github.com/theLemionday/web-programming/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrUserAlreadyExisted = errors.New("User already existed")
)

type Account struct {
	Username       string `json:"username" bson:"username"`
	IsAdmin        bool   `json:"-" bson:"admin"`
	Department     string
	Password       string `json:"password" bson:"-"`
	HashedPassword []byte `json:"-"`
	Salt           []byte `json:"-"`
	// CreatedAt      time.Time
	// ModifiedAt     time.Time
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

	accountsCol := database.GetCol("accounts")
	_, err = accountsCol.InsertOne(context.TODO(), account)
	if mongo.IsDuplicateKeyError(err) {
		// fmt.Printf("Account with username %s already exists", account.Username)
		return ErrUserAlreadyExisted
	} else if err != nil {
		return err
	}
	return err
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
