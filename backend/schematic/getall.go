package schematic

import (
	"context"

	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type idinterface interface {
	GetID() string
}

func getAll[T idinterface](collection string, filter primitive.M) ([]T, error) {
	var arrayOfT []T
	cur, err := database.GetCol(collection).Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.TODO())
	if err = cur.All(context.TODO(), &arrayOfT); err != nil {
		return nil, err
	}

	return arrayOfT, nil
}

// string là Object Id của phần tử cuối cùng được trả về
func getAllWithPaging[T idinterface](collection string, filters primitive.M, start string, nPerPage int64) ([]T, string, error) {
	if start != "" {
		objID, err := primitive.ObjectIDFromHex(start)
		if err != nil {
			log.Error().Err(err).Msg("")
		}
		filters["_id"] = bson.M{"$gt": objID}
	}

	opts := options.Find().SetSort(bson.D{{"_id", 1}})
	opts.SetLimit(nPerPage)

	var arrayOfT []T
	cur, err := database.GetCol(collection).Find(context.TODO(), filters, opts)
	if err != nil {
		return nil, "", err
	}
	defer cur.Close(context.TODO())
	if err = cur.All(context.TODO(), &arrayOfT); err != nil {
		return nil, "", err
	}

	if len(arrayOfT) <= 0 {
		return arrayOfT, "", nil
	}

	return arrayOfT, arrayOfT[len(arrayOfT)-1].GetID(), nil
}

func CountDocumentsNoFilter(collection string) (int64, error) {
	coll := database.GetCol(collection)

	opts := options.Count().SetHint("_id_")
	count, err := coll.CountDocuments(context.TODO(), bson.D{}, opts)
	if err != nil {
		return 0, err
	}

	return count, nil
}
