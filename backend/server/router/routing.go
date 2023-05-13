package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
	"github.com/theLemionday/web-programming/server/middleware"
)

func RegisterRoutes(app *fiber.App, jwtSecret string) {
	// public
	app.Get("/api", func(c *fiber.Ctx) error {
		return c.JSON(&fiber.Map{
			"message": "Hello from server",
		})
	})

	app.Post("/add", func(c *fiber.Ctx) error {
		acc := schematic.Account{
			Username: "tester",
			Password: "testerpwd",
			Role:     schematic.Admin,
		}
		schematic.AddAccount(&acc)
		return nil
	})

	app.Post("/login", schematic.ValidateAccountDataFromRequest, loginHandler)
	app.Get("/centers", func(c *fiber.Ctx) error {
		centers, err := schematic.GetAllCenter()
		if err != nil {
			log.Error().Err(err)
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.JSON(centers)
	})

	// jwt
	middleware.SetupJWT(app, jwtSecret)
	app.Use(authRequired)

	// protected
	app.Get("/hello", hello)
	app.Post("/signup", schematic.ValidateAccountDataFromRequest, signupHandler)
	app.Get("/accounts", getAccounts)
	app.Delete("/account/:username", deleteAccount)
	// app.Static("/", "./frontend/build")
	// app.Static("*", "./frontend/build/index.html")
	// app.Use(func(c *fiber.Ctx) error {
	// 	return c.SendStatus(fiber.StatusNotFound)
	// })
}

func hello(c *fiber.Ctx) error {
	return c.SendString("I made a ☕ for you!")
}
