import ParamTabs from "@/components/as-params/tabs"
import { useSearch } from "@tanstack/react-router"
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
            <div className="grid lg:grid-cols-1 gap-3">
                {/* <RouteOrderMap /> */}
                {page_tabs === "routes" ?
                    <RouteOrderMain />
                :   <RoutesMain />}
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
