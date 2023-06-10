export interface OwnerIsPerson {
    id: string
    ssn: string
    name: string
    sex: string
    birthdate: Date
    birthplace: string
    cars_list: string[]
}

export interface OwnerIsCompany {
    id: string
    name: string
    office_address: string
    registered_office_adress: string
    legal_representative: OwnerIsPerson
    cars_list: string[]
}