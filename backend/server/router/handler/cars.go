package handler

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
	"go.mongodb.org/mongo-driver/mongo"
)

func GetCarsStatistics(c *fiber.Ctx) error {
	period := c.Query("period")

	lrr_duration := bson.M{
		"$lt": time.Date(2022, time.December, 31, 0, 0, 0, 0, time.UTC),
	}

	switch period {
	case "month":
		lrr_duration["$gt"] = time.Now().AddDate(0, -1, 0)
	case "quater":
		lrr_duration["$gt"] = time.Now().AddDate(0, -3, 0)
	case "year":
		startDateOfYear := time.Date(2022, time.January, 1, 0, 0, 0, 0, time.UTC)
		lrr_duration["$gt"] = startDateOfYear
		log.Info().Msg(startDateOfYear.String())
	case "all":
		break
	default:
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
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
			log.Error().Err(err).Msg("")
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.JSON(cars)

	default:
		cacheCenters := cached.GetCenters()
		switch _, err := cacheCenters.Get(context.TODO(), center_id); err {
		case nil:
			log.Info().Msgf("Get all cars from center: %s", center_id)
		case redis.Nil:
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"err": fmt.Sprintf("No center with center id: %s", center_id),
			})
		default:
			log.Error().Err(err).Msg("")
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		cars, err := schematic.GetAllCars(bson.M{
			"center_registered":         bson.M{"$eq": center_id},
			"least_recently_registered": lrr_duration,
		})

		if err != nil {
			log.Error().Err(err).Msg("")
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.JSON(cars)
	}
}

func GetCarInformation(c *fiber.Ctx) error {
	id := c.Params("id")
	car, err := schematic.GetCar(bson.M{"car_id": bson.M{"$eq": id}})
	if err != nil {
		log.Error().Err(err).Msg("")

		if err == mongo.ErrNoDocuments {
			return c.SendStatus(fiber.StatusNotFound)
		}

		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(*car)
}

func GetInvalidatedCars(c *fiber.Ctx) error {
	last := c.Query("last", "")
	cars, last_date, err := schematic.GetAllCarsWithPagin(bson.M{}, last, 100)
	if err != nil {
		log.Error().Err(err).Msg("")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"err": err,
		})
	}

	return c.JSON(fiber.Map{
		"last_date": last_date,
		"cars":      cars,
	})
}
