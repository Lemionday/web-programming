package router

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
	"github.com/theLemionday/web-programming/server/middleware"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func loginHandler(c *fiber.Ctx) error {
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
