package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/theLemionday/web-programming/schematic"
)

func signupHandler(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	isAdmin := claims["admin"].(bool)
	if isAdmin {
		newUser := new(schematic.Account)
		if err := c.BodyParser(newUser); err != nil {
			return c.SendStatus(404)
		}

		err := schematic.AddAccount(newUser)
		if err == schematic.ErrUserAlreadyExisted {
			return c.Status(fiber.ErrConflict.Code).SendString("User already existed")
		} else if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.SendStatus(fiber.StatusOK)
	}

	return c.SendStatus(fiber.StatusForbidden)
}
