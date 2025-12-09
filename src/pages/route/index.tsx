import RouteOrderMain from "./orders-window"
import RoutesMain from "./routes"

type Props = {}

const RouteMain = (props: Props) => {
    return (
        <div className="grid lg:grid-cols-1 gap-3">
            {/* <RouteOrderMain /> */}
            <RoutesMain />
        </div>
    )
}

export default RouteMain
