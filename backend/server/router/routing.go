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

	app.Post("/login", schematic.ValidateAccountDataFromRequest, handler.Login)
	app.Get("/centers", handler.GetCentersWithPaging)
	app.Get("/center/getall", handler.GetAllCenters)

	// jwt
	middleware.SetupJWT(app, jwtSecret)
	app.Use(middleware.AuthRequired)

	// protected
	app.Get("/hello", hello)

	account_grp := app.Group("/account", middleware.RoleRequired(schematic.AuthorizedFromMainCenter))
	account_grp.Post("/signup", schematic.ValidateAccountDataFromRequest, handler.SignupAccount)
	account_grp.Get("/page", handler.GetAccountsWithPaging)
	account_grp.Get("/getall", handler.GetAllAccountsHandler)
	account_grp.Delete("/delete/:username", handler.DeleteAccount)
	account_grp.Get("/check/:username", handler.IsUsernameExisted)

	// @query:
	// period: month | quarter | year
	// center: main | <:center_id>
	// app.Get("/cars/statistics/invalidated", handler.GetInvalidatedCars)
	app.Get("/cars/statistics", handler.GetCarsStatistics)
	app.Get("/car/information/:id", handler.GetCarInformation)
	app.Get("/owner/:id", handler.GetOwner)
}

func hello(c *fiber.Ctx) error {
	return c.SendString("I made a ☕ for you!")
}
