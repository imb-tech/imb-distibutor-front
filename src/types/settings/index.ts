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
    location: number[]
}
type LogisticiansType = {
    id: number
    full_name: string
    phone_number: string
    working_warehouse: string
}
type CustomersType = {
    id: number
    uuid:string
    name: string
    company_name: string
    address: string
    loading_coordinates: number[]
    coordinates: number[]
    phone_number: string
    email: string
    note: string
    schedules: SchedulesType[]
}

type SchedulesType = {
    id: number
    client: number
    day_of_week: number
    start_time: string
    end_time: string
}

type ScheduleFormType = {
    day_of_week: number
    start_time: string
    end_time: string
    enabled?: boolean
}

type CustomerFormType = {
    name: string
    company_name: string
    address: string
    loading_coordinates: string[]
    coordinates: string[]
    phone_number: string
    email: string
    note: string
    schedules: ScheduleFormType[]
}
