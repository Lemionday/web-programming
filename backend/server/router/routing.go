package router

import (
	"github.com/gofiber/fiber/v2"
)

func RegisterPublicRoutes(app *fiber.App) {
	// public
	app.Get("/api", func(c *fiber.Ctx) error {
		return c.JSON(&fiber.Map{
			"message": "Hello from server",
		})
	})

	// app.Post("/add", func(c *fiber.Ctx) error {
	// 	acc := schematic.Account{
	// 		Username: "tester",
	// 		Password: "testerpwd",
	// 	}
	// 	schematic.AddAccount(&acc)
	// 	return nil
	// })

	app.Post("/login", loginHandler)

	// app.Static("/", "./frontend/build")
	// app.Static("*", "./frontend/build/index.html")
	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(fiber.StatusNotFound)
	})
}

func hello(c *fiber.Ctx) error {
	return c.SendString("I made a ☕ for you!")
}

func RegisterProtectedRoutes(app *fiber.App) {
	app.Get("/hello", hello)
}