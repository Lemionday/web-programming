package schematic

// Name will be organization name if owner is an organization
type Owner struct {
	Id       int16   `bson:"_id"`
	Name     string  `binding:"required,min=5,max=30"`
	IsPerson bool    `binding:"required"`
	CarsList []int16 `bson:"car_list"`
}
