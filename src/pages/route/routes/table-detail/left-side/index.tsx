import { Card, CardContent } from "@/components/ui/card"
import { ROUTE_VEHICLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"



export const LeftSideCars = ({ uuid }: { uuid: string }) => {
  const { data } = useGet<RouteTypes>(`${ROUTE_VEHICLES}/${uuid}`)
  
  return (
    <Card>
      <CardContent>
        {(data?.depot_type === 1 || data?.depot_type === 3) && (
          <h1 className="mb-4">{data?.depot_name}</h1>
        )}
        <div className="space-y-4">
          {data?.order_routes?.map((route, idx) => (
            <div key={idx} className="space-y-1">
              <h1 className="font-[500] text-lg">{route.client_address}</h1>
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