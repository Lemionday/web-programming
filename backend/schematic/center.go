package schematic

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Center struct {
	ObjId   primitive.ObjectID `json:"-" bson:"_id"`
	ID      string             `json:"id" bson:"id"`
	Name    string             `json:"name" bson:"name"`
	Address string             `json:"address" bson:"address"`
}

func (c Center) GetID() string {
	return c.ObjId.Hex()
}

func GetAllCenter() ([]Center, error) {
	return getAll[Center]("centers", bson.M{})
}

func GetAllCenterWithPaging(start string, nPerPage int64) ([]Center, string, error) {
	return getAllWithPaging[Center]("centers", bson.M{}, "_id", start, nPerPage)
}
