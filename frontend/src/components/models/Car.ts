enum FuelType {
    Gas = "gas",
    Diesel = 'diesel'
}

export class Car {
    car_id?: string
    manufacturer?: string
    model?: string
    carbody?: string
    size?: number[]
    fueltype?: FuelType
    city?: string
    curb_weight?: number
    usage?: string
    peak_rpm?: number
    horse_power?: number
    compression_ratio?: number
    cylinder_number?: number
    engine_size?: number
    wheel_base?: number
    plate?: string
    vin?: string
    engine_number?: string
    least_recently_registered?: Date
    invalidate_date?: Date
    center_registered?: string
    register_number?: string
    bill_number?: string
    owner_id?: string
}