package server

import "github.com/gofiber/fiber/v2"

func registerRoute(app *fiber.App) {
	app.Get("/hello", hello)
	app.Get("/api", func(c *fiber.Ctx) error {
		return c.JSON(&fiber.Map{
			"message": "Hello from server",
		})
	})

	// app.Static("/", "./frontend/build")
	// app.Static("*", "./frontend/build/index.html")
	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})
}

func hello(c *fiber.Ctx) error {
	return c.SendString("I made a ☕ for you!")
}
