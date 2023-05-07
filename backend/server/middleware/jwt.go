package middleware

import (
	"time"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
	"github.com/golang-jwt/jwt/v4"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
)

var (
	JwtSecret []byte
)

func SetupJWT(app *fiber.App, jwtSecret string) {
	JwtSecret = []byte(jwtSecret)
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: JwtSecret,
	}))
}

func GenerateJWT(user *schematic.Account) (string, error) {
	claims := jwt.MapClaims{
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 1).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString(JwtSecret)
	if err != nil {
		log.Info().Err(err).Msgf("Error building JWT for user %s", user.Username)
		return "", err
	}

	return t, nil
}
