package cached

import (
	"context"
	"errors"
	"time"

	"github.com/eko/gocache/lib/v4/cache"
	"github.com/eko/gocache/lib/v4/store"
	redis_store "github.com/eko/gocache/store/redis/v4"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
	"github.com/theLemionday/web-programming/schematic"
)

type cacheManager struct {
	centers *cache.LoadableCache[string]
}

var (
	ErrNotCached = errors.New("Failed to find key in cache")
)

var cacheManagerInstance cacheManager

func SetupCacheManager() {
	redisStore := redis_store.NewRedis(redis.NewClient(&redis.Options{
		Addr: "127.0.0.1:6379",
	}))

	cacheManagerInstance.centers = cache.NewLoadable[string](
		loadCenters,
		cache.New[string](redisStore),
	)
}

func loadCenters(ctx context.Context, key any) (string, error) {
	centers, err := schematic.GetAllCenter()
	if err != nil {
		log.Fatal().Err(err).Msg("get centers from database failed.")
	}

	var centerToFind schematic.Center
	for _, center := range centers {
		err = cacheManagerInstance.centers.Set(ctx, center.ID, center.Name, store.WithExpiration(1*time.Hour))
		if err != nil {
			log.Fatal().Err(err).Msg("load centers to cache failed.")
		}
		if center.ID == key {
			centerToFind = center
		}
	}

	return centerToFind.ID, nil
}

func GetCenters() *cache.LoadableCache[string] {
	return cacheManagerInstance.centers
}
