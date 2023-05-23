package handler

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/theLemionday/web-programming/schematic"
	"go.mongodb.org/mongo-driver/mongo"
)

func ownerHandler[T schematic.Owner](c *fiber.Ctx, id string) error {
	owner, err := schematic.GetOwner[T](id)
	if err == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"err": fmt.Sprintf("Owner with id %s not found", id),
		})
	}

	return c.JSON(owner)
}

func GetOwner(c *fiber.Ctx) error {
	id := c.Params("id")
	if strings.HasPrefix(id, "p") {
		return ownerHandler[schematic.OwnerIsPerson](c, id)
	} else {
		return ownerHandler[schematic.OwnerIsCompany](c, id)
	}
}
