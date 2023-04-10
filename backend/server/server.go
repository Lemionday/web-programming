package server

import (
	"fmt"
	"io"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/conf"
	"github.com/theLemionday/web-programming/database"
	"github.com/theLemionday/web-programming/logging"
)

func getAbsPath() (absPath string) {
	absPath, err := filepath.Abs("..")
	if err != nil {
		panic(err)
	}
	return
}

func Start(cfg *conf.Config) {
	// database.NewConnection(cfg)

	app := fiber.New(fiber.Config{
		// Prefork:       true,
		CaseSensitive: true,
		StrictRouting: true,
		ServerHeader:  "Fiber",
		AppName:       "Web Development Project v0.1",
	})

	app.Use(cors.New())

	// setup logging to file in release env
	logFilePath := logging.SetupLogging(cfg, getAbsPath())
	logCfg := logger.Config{
		TimeZone: "Asia/Ho_Chi_Minh",
	}
	if cfg.Env == "release" {
		logFile, err := os.OpenFile(logFilePath, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
		if err != nil {
			log.Fatal().Msgf("error opening file: %v", err)
		}
		defer logFile.Close()
		logCfg.Output = io.MultiWriter(logFile)
	}
	app.Use(logger.New(logCfg))

	registerRoute(app)

	listenAddr := cfg.Host + ":" + cfg.Port
	go func() {
		if err := app.Listen(listenAddr); err != nil {
			log.Fatal().Err(err)
		}
	}()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	<-c // Blocks the main thread until an interrupt is reveived
	fmt.Println("Gracefully shutting down with 2 seconds timeout...")
	if err := app.ShutdownWithTimeout(2 * time.Second); err != nil {
		log.Info().Err(err)
	}

	log.Info().Msg("Running cleanup tasks...")
	database.CloseConnection()
	log.Info().Msg("App was successfully shutdown.")
}
