package router

import (
	"github.com/gofiber/fiber/v2"
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
			IsAdmin:  true,
		}
		schematic.AddAccount(&acc)
		return nil
	})

	app.Post("/login", loginHandler)

	// jwt
	middleware.SetupJWT(app, jwtSecret)

	// protected
	app.Get("/hello", hello)
	app.Post("/signup", signupHandler)
	// app.Static("/", "./frontend/build")
	// app.Static("*", "./frontend/build/index.html")
	// app.Use(func(c *fiber.Ctx) error {
	// 	return c.SendStatus(fiber.StatusNotFound)
	// })
}

func hello(c *fiber.Ctx) error {
	return c.SendString("I made a ☕ for you!")
}
