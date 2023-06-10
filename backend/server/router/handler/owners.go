package handler

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
	"go.mongodb.org/mongo-driver/mongo"
)

type Owner interface {
	schematic.OwnerIsPerson | schematic.OwnerIsCompany
}

func ownerHandler[T Owner](c *fiber.Ctx, owner *T, err error, id string) error {
	if err != nil {
		log.Error().Err(err).Msg("")
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"err": fmt.Sprintf("Owner with id %s not found", id),
			})
		}

		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(*owner)
}

func GetOwner(c *fiber.Ctx) error {
	id := c.Params("id")
	if strings.HasPrefix(id, "c") {
		owner, err := schematic.GetCompanyOwner(id)
		return ownerHandler[schematic.OwnerIsCompany](c, owner, err, id)
	} else {
		owner, err := schematic.GetPersonOwner(id)
		return ownerHandler[schematic.OwnerIsPerson](c, owner, err, id)
	}
}
