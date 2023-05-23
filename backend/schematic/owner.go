package schematic

import (
	"context"
	"time"

	"github.com/theLemionday/web-programming/database"
	"go.mongodb.org/mongo-driver/bson"
)

// Name will be organization name if owner is an organization

type OwnerIsPerson struct {
	Id         string    `json:"id" bson:"id"`
	Name       string    `json:"name" bson:"name"`
	Sex        string    `json:"sex" bson:"sex"`
	Birthday   time.Time `json:"birthday" bson:"birthday"`
	Birthplace string    `json:"birthplace" bson:"birthplace"`
	CarsList   []string  `json:"cars_list" bson:"cars_list"`
}

type OwnerIsCompany struct {
	Id                     string        `json:"id" bson:"id"`
	Name                   string        `json:"name" bson:"name"`
	OfficeAddress          string        `json:"office_address" bson:"office_address"`
	RegisteredOfficeAdress string        `bson:"registerd_office_address"`
	LegalRepresentative    OwnerIsPerson `json:"legal_representative" bson:"legal_representative"`
	CarsList               []string      `json:"cars_list" bson:"cars_list"`
}

type Owner interface {
	OwnerIsPerson | OwnerIsCompany
}

func GetOwner[T Owner](id string) (*T, error) {
	coll := database.GetCol("owner")
	var owner T

	if err := coll.FindOne(context.TODO(), bson.D{{"id", id}}).Decode(&owner); err != nil {
		return nil, err
	}
	return &owner, nil
}
