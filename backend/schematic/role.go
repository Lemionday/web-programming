package schematic

type Role int

const (
	Unauthorized Role = iota
	AuthorizedFromRegistryCenter
	AuthorizedFromMainCenter
	Admin
)
