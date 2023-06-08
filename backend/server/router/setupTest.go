package router

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/database"
	"github.com/theLemionday/web-programming/schematic"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func clearAllFromColl(coll *mongo.Collection, indexField string) {
	coll.DeleteMany(context.Background(), bson.D{{}})

	indexModel := mongo.IndexModel{
		Keys:    bson.D{{indexField, 1}},
		Options: options.Index().SetUnique(true),
	}

	coll.Indexes().DropAll(context.Background())
	coll.Indexes().CreateOne(context.Background(), indexModel)
}

func addToColl(coll *mongo.Collection, dataPath string) {
	jsonFile, err := os.ReadFile(dataPath)
	if err != nil {
		log.Error().Err(err).Msg("")
	}

	var data []schematic.Account
	// fmt.Println(jsonFile)
	err = json.Unmarshal(jsonFile, &data)
	if err != nil {
		log.Error().Err(err).Msg("")
	}

	for _, account := range data {
		// coll.InsertOne(context.Background(), account)
		fmt.Println(account)
		schematic.AddAccount(&account)
	}

	// for _, car := range data {
	// fmt.Println(json.MarshalIndent(car, "", "    "))
	// coll.InsertOne(context.Background(), car)
	// }
}

func testSetupAddCarres(c *fiber.Ctx) error {
	// carres := database.GetCol("cars")
	// clearAllFromColl(carres)
	path, _ := filepath.Abs("../database/data/final/accounts.json")
	addToColl(nil, path)
	return nil
}

func TestSetupAddCarres(c *fiber.Ctx) error {
	accounts := database.GetCol("accounts")
	clearAllFromColl(accounts, "username")
	path, _ := filepath.Abs("../database/data/final/accounts.json")
	addToColl(accounts, path)
	return nil
}
