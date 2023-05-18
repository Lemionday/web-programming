package cached

import (
	"context"
	"errors"

	"github.com/eko/gocache/lib/v4/cache"
	redis_store "github.com/eko/gocache/store/redis/v4"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
)

type cacheManager struct {
	centers *cache.Cache[string]
}

var (
	ErrNotCached = errors.New("Failed to find key in cache")
)

var cacheManagerInstance cacheManager
var ctx = context.TODO()

func SetupCacheManager() {
	redisStore := redis_store.NewRedis(redis.NewClient(&redis.Options{
		Addr: "127.0.0.1:6379",
	}))

	cacheManagerInstance.centers = cache.New[string](redisStore)
	getAllCenterAndCache(true, context.TODO())
}

func getAllCenterAndCache(firstTime bool, ctx context.Context) {
	centers, err := schematic.GetAllCenter()
	if err != nil {
		log.Fatal().Err(err).Msg("get centers from database failed.")
	}

	for _, center := range centers {
		err = cacheManagerInstance.centers.Set(ctx, center.Id, center.Name)
		if err != nil {
			if firstTime {
				log.Fatal().Err(err).Msg("load centers to cache failed.")
			} else {
				getAllCenterAndCache(false, ctx)
			}
		}
	}

}

func GetCacheCenters() *cache.Cache[string] {
	return cacheManagerInstance.centers
}
