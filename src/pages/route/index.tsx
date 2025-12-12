import ParamTabs from "@/components/as-params/tabs"
import { useSearch } from "@tanstack/react-router"
import { FleetDashboard } from "./map"

const RouteMain = () => {
    const search = useSearch({ from: "/_main/route/" })
    const { page_tabs } = search
    return (
        <div>
            <ParamTabs
                options={paramOptions}
                className={"mb-2 bg-background"}
            />
            <div className="grid lg:grid-cols-1 gap-3">
                <FleetDashboard />
            </div>
        </div>
    )
}

export default RouteMain

const paramOptions = [
    {
        value: "orders_window",
        label: "Buyurtmalar oynasi",
    },
    {
        value: "routes",
        label: "Marshrutlar",
    },
]
