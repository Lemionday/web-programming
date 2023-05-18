package router

import (
	"context"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/cached"
	"github.com/theLemionday/web-programming/schematic"
	"go.mongodb.org/mongo-driver/bson"
)

func getCarsStatisticsHandler(c *fiber.Ctx) error {
	period := c.Query("period")
	lrr_duration := bson.M{
		"$lt": time.Now(),
	}
	// duration := bson.M{
	// 	"least_recently_registered": lrr_duration,
	// }

	switch period {
	case "month":
		lrr_duration["$gt"] = time.Now().AddDate(0, -1, 0)
	case "quater":
		lrr_duration["$gt"] = time.Now().AddDate(0, -3, 0)
	case "year":
		lrr_duration["$gt"] = time.Now().AddDate(-1, 0, 0)
	default:
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"err": fmt.Sprintf("Invalid period %s", period),
		})
	}

	center_id := c.Query("center")
	switch center_id {
	case "main":
		if c.Locals("role").(schematic.Role) < schematic.AuthorizedFromMainCenter {
			return c.SendStatus(fiber.StatusUnauthorized)
		}
		cars, err := schematic.GetAllCars(bson.M{
			"least_recently_registered": lrr_duration,
		})

		if err != nil {
			log.Error().Err(err)
			c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.JSON(cars)
	default:
		cacheCenters := cached.GetCacheCenters()
		switch _, err := cacheCenters.Get(context.TODO(), center_id); err {
		case nil:
			break
		case redis.Nil:
			c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"err": fmt.Sprintf("No center with center id: %s", center_id),
			})
		default:
			log.Error().Err(err)
			c.SendStatus(fiber.StatusInternalServerError)
		}

		cars, err := schematic.GetAllCars(bson.M{
			"center_registered": bson.M{"$eq": center_id},
			// "least_recently_registered": lrr_duration,
		})

		if err != nil {
			log.Error().Err(err)
			c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.JSON(cars)
	}
}
