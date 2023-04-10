package hello

import (
	"fmt"
	"log"
	"os"

	"github.com/go-pg/migrations/v8"
	"github.com/go-pg/pg/v10"
	"github.com/uptrace/bun/migrate"
	"github.com/urfave/cli/v2"
)

var db *pg.DB

func noArgsCommand(ctx *cli.Context) error {
	// migrations
	// fmt.Println(ctx.Command.Name)
	_, _, err := migrations.Run(db, ctx.Command.Name)
	return err
}

func upCommandHandler(ctx *cli.Context) error {
	var err error
	if ctx.Args().Len() == 0 {
		_, _, err = migrations.Run(db, "up")
	} else {
		_, _, err = migrations.Run(db, "up", ctx.Args().First())
	}
	return err
}

func versionCmd(ctx *cli.Context) error {
	if ctx.Args().Len() == 0 {
		version, _, err := migrations.Run(db, "version")
		if err != nil {
			return err
		}
		fmt.Printf("version is %d\n", version)
	} else {
		oldVersion, newVersion, err := migrations.Run(db, "set_version", ctx.Args().Get(1))
		if err != nil {
			return err
		}
		if newVersion != oldVersion {
			fmt.Printf("migrated from version %d to %d\n", oldVersion, newVersion)
		}
	}
	return nil
}

func main() {
	cfg := pg.Options{
		Addr:     "192.168.10.71:5432",
		Database: "carres",
		User:     "caradmin",
		Password: "root1234",
	}
	db = pg.Connect(&cfg)
	// database.NewConnection(database.LoadConfig(conf.LoadConfig()))
	// db = database.GetConnection()

	app := &cli.App{
		Name:  "db-helper",
		Usage: "This program runs command on the db.",
		Commands: []*cli.Command{
			{Name: "init", Usage: "creates version info table in the database", Action: noArgsCommand},
			{Name: "up", Usage: "runs all available migrations or up to a target version if provided", Action: upCommandHandler},
			{Name: "down", Usage: "revert last migrations.", Action: noArgsCommand},
			{Name: "reset", Usage: "revert all migrations.", Action: noArgsCommand},
			{Name: "version", Usage: "prints current db version", Action: versionCmd},
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func registerCommand(migrator *migrate.Migrator) *cli.Command {

}
