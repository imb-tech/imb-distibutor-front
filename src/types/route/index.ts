type RouteConstant = {
    orderId: string
    date: string
    warehouse: string
    customerOrg: string
    address: string
    region: string
    phone: string
    workTime: string
    note: string
    priorityTransport: string
    unloadTime: string
    cashPayment: string
    weightKg: string
    productCount: string
    volumeM3: string
    contact_name: string
}

type RouteAddition = {
    orderId: string
    date: string
    warehouse: string
    customerOrg: string
    address: string
    region: string
    phone: string
    note: string
    priorityTransport: string
    unloadTime: string
    cashPayment: string
    weightKg: string
    productCount: string
    volumeM3: string
}

type CarsTypeInOrders = {
    id: number
    path: string
    car_model: string
    car_number: string
    driver: string
    forwarder: string
    load_capacity: string
    shop?: string[]
    info?: Info[]
    products?: Products[]
}
 
type Info = {
    order_id: number
    location: string
    organization: string
    weight: number
    density: number
    working_start: string
    working_end: string
    price: number
    phone_number: string
}

type Products = {
    id: number
    name: string
    quantity: number
    total_price: number
}
