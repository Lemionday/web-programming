enum FuelType {
    Gas = "gas",
    Diesel = 'diesel'
}

export class Car {
    car_id?: string
    manufacturer?: string
    model?: string
    size?: number[]
    FuelType?: FuelType
    city?: string
    plate?: string
    vin?: string
    EngineNumber?: string
    least_recently_registered?: Date
    invalidate_date?: Date
    center_registered?: string
    register_number?: string
    bill_number?: string
    owner_id?: string
}