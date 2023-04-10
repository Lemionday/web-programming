//  ........................................_._.....
//  .......................................|.|.|....
//  .._.__.___...___.._.__...__._..___...__|.|.|__..
//  .|.'_.`._.\./._.\|.'_.\./._`.|/._.\./._`.|.'_.\.
//  .|.|.|.|.|.|.(_).|.|.|.|.(_|.|.(_).|.(_|.|.|_).|
//  .|_|.|_|.|_|\___/|_|.|_|\__,.|\___/.\__,_|_.__/.
//  .........................__/.|..................
//  ........................|___/...................

package database

import (
	"context"
	"fmt"
	"time"

	"github.com/theLemionday/web-programming/conf"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoInstance struct {
	Client *mongo.Client
	Db     *mongo.Database
}

var (
	mg          MongoInstance
	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
)

func GetCol(name string) *mongo.Collection {
	return mg.Db.Collection(name)
}

func NewConnection(cfg *conf.Config) error {
	var err error
	uri := fmt.Sprintf(cfg.MongoURI, cfg.MongoUser, cfg.MongoPass, cfg.MongoDbName)
	mg.Client, err = mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return err
	}
	defer cancel()

	mg.Db = mg.Client.Database(cfg.MongoDbName)

	// accountCol = db.Collection("accounts")
	// ownerCol = db.Collection("owner")
	return err
}

func CheckConnection() {
	var result bson.M
	if err := mg.Client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Decode(&result); err != nil {
		panic(err)
	}
	// return client.Ping(ctx, readpref.Primary())
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
}

// func GetConnection() *mongo.Database {
// 	return db
// }

// func GetAccountCol() *mongo.Collection {
// 	return accountCol
// }

// func GetOwnerCol() *mongo.Collection {
// 	return ownerCol
// }

func CloseConnection() {
	if err := mg.Client.Disconnect(ctx); err != nil {
		panic(err)
	}
}
