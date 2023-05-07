package main

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	jwtware "github.com/gofiber/jwt/v3"
	"github.com/golang-jwt/jwt/v4"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowHeaders: "Origin, X-Requested-With, Content-Type, Accept",
	}))

	// Login route
	app.Post("/login", login)

	// Unauthenticated route
	app.Get("/", accessible)

	// JWT Middleware
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte("secret"),
	}))

	// Restricted Routes
	app.Get("/restricted", restricted)

	app.Listen(":3000")
}

type account struct {
	User string `json:"user"`
	Pass string `json:"pass"`
}

func login(c *fiber.Ctx) error {
	data := new(account)
	// user := c.FormValue("user")
	// pass := c.FormValue("pass")

	// Throws Unauthorized error

	if err := c.BodyParser(data); err != nil {
		return c.SendStatus(404)
	}

	user := data.User
	pass := data.Pass

	if user != "john" || pass != "doe" {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	// Create the Claims
	var claims jwt.MapClaims
	if user == "john" && pass == "doe" {
		claims = jwt.MapClaims{
			"name":  "John Doe",
			"admin": true,
			"exp":   time.Now().Add(time.Hour * 72).Unix(),
		}
	} else if user == "john1" && pass == "doe" {
		claims = jwt.MapClaims{
			"name":  "John Doe1",
			"admin": true,
			"exp":   time.Now().Add(time.Hour * 72).Unix(),
		}
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"token": t})
}

func accessible(c *fiber.Ctx) error {
	return c.SendString("Accessible")
}

func restricted(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	name := claims["name"].(string)
	return c.SendString("Welcome " + name)
}
