type Profile = {
    id: number
    profile: {
        phone_number: string
        phone_number2: string
    }
    username: string
    full_name: string
    face: string
    paid_until: string
    excuses?: number
    actions: string[]
    role: string
    balance: number
    employees_count: number
    office_id?: number
    password: string
}

type ProductsType = {
    uuid: string
    id: number
    name: string
    description: string
    unit: number
    price: string
    currency: number
}

type DriversType = {
    id: number
    full_name: string
    phone_number: string
    passport_series: string
    jshshir: string
    driver_license: string
    license_number: string
    working_stage: string
    company_id: number
    login: string
    parol: string
    activity: string
}

type CarsType = {
    uuid: string
    driver: number
    type: number
    number: string
    license: string
    serial_number: string
    year: string
    fuel_type: number
    size: number
    depot: number
}
type ForwardersType = {
    id: number
    full_name: string
    phone_number: string
    passport_series: string
    jshshir: string
    warehouse: string
}

type WarehouseType = {
    id?: string
    uuid: string
    name: string
    address: string
}
type LogisticiansType = {
    id: number
    full_name: string
    phone_number: string
    working_warehouse: string
}
type CustomersType = {
    id: number
    full_name: string
    organization: string
    location: string
    map_location: string
    koordination: string
    working_days: string
    phone_number: string
    email: string
}
