import ParamTabs from "@/components/as-params/tabs"
import { useSearch } from "@tanstack/react-router"
import { FleetDashboard } from "./map"
import RoutesMain from "./orders-window"
import RouteOrderMain from "./routes"

const RouteMain = () => {
    const search = useSearch({ from: "/_main/route/" })
    const { page_tabs } = search
    return (
        <div>
            <ParamTabs
                options={paramOptions}
                className={"mb-2 bg-background"}
            />
            <div className="flex gap-3 h-[calc(100vh-120px)]">
                {/* MAP — QOTIB TURADI */}
                <div className="w-1/2 sticky top-[64px] ">
                    <FleetDashboard />
                </div>

                {/* CONTENT — SCROLL BO‘LADI */}
                <div className="w-1/2 overflow-y-auto ">
                    {page_tabs === "routes" ?
                        <RouteOrderMain />
                    :   <RoutesMain />}
                </div>
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
