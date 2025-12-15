import { Card, CardContent } from "@/components/ui/card"
import { ROUTE_VEHICLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"

export const LeftSideCars = () => {
    const navigate = useNavigate()
    const search = useSearch({ from: "/_main/route/" })
    const { route_id, order_id } = search
    const { data } = useGet<RouteTypes>(`${ROUTE_VEHICLES}/${route_id}`)

    return (
        <Card>
            <CardContent>
                {(data?.depot_type === 1 || data?.depot_type === 3) && (
                    <h1 className="mb-4">{data?.depot_name}</h1>
                )}
                <div className="space-y-4">
                    {data?.order_routes?.map((route, idx) => (
                        <div
                            key={idx}
                            className="space-y-1 cursor-pointer"
                            onClick={() =>
                                navigate({
                                    to: "/route",
                                    search: {
                                        ...search,
                                        order_id: route.order_uuid,
                                    },
                                })
                            }
                        >
                            <h1
                                className={cn(
                                    "font-[500] text-lg",
                                    order_id == route.order_uuid &&
                                        "text-primary",
                                )}
                            >
                                {route.client_address}
                            </h1>
                        </div>
                    ))}
                </div>

                {(data?.depot_type === 2 || data?.depot_type === 3) && (
                    <h1 className="mt-4">{data?.depot_name}</h1>
                )}
            </CardContent>
        </Card>
    )
}
