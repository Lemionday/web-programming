package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/theLemionday/web-programming/schematic"
)

func authRequired(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	c.Locals("role", schematic.Role(claims["status"].(float64)))

	return c.Next()
}
