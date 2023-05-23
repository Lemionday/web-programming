package router

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/database"
	"github.com/theLemionday/web-programming/schematic"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func clearAllFromColl(coll *mongo.Collection) {
	coll.DeleteMany(context.Background(), bson.D{{}})
	// indexModel := mongo.IndexModel{
	// 	Keys: bson.D{{"car_id", 1}},
	// }
	coll.Indexes().DropAll(context.Background())
	// coll.Indexes().CreateOne(context.Background(), indexModel)
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
		schematic.AddAccount(&account)
	}

	// for _, car := range data {
	// fmt.Println(json.MarshalIndent(car, "", "    "))
	// coll.InsertOne(context.Background(), car)
	// }
}

func testSetupAddAccounts(c *fiber.Ctx) error {
	var accounts = []schematic.Account{
		{Username: "tester", Password: "testerpwd", Role: schematic.Admin},
		{Username: "jsmith22", Password: "P@ssw0rd123!"},
		{Username: "emily_89", Password: "SecurePass789#"},
		{Username: "david_miller", Password: "Str0ngP@ssw0rd!"},
		{Username: "sarahjones", Password: "Passw0rd123$"},
		{Username: "alexander22", Password: "P@ssw0rd789!"},
		{Username: "lilywilson", Password: "StrongPass12#"},
		{Username: "mjohnson", Password: "P@ssw0rd345!"},
		{Username: "olivia_87", Password: "SecureP@ss123#"},
		{Username: "samuel89", Password: "Str0ngP@ssw0rd$"},
		{Username: "sophia_cole", Password: "Passw0rd789!"},
		{Username: "matthew34", Password: "P@ssw0rd123#"},
		{Username: "isabella_green", Password: "SecurePass12$"},
		{Username: "ethan_96", Password: "Str0ngP@ssw0rd!"},
		{Username: "mia_smith", Password: "Passw0rd345#"},
		{Username: "jacob85", Password: "P@ssw0rd789$"},
		{Username: "ava_miller", Password: "SecureP@ss123#"},
		{Username: "noah_parker", Password: "Str0ngP@ssw0rd$"},
		{Username: "emma_brown", Password: "Passw0rd789!"},
		// Add more accounts here...
	}

	for _, acc := range accounts {
		schematic.AddAccount(&acc)
	}
	return nil
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
	clearAllFromColl(accounts)
	path, _ := filepath.Abs("../database/data/final/accounts.json")
	addToColl(accounts, path)
	return nil
}
