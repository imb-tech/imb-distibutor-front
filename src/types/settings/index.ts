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



type DriversType = {
    id: number
    uuid: string
    full_name: string
    phone: string
    username: string
    password: string
    driver_profile: DriverProfileType
}

type DriverProfileType = {
    id: number
    passport_number: string
    pinfl: number
    driver_license: string
    work_experience: number
    license_expiry: string
}

type DriverFormType = {
    full_name: string
    phone: string
    username: string
    password: string
    uuid: number
    driver_profile: {
        pinfl: string
        id: number
        passport_number: string
        driver_license: string
        work_experience: number
        license_expiry: string
    }
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
    id: string
    uuid: string
    name: string
    address: string
    location: number[]
}
type LogisticiansType = {
    id: number
    uuid: number
    full_name: string
    phone: string
    username: string
    password: string
    depot: number
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
 
type CustomersType = {
    id?: string
    uuid?: string
    name: string
    company_name: string
    address: string
    loading_address?: string
    coordinates: [number, number]
    loading_coordinates?: [number, number]
    phone_number: string
    email: string
    note: string
    schedules?: Array<{
        day_of_week: number
        start_time: string
        end_time: string
    }>
}

 
interface CustomerFormType {
    name: string
    company_name: string
    address: string
    loading_address?: string
    coordinates: [string, string]   
    loading_coordinates: [string, string]   
    phone_number: string
    email: string
    note: string
    schedules: ScheduleFormType[]
}
type ShippersType = {
    id: number
    name: string
}
type MapComponentProps ={
    coordinates: { lat: number; lng: number }
    onCoordinatesChange: (coords: { lat: number; lng: number }) => void
    onAddressFilled?: (address: AddressData) => void
    showSearch?: boolean 
    showMapControls?: boolean  
    showCurrentLocationBtn?: boolean  
    searchPlaceholder?: string  
    className?: string  
    mapHeight?: string  
}

type AddressData = {
    street: string
    city: string
    region: string
    fullAddress: string
}