package logging

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/conf"
)

const (
	logsDir = "logs"
	logFile = "rfs.log"
	// testLogName = logFile + "_test"
)

func createLogDir() {
	if err := os.Mkdir(logsDir, 0744); err != nil && !os.IsExist(err) {
		log.Fatal().Err(err).Msg("Unable to create logs directory.")
	}
}

func SetupLogging(cfg *conf.Config, rootPath string) string {
	var logFilePath = filepath.Join(rootPath, logsDir, logFile)

	zerolog.SetGlobalLevel(zerolog.DebugLevel)

	var stdOutWriter = zerolog.ConsoleWriter{
		TimeFormat: "15:04",
	}
	switch cfg.Env {
	case "dev":
		stdOutWriter.Out = os.Stdout
	case "release":
		createLogDir()
		backupLastLog()
		logFile := openLogFile(logFilePath)
		stdOutWriter.Out = logFile
	default:
		fmt.Printf("Env not valid: %s\n", cfg.Env)
		os.Exit(2)
	}
	log.Logger = zerolog.New(stdOutWriter).With().Timestamp().Logger()

	return logFilePath
}

func backupLastLog() {
	tz, err := time.LoadLocation("Asia/Ho_Chi_Minh")
	if err != nil { // Always check errors even if they should not happen.
		panic(err)
	}
	timeStamp := time.Now().In(tz).Format("20060201_15_04_05")
	base := strings.TrimSuffix(logFile, filepath.Ext(logFile))
	bkpLogName := base + "_" + timeStamp + "." + filepath.Ext(logFile)
	bkpLogPath := filepath.Join(logsDir, bkpLogName)

	logFile, err := os.ReadFile(logFile)
	if err != nil {
		if os.IsNotExist(err) {
			return
		}
		log.Panic().Err(err).Msg("Error reading log file for backup")
	}

	if err = os.WriteFile(bkpLogPath, logFile, 0644); err != nil {
		log.Panic().Err(err).Msg("Error writing backup log file")
	}
}

func openLogFile(logFilePath string) *os.File {
	logFile, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		log.Panic().Err(err).Msg("Error while opening log file")
	}
	return logFile
}

// func currentDir() string {
// 	path, err := os.Executable()
// 	if err != nil {
// 		log.Panic().Err(err).Msg("Can't get current directory.")
// 	}
// 	return filepath.Dir(path)
// }
