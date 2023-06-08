package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
)

func AuthRequired(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	role := schematic.Role(claims["status"].(float64))
	c.Locals("role", role)
	if role == schematic.Unauthorized {
		log.Warn().Msgf("IP %s try to access protected route", c.IP())
		return c.SendStatus(fiber.StatusForbidden)
	}

	return c.Next()
}

func RoleRequired(role schematic.Role) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		if c.Locals("role").(schematic.Role) >= role {
			return c.Next()
		}

		return c.SendStatus(fiber.StatusForbidden)
	}
}
