package schematic

import (
	"context"

	"github.com/theLemionday/web-programming/conf"
	"github.com/theLemionday/web-programming/database"
	"go.mongodb.org/mongo-driver/bson"
)

func testSetup() {
	if err := database.NewConnection(conf.LoadTestConfig()); err != nil {
		panic(err)
	}

	if _, err := database.GetCol("accounts").DeleteMany(context.TODO(), bson.D{{}}); err != nil {
		panic(err)
	}
}
