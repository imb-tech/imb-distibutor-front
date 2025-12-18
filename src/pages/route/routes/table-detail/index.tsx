import { ROUTE_VEHICLES, ROUTE_VEHICLES_DETAIL } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect } from "react"
import { LeftSideCars } from "./left-side"
import { RightSideCars } from "./right-side"
interface CarDetailsRowProps {
    car: CarsTypeInOrders
}

export const CarDetailsRow = ({ car }: CarDetailsRowProps) => {
    const navigate = useNavigate()
    const search = useSearch({ from: "/_main/route/" })
    const { data } = useGet<RouteTypes>(`${ROUTE_VEHICLES_DETAIL}/${car.uuid}`, {
        enabled: !!car.uuid,
    })

    useEffect(() => {
        if (data?.order_routes?.length) {
            const orderUuid = (data as RouteTypes)?.order_routes?.[0]
                ?.order_uuid
            navigate({
                to: "/route",
                search: { ...search, order_id: orderUuid },
            })
        }
    }, [data])

    return (
        <div className="py-3 px-2">
            <div>
                <h1 className=" text-xl mb-4 flex items-center gap-2">
                    Do'konlar
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  ">
                <LeftSideCars />
                <RightSideCars />
            </div>
        </div>
    )
}
