package handler

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
)

func GetAccounts(c *fiber.Ctx) error {
	last_id := c.Query("last_id", "")
	if c.Locals("role").(schematic.Role) >= schematic.AuthorizedFromMainCenter {
		accounts, last_account_id, err := schematic.ListAllAccounts(last_id, 20)
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

	return c.SendStatus(fiber.StatusForbidden)
}

func DeleteAccount(c *fiber.Ctx) error {
	if c.Locals("role").(schematic.Role) >= schematic.AuthorizedFromMainCenter {
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

	return c.SendStatus(fiber.StatusForbidden)
}
