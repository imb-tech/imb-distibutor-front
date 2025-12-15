import { ROUTE_VEHICLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { LeftSideCars } from "./left-side"
import { RightSideCars } from "./right-side"
interface CarDetailsRowProps {
    car: CarsTypeInOrders
}

export const CarDetailsRow = ({ car }: CarDetailsRowProps) => {
    const { data } = useGet<RouteTypes>(`${ROUTE_VEHICLES}/${car.uuid}`)
    const orderUuid = (data as any)?.order_routes?.[0]?.order_uuid

    return (
        <div className="py-3 px-2">
            <div>
                <h1 className=" text-xl mb-4 flex items-center gap-2">
                    Do'konlar
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  ">
                <LeftSideCars uuid={car?.uuid} />
                <RightSideCars uuid={orderUuid} />
            </div>
        </div>
    )
}
