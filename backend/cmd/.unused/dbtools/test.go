package main

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/mysqldialect"
	"github.com/uptrace/bun/extra/bundebug"
)

// Profile belongs to User.
type Profile struct {
	ID     int64 `bun:",pk,autoincrement"`
	Lang   string
	UserID int64
}

type User struct {
	ID      int64 `bun:",pk,autoincrement"`
	Name    string
	Profile *Profile `bun:"rel:has-one,join:id=user_id"`
}

func main() {
	ctx := context.Background()

	// sqldb, err := sql.Open(sqliteshim.ShimName, "file::memory:?cache=shared")
	// if err != nil {
	// 	panic(err)
	// }
	//
	// db := bun.NewDB(sqldb, sqlitedialect.New())
	// database.NewConnection(conf.LoadConfig())
	// db := database.GetConnection()
	// dsn := "postgres://caradmin:root1234@192.168.10.71:5432/carres?sslmode=disable"
	// // dsn := "unix://user:pass@dbname/var/run/postgresql/.s.PGSQL.5432"
	// sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	// config, err := pgx.ParseConfig("postgres://caradmin:'root1234'@192.168.10.71:5432/carres?sslmode=disable")
	// if err != nil {
	// 	panic(err)
	// }
	// // config.PreferSimpleProtocol = true
	//
	// sqldb := stdlib.OpenDB(*config)
	// db := bun.NewDB(sqldb, pgdialect.New())
	sqldb, err := sql.Open("mysql", "caradmin:root1234@tcp(192.168.10.71:3307)/carres")
	if err != nil {
		panic(err)
	}

	db := bun.NewDB(sqldb, mysqldialect.New())
	defer db.Close()

	db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))

	if err := createSchema(ctx, db); err != nil {
		panic(err)
	}

	var users []User
	if err := db.NewSelect().
		Model(&users).
		Column("user.*").
		Relation("Profile").
		Scan(ctx); err != nil {
		panic(err)
	}

	fmt.Println(len(users), "results")
	fmt.Println(users[0].ID, users[0].Name, users[0].Profile)
	fmt.Println(users[1].ID, users[1].Name, users[1].Profile)
	// Output: 2 results
	// 1 user 1 &{1 en 1}
	// 2 user 2 &{2 ru 2}
}

func createSchema(ctx context.Context, db *bun.DB) error {
	models := []interface{}{
		(*User)(nil),
		(*Profile)(nil),
	}
	for _, model := range models {
		if _, err := db.NewCreateTable().Model(model).Exec(ctx); err != nil {
			return err
		}
	}

	users := []*User{
		{ID: 1, Name: "user 1"},
		{ID: 2, Name: "user 2"},
	}
	if _, err := db.NewInsert().Model(&users).Exec(ctx); err != nil {
		return err
	}

	profiles := []*Profile{
		{ID: 1, Lang: "en", UserID: 1},
		{ID: 2, Lang: "ru", UserID: 2},
	}
	if _, err := db.NewInsert().Model(&profiles).Exec(ctx); err != nil {
		return err
	}

	return nil
}
