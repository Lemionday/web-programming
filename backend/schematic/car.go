package schematic

import (
	"context"
	"time"

	"github.com/theLemionday/web-programming/database"
	"go.mongodb.org/mongo-driver/bson"
)

type FuelType string

const (
	Gas    FuelType = "gas"
	Diesel FuelType = "diesel"
)

type Car struct {
	Id                      string    `json:"car_id" bson:"car_id"`
	Manufacturer            string    `json:"manufacturer" bson:"manufacturer"`
	Model                   string    `json:"model" bson:"model"`
	Size                    []int     `json:"size" bson:"size"`
	FuelType                FuelType  `json:"fueltype" bson:"fueltype"`
	City                    string    `json:"city" bson:"city"`
	Plate                   string    `json:"plate" bson:"plate"`
	Vin                     string    `json:"vin" bson:"vin"`
	EngineNumber            string    `json:"engine_number" bson:"engine_number"`
	LeastRecentlyRegistered time.Time `json:"least_recently_registered" bson:"least_recently_registered"`
	Invalidate_date         time.Time `json:"invalidate_date" bson:"invalidate_date"`
	CenterRegistered        string    `json:"center_registered" bson:"center_registered"`
	RegisterNumber          string    `json:"register_number" bson:"register_number"`
	BillNumber              string    `json:"bill_number" bson:"bill_number"`
	OwnerId                 string    `json:"owner_id" bson:"owner_id"`
}

func GetAllCars(options bson.M) ([]Car, error) {
	car_coll := database.GetCol("cars")

	var cars_list []Car
	cur, err := car_coll.Find(context.TODO(), options)
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.TODO())

	if err := cur.All(context.TODO(), &cars_list); err != nil {
		return nil, err
	}

	return cars_list, nil
}

func GetCar(options bson.M) (*Car, error) {
	car_coll := database.GetCol("cars")

	var car Car
	if err := car_coll.FindOne(context.TODO(), options).Decode(&car); err != nil {
		return nil, err
	}

	return &car, nil
}
