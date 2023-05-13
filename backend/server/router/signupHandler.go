package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
)

func signupHandler(c *fiber.Ctx) error {
	if c.Locals("role").(schematic.Role) >= schematic.AuthorizedFromMainCenter {
		err := schematic.AddAccount(&schematic.Account{
			Username: c.Locals("username").(string),
			Password: c.Locals("password").(string),
		})
		if err == schematic.ErrUserAlreadyExisted {
			return c.Status(fiber.ErrConflict.Code).JSON(fiber.Map{
				"err": "User already existed",
			})
		} else if err != nil {
			log.Error().Err(err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"err": err,
			})
		}

		return c.SendStatus(fiber.StatusOK)
	}

	return c.SendStatus(fiber.StatusForbidden)
}
