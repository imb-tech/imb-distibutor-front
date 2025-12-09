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
    id: number
    product_name: string
    note: string
    measurement_type: string
    quantity: string
    price_uz: string
    total_uz: string
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
    id: number
    path: string
    car_model: string
    car_number: string
    driver: string
    license_type: string
    forwarder: string
    series_number: string
    year: string
    fuel_type: string
    load_capacity: string
    warehouse: string
}

type ForwardersType={
     id: number
    full_name: string
    phone_number: string
    passport_series: string
    jshshir: string,
    warehouse:string
}