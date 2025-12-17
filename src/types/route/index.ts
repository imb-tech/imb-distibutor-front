type RouteConstant = {
    scheduled_delivery_date: any
    depot_name: string
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
    start_date: string
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
    start_depot_name: string
    end_depot_name: string
}

type OrderRoutesType = {
    id: number
    client_address: string
    client_coordination: number[]
    number: number
    order_uuid:  string
    order: number
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
    coordinates: [number, number]
}
type RouteVehiclesAdd = {
    uuid: number
    name: string
    driver: number
    vehicle: number
    start_date: string
    orders: number[]
    start_depot?: number
    end_depot?: number
}

type RouteDetailType = {
    id: number
    uuid: string
    name: string
    status: number
    order_routes: [
        {
            id: 20
            client_address: "Street 17, Building 24, Tashkent"
            client_coordinates: [69.34937450283265, 41.40995427666948]
            number: 13
            order_uuid: "63d85d08-12af-4619-9f5e-60f2d85afc63"
            order: 20
        },
        {
            id: 19
            client_address: "Street 48, Building 85, Tashkent"
            client_coordinates: [69.11399213540079, 41.44991854891738]
            number: 2
            order_uuid: "0bc59d5b-00c7-4452-bfb5-56a55821af1b"
            order: 19
        },
        {
            id: 18
            client_address: "Street 10, Building 12, Tashkent"
            client_coordinates: [69.30756605982191, 41.241964303352276]
            number: 20
            order_uuid: "28807b37-1e35-460c-95b2-557eb4a2a7f9"
            order: 18
        },
        {
            id: 17
            client_address: "Street 9, Building 28, Tashkent"
            client_coordinates: [69.36977699423615, 41.355551064186805]
            number: 10
            order_uuid: "1858fe96-0cdd-4127-88a6-139fbfcae0dc"
            order: 17
        },
        {
            id: 16
            client_address: "Street 50, Building 15, Tashkent"
            client_coordinates: [69.1558140482018, 41.297467791146]
            number: 4
            order_uuid: "c0aa9f70-f83c-4557-80bf-3a4526817b4e"
            order: 16
        },
    ]
    coordinates: [
        [41.30941, 69.337157],
        [41.2871, 69.2555],
        [41.2873, 69.2549],
        [41.2875, 69.2543],
        [41.205502, 69.247239],
        [41.288, 69.2528],
        [41.2076, 69.220656],
        [41.2883, 69.2513],
        [41.331515, 69.12739],
        [41.325298, 69.098671],
    ]
    end_depot_coordinates: [69.2623, 41.1967]
    start_depot_coordinates: [69.2623, 41.1967]
    start_depot_name: "Reserve Center"
    end_depot_name: "Reserve Center"
}
