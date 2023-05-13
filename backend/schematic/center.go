package schematic

import (
	"context"

	"github.com/theLemionday/web-programming/database"
	"go.mongodb.org/mongo-driver/bson"
)

type Center struct {
	Id      string `json:"id" bson:"id"`
	Name    string `json:"name" bson:"name"`
	Address string `json:"address" bson:"address"`
}

func GetAllCenter() ([]Center, error) {
	var centers []Center
	cur, err := database.GetCol("centers").Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.TODO())
	if err = cur.All(context.TODO(), &centers); err != nil {
		return nil, err
	}

	return centers, nil
}
