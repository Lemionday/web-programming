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

func addTestAccounts(c *fiber.Ctx) error {
	var accounts = []schematic.Account{
		{Username: "tester", Password: "testerpwd", Role: schematic.Admin},
		{Username: "jsmith22", Password: "P@ssw0rd123!"},
		{Username: "emily_89", Password: "SecurePass789#"},
		{Username: "david_miller", Password: "Str0ngP@ssw0rd!"},
		{Username: "sarahjones", Password: "Passw0rd123$"},
		{Username: "alexander22", Password: "P@ssw0rd789!"},
		{Username: "lilywilson", Password: "StrongPass12#"},
		{Username: "mjohnson", Password: "P@ssw0rd345!"},
		{Username: "olivia_87", Password: "SecureP@ss123#"},
		{Username: "samuel89", Password: "Str0ngP@ssw0rd$"},
		{Username: "sophia_cole", Password: "Passw0rd789!"},
		{Username: "matthew34", Password: "P@ssw0rd123#"},
		{Username: "isabella_green", Password: "SecurePass12$"},
		{Username: "ethan_96", Password: "Str0ngP@ssw0rd!"},
		{Username: "mia_smith", Password: "Passw0rd345#"},
		{Username: "jacob85", Password: "P@ssw0rd789$"},
		{Username: "ava_miller", Password: "SecureP@ss123#"},
		{Username: "noah_parker", Password: "Str0ngP@ssw0rd$"},
		{Username: "emma_brown", Password: "Passw0rd789!"},
		// Add more accounts here...
	}

	for _, acc := range accounts {
		schematic.AddAccount(&acc)
	}
	return nil
}
