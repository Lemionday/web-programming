package middleware

import (
	"github.com/jaevor/go-nanoid"
	"github.com/rs/zerolog/log"
)

var canonicID func() string

func SetupNanoID(length int) {
	var err error
	canonicID, err = nanoid.Standard(length)
	if err != nil {
		log.Fatal().Msg("Setup NanoID failed")
	}
}

func GenerateNanoID() string {
	return canonicID()
}
