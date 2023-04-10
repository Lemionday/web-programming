package schematic

type Car struct {
	Id      int16 `bson:"_id"`
	Brand   string
	OwnerId int16 `bson:"owner_id"`
}
