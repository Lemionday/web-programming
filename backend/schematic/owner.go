package schematic

// Name will be organization name if owner is an organization
type Owner struct {
	Id       int16   `bson:"_id"`
	Name     string  `binding:"required,min=5,max=30"`
	IsPerson bool    `binding:"required"`
	CarsList []int16 `bson:"car_list"`
}

type CompanyType int

const (
	Limited CompanyType = iota
)

type CompanyOwner struct {
	Number                 int16  `bson:"_id"`
	RegisteredOfficeAdress string `bson:"registerd_office_address"`
	Status                 bool   `bson:",omitempty"`
	CompanyType
}
