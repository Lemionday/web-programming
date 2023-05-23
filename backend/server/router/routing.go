package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/theLemionday/web-programming/schematic"
	"github.com/theLemionday/web-programming/server/middleware"
	"github.com/theLemionday/web-programming/server/router/handler"
)

func RegisterRoutes(app *fiber.App, jwtSecret string) {
	// public
	app.Get("/api", func(c *fiber.Ctx) error {
		return c.JSON(&fiber.Map{
			"message": "Hello from server",
		})
	})

	app.Get("/setuptest",
		// testSetupAddAccounts,
		TestSetupAddCarres)
	// app.Post("/add", func(c *fiber.Ctx) error {
	// 	acc := schematic.Account{
	// 		Username: "tester",
	// 		Password: "testerpwd",
	// 		Role:     schematic.Admin,
	// 	}
	// 	schematic.AddAccount(&acc)
	// 	return nil
	// })

	app.Post("/login", schematic.ValidateAccountDataFromRequest, loginHandler)
	app.Get("/centers", handler.GetCentersWithPaging)

	// jwt
	middleware.SetupJWT(app, jwtSecret)
	app.Use(middleware.AuthRequired)

	// protected
	app.Get("/hello", hello)

	app.Post("/account/signup", schematic.ValidateAccountDataFromRequest, signupHandler)
	app.Get("/accounts", handler.GetAccounts)
	app.Delete("/account/:username", handler.DeleteAccount)
	app.Get("/cars/statistics", handler.GetCarsStatistics)
	app.Get("/owner/:id", handler.GetOwner)
}

func hello(c *fiber.Ctx) error {
	return c.SendString("I made a ☕ for you!")
}
