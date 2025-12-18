type RouteConstant = {
    scheduled_delivery_date: any
    depot_name: any
    client_data: any
    type: number
    cod: any
    loads: any
    driver_name: string
    vehicle_name: string
    eta: any
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
    uuid(uuid: any): any
    client_data: any
    type: number
    cod: any
    eta: any
    loads: any
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
    uuid: string
    driver_name: string
    vehicle_name: string
    vehicle_number: string
    name: string
    progress_order_count: number
    finished_order_count: number
    order_weight: number
}


type OrderRoute = {
    id: number
    client_address: string
    client_coordinates: [number, number]
    number: number
    order_uuid: string
}

type RouteTypes = {
    id: number
    uuid: string
    name: string
    depot_name: string
    order_routes: OrderRoute[]
    coordinates: [number, number][]
    start_depot_name:string
    end_depot_name:string
}

type OrderRoutesType = {
    id: number
    client_address: string
    client_coordination: number[]
    number: number
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

type Driver = {
    id: string
    name: string
    vehicleNumber: string
    status: "moving" | "online" | "idle" | "offline"
    location: { lat: number; lng: number }
    speed: number
    fuelLevel: number
}

type FleetStats = {
    totalDrivers: number
    online: number
    offline: number
    idle: number
    moving: number
    overspeed: number
    lowFuel: number
    engineOn: number
    engineOff: number
}

type MapSettings = {
    showTraffic: boolean
    showSatellite: boolean
    showMarkers: boolean
    showRoutes: boolean
    centerOnSelection: boolean
}

type RouteMaps = {
    id: number
    name: string
    depot_name: string
    order_routes: OrderRoute[]
}
type RouteVehiclesAdd = {
    uuid:number
    name: string
    driver: number
    vehicle: number
    start_date: string
    orders: number[]
    start_depot?: number
    end_depot?: number
}
