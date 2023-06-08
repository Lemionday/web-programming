package schematic

import (
	"context"
	"time"

	"github.com/theLemionday/web-programming/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type FuelType string

const (
	Gas    FuelType = "gas"
	Diesel FuelType = "diesel"
)

type Car struct {
	Id                      primitive.ObjectID `json:"-" bson:"_id"`
	CarId                   string             `json:"car_id,omitempty" bson:"car_id"`
	Manufacturer            string             `json:"manufacturer,omitempty" bson:"manufacturer"`
	Model                   string             `json:"model,omitempty" bson:"model"`
	CarBoby                 string             `json:"carbody,omitempty" bson:"carbody"`
	Size                    []int              `json:"size,omitempty" bson:"size"`
	FuelType                FuelType           `json:"fueltype,omitempty" bson:"fueltype"`
	City                    string             `json:"city,omitempty" bson:"city"`
	Plate                   string             `json:"plate,omitempty" bson:"plate"`
	Vin                     string             `json:"vin,omitempty" bson:"vin"`
	EngineNumber            string             `json:"engine_number,omitempty" bson:"engine_number"`
	LeastRecentlyRegistered time.Time          `json:"least_recently_registered,omitempty" bson:"least_recently_registered"`
	InvalidateDate          time.Time          `json:"invalidate_date,omitempty" bson:"invalidate_date"`
	CenterRegistered        string             `json:"center_registered,omitempty" bson:"center_registered"`
	RegisterNumber          string             `json:"register_number,omitempty" bson:"register_number"`
	BillNumber              string             `json:"bill_number,omitempty" bson:"bill_number"`
	OwnerId                 string             `json:"owner_id,omitempty" bson:"owner_id"`
}

func (c Car) GetID() string {
	return c.Id.Hex()
}

func GetAllCars(filter primitive.M) ([]Car, error) {
	opts1 := options.Find().SetProjection(bson.D{
		{"manufacturer", 1},
		{"model", 1},
		{"city", 1},
		{"plate", 1},
		{"carbody", 1},
		{"owner_id", 1},
		{"least_recently_registered", 1},
		{"invalidate_date", 1}})
	car_coll := database.GetCol("cars")

	var cars_list []Car
	cur, err := car_coll.Find(context.TODO(), filter, opts1)
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

func GetAllCarsWithPagin(filter primitive.M, start_id string, nPerPage int64) ([]Car, string, error) {
	return getAllWithPaging[Car]("cars", filter, "invalidate_date", start_id, nPerPage)
}
