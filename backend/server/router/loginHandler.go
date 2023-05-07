package router

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/theLemionday/web-programming/schematic"
	"github.com/theLemionday/web-programming/server/middleware"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func loginHandler(c *fiber.Ctx) error {
	data := new(schematic.Account)
	if err := c.BodyParser(data); err != nil {
		return c.SendStatus(404)
	}

	account, err := schematic.Authenticate(data.Username, data.Password)
	if err == mongo.ErrNoDocuments {
		c.SendString(fmt.Sprintf("No account with username %s", c.FormValue("username")))
		return c.SendStatus(fiber.StatusNotFound)
	} else if err == bcrypt.ErrMismatchedHashAndPassword {
		return c.Status(fiber.StatusUnauthorized).SendString("Wrong password")
	} else if err != nil {
		return err
	}

	token, err := middleware.GenerateJWT(account)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Cannot generate token for you!")
	}

	return c.JSON(fiber.Map{
		"token": token,
	})
}
