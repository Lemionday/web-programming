package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/theLemionday/web-programming/schematic"
	"github.com/theLemionday/web-programming/server/middleware"
	"github.com/theLemionday/web-programming/server/router/handler"
)

func RegisterRoutes(app *fiber.App, jwtSecret string) {
	api := app.Group("/api")

	api.Get("/api", func(c *fiber.Ctx) error {
		return c.JSON(&fiber.Map{
			"message": "Hello from server",
		})
	})

	api.Get("/setuptest", TestSetupAddCarres)
	api.Post("/login", schematic.ValidateAccountDataFromRequest, handler.Login)
	api.Get("/centers", handler.GetCentersWithPaging)
	api.Get("/center/getall", handler.GetAllCenters)

	app.Static("/api", "./public")

	// jwt
	middleware.SetupJWT(app, jwtSecret)
	protected := app.Group("/protected", middleware.AuthRequired)
	// api.Use(middleware.AuthRequired)

	// protected
	api.Get("/hello", hello)

	account_grp := protected.Group("/account", middleware.RoleRequired(schematic.AuthorizedFromMainCenter))
	account_grp.Post("/signup", schematic.ValidateAccountDataFromRequest, handler.SignupAccount)
	account_grp.Get("/page", handler.GetAccountsWithPaging)
	account_grp.Get("/getall", handler.GetAllAccountsHandler)
	account_grp.Delete("/delete/:username", handler.DeleteAccount)
	account_grp.Get("/check/:username", handler.IsUsernameExisted)

	// @query:
	// period: month | quarter | year
	// center: main | <:center_id>
	// app.Get("/cars/statistics/invalidated", handler.GetInvalidatedCars)
	car_grp := protected.Group("/car")
	car_grp.Get("/statistics", handler.GetAllCarsStatistics)
	car_grp.Get("/information/:plate", handler.GetCarInformation)

	protected.Get("/owner/:id", handler.GetOwner)

	// public
}

func hello(c *fiber.Ctx) error {
	return c.SendString("I made a ☕ for you!")
}
