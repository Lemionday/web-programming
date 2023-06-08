package handler

import (
	"context"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/database"
	"github.com/theLemionday/web-programming/schematic"
	"github.com/theLemionday/web-programming/server/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func IsUsernameExisted(c *fiber.Ctx) error {
	username := c.Params("username")

	err := database.GetCol("accounts").FindOne(context.TODO(), bson.M{"username": bson.M{"$eq": username}}).Err()
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.SendStatus(fiber.StatusOK)
		}
		log.Error().Err(err).Msg("")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.SendStatus(fiber.StatusConflict)
}

func GetAccountsWithPaging(c *fiber.Ctx) error {
	last_id := c.Query("last_id", "")

	accounts, last_account_id, err := schematic.GetAllAccountsWithPaging(last_id, 20)
	if err != nil {
		log.Error().Err(err).Msg("")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"err": err,
		})
	}

	res := fiber.Map{
		"last_id":  last_account_id,
		"accounts": accounts,
	}

	if last_id == "" {
		count, err := schematic.CountDocumentsNoFilter("accounts")
		if err != nil {
			log.Error().Err(err).Msg("")
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		res["total_number_pages"] = count
	}

	return c.JSON(res)
}

func GetAllAccountsHandler(c *fiber.Ctx) error {
	accounts, err := schematic.GetAllAccounts()
	if err != nil {
		log.Error().Err(err).Msg("")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"data": accounts})
}

func DeleteAccount(c *fiber.Ctx) error {
	count, err := schematic.DeleteAccount(c.Params("username"))
	if err != nil {
		log.Error().Err(err).Msg("")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"err": err,
		})
	}

	return c.JSON(fiber.Map{
		"msg": fmt.Sprintf("Deleted %d account(s)", count),
	})
}

func SignupAccount(c *fiber.Ctx) error {
	err := schematic.AddAccount(&schematic.Account{
		Username: c.Locals("username").(string),
		Password: c.Locals("password").(string),
	})

	if err != nil {
		log.Error().Err(err).Msg("")

		if mongo.IsDuplicateKeyError(err) {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"err": "User already existed",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"err": err,
		})
	}

	return c.SendStatus(fiber.StatusOK)
}

func Login(c *fiber.Ctx) error {
	account, err := schematic.Authenticate(c.Locals("username").(string), c.Locals("password").(string))
	if err == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"err": fmt.Sprintf("No account with username %s", c.Locals("username")),
		})
	} else if err == bcrypt.ErrMismatchedHashAndPassword {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"err": "Wrong password",
		})
	} else if err != nil {
		log.Error().Stack().Err(err).Msg("")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	token, err := middleware.GenerateJWT(account)
	if err != nil {
		log.Error().Err(err).Msg("")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"err": "Cannot generate token for you!",
		})
	}

	return c.JSON(fiber.Map{
		"token":   token,
		"account": *account,
	})
}
