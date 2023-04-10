package conf

import (
	"log"
	"os"
)

type PortType = uint16

type Config struct {
	Host        string
	Port        string
	MongoURI    string
	MongoUser   string
	MongoPass   string
	MongoDbName string
	Env         string
}

func logAndPanic(varName string) {
	log.Fatalf("Environment variable %s not exists", varName)
}

func LoadConfig() *Config {
	config := new(Config)

	var ok bool
	if config.Host, ok = os.LookupEnv("HOST"); !ok {
		logAndPanic("HOST")
	}

	if config.Port, ok = os.LookupEnv("PORT"); !ok {
		logAndPanic("PORT")
	}

	if config.MongoURI, ok = os.LookupEnv("MONGO_URI"); !ok {
		logAndPanic("MONGO_URI")
	}

	if config.MongoUser, ok = os.LookupEnv("MONGO_USER"); !ok {
		logAndPanic("MONGO_USER")
	}

	if config.MongoPass, ok = os.LookupEnv("MONGO_PASS"); !ok {
		logAndPanic("MONGO_PASS")
	}

	if config.MongoDbName, ok = os.LookupEnv("MONGO_DB"); !ok {
		logAndPanic("MONGO_DB")
	}

	if config.Env, ok = os.LookupEnv("ENV"); !ok {
		logAndPanic("ENV")
	}
	return config
}

func LoadTestConfig() *Config {
	config := LoadConfig()
	config.MongoDbName += "_test"
	return config
}
