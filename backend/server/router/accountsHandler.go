package router

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
)

func getAccounts(c *fiber.Ctx) error {
	if c.Locals("role").(schematic.Role) >= schematic.AuthorizedFromMainCenter {
		accounts, err := schematic.ListAllAccounts()
		if err != nil {
			log.Error().Err(err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"err": err,
			})
		}

		return c.JSON(accounts)
	}

	return c.SendStatus(fiber.StatusForbidden)
}

func deleteAccount(c *fiber.Ctx) error {
	if c.Locals("role").(schematic.Role) >= schematic.AuthorizedFromMainCenter {
		count, err := schematic.DeleteAccount(c.Params("username"))
		if err != nil {
			log.Error().Err(err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"err": err,
			})
		}

		return c.JSON(fiber.Map{
			"msg": fmt.Sprintf("Deleted %d account(s)", count),
		})
	}

	return c.SendStatus(fiber.StatusForbidden)
}
