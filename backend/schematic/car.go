package schematic

type FuelType bool

const (
	Gas    FuelType = true
	Diesel FuelType = false
)

type Car struct {
	Id                    int16  `bson:"car_id"`
	CenterId              string `json:"center_id" bson:"center_id"`
	OwnerId               int16  `bson:"owner_id"`
	Manufacturer          string
	Model                 string
	Height, Width, Length float64
	FuelType              FuelType `json:"fuel_type" bson:"fuel_type"`
	DoorNumber            uint8    `json:"door_number" bson:"door_number"`
	CylinderNumber        uint8    `json:"cylinders_number" bson:"cylinders_number"`
}
