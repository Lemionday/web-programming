package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/conf"
	"github.com/theLemionday/web-programming/schematic"
)

func GetCentersWithPaging(c *fiber.Ctx) error {
	centers, last_center_id, err := schematic.GetAllCenterWithPaging(c.Query("last_id"), conf.NPerPage)
	if err != nil {
		log.Error().Err(err).Msg("")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if len(centers) <= 0 {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.JSON(fiber.Map{
		"centers": centers,
		"last_id": last_center_id,
	})
}
