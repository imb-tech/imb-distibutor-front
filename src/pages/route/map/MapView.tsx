import { ROUTE_MAPS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import {
    FullscreenControl,
    GeolocationControl,
    Map,
    Placemark,
    Polyline,
    RulerControl,
    SearchControl,
    TrafficControl,
    TypeSelector,
    YMaps,
    ZoomControl,
} from "@pbe/react-yandex-maps"

const colors = ["#FF0000", "#00AAFF", "#00FF00", "#FFA500", "#800080"]

export default function YandexMapView() {
    const { isSuccess, data } = useGet<RouteMaps[]>(ROUTE_MAPS)

    const defaultState = {
        center: [41.2995, 69.2401],
        zoom: 12,
    }

    return (
        <YMaps>
            <div style={{ height: "600px", width: "100%" }}>
                <Map defaultState={defaultState} width="100%" height="100%">
                    {/* Boshqaruvlar */}
                    <>
                        <SearchControl />
                        <ZoomControl />
                        <GeolocationControl />
                        <TypeSelector />
                        <TrafficControl />
                        <RulerControl />
                        <FullscreenControl />
                    </>

                    {isSuccess &&
                        data.map((route, routeIndex) => {
                            return (
                                <div key={route.id}>
                                    {route.order_routes.map((order, i) => (
                                        <Placemark
                                            key={order.id}
                                            geometry={[
                                                order.client_coordinates[1],
                                                order.client_coordinates[0],
                                            ]}
                                            options={{
                                                preset: "islands#redShoppingIcon",
                                            }}
                                            properties={{
                                                balloonContent: `${route.name} - ${order.client_address}`,
                                            }}
                                        />
                                    ))}

                                    {/* Yo‘l chizish */}
                                    <Polyline
                                        geometry={route.coordinates}
                                        options={{
                                            strokeColor:
                                                colors[
                                                    routeIndex % colors.length
                                                ],
                                            strokeWidth: 4,
                                            strokeOpacity: 0.8,
                                        }}
                                    />
                                </div>
                            )
                        })}
                </Map>
            </div>
        </YMaps>
    )
}
