package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/theLemionday/web-programming/conf"
	"github.com/theLemionday/web-programming/database"
	"github.com/theLemionday/web-programming/schematic"
	"github.com/uptrace/bun"
	"github.com/urfave/cli/v2"
)

// type temp func(context.Context, ...interface{}) (sql.Result, error)

var (
	bgCtx = context.Background()
)

type User struct {
	bun.BaseModel `bun:"table:users,alias:u"`

	ID   int64 `bun:",pk,autoincrement"`
	Name string
}

func RegisterCommand(db *bun.DB) []*cli.Command {
	return []*cli.Command{
		{
			Name:  "create",
			Usage: "create table",
			Action: func(ctx *cli.Context) error {
				var res sql.Result
				var err error
				for _, v := range ctx.Args().Slice() {
					switch v {
					case "account":
						// res, err = db.NewCreateTable().Model((*User)(nil)).Exec(context.Background())
						// // res, err = db.NewCreateTable().Model((*schematic.Account)(nil)).Exec(bgCtx)
						// if err != nil {
						// 	return err
						// }
						db.Conn()
					case "owner":
						res, err = db.NewCreateTable().Model((*schematic.Owner)(nil)).Exec(bgCtx)
						return err
					}
					fmt.Println(res)
				}
				return nil
			},
		},
	}
}

func main() {
	database.NewConnection(conf.LoadConfig())
	db := database.GetConnection()
	if db == nil {
		fmt.Println(true)
	}
	app := &cli.App{
		Name:     "db-helper",
		Usage:    "Support table operations from the command line.",
		Commands: RegisterCommand(db),
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
