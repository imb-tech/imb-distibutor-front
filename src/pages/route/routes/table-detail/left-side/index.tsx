import { Card, CardContent } from "@/components/ui/card"
import { ROUTE_VEHICLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"


 
export const LeftSideCars = ({uuid}:{uuid:string}) => {
    const {data} = useGet<RouteTypes>(`${ROUTE_VEHICLES}/${uuid}`)
  
    
    
    return (
        <Card>
            <CardContent>
                <h1>{data?.depot_name}</h1>
                <div className="space-y-4">
                    {data?.order_routes.map((sh, idx) => (
                        <div key={idx} className="space-y-3">
                            <h1 className="font-[500] text-lg">{}</h1>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
