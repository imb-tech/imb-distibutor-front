import { ROUTE_MAPS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import {
    Map,
    Placemark,
    Polyline,
    RouteButton,
    YMaps,
} from "@pbe/react-yandex-maps"
import axios from "axios"

const colors = [
    "#FF0000",
    "#00AAFF",
    "#00FF00",
    "#FFA500",
    "#800080",
    "#FF1493",
    "#00CED1",
    "#FFD700",
    "#FF69B4",
    "#32CD32",
    "#FF4500",
    "#4169E1",
    "#DC143C",
    "#00FA9A",
    "#FF8C00",
]

const apikey = import.meta.env.VITE_YANDEX_MAP_API_KEY

export default function YandexMapView() {
    const { isSuccess, data } = useGet<RouteMaps[]>(ROUTE_MAPS)

    const defaultState = {
        center: [41.2995, 69.2401],
        zoom: 12,
    }

    const getRequest = async () => {
        try {
            const res = await axios.get(
                `https://api.routing.yandex.net/v2/distancematrix?origins=41.2995,69.2401&destinations=41.3000,69.2500|41.3100,69.2600&apikey=${apikey}`,
            )
            console.log(res.data)
        } catch (error) {
            console.error("Xatolik yuz berdi:", error)
        }
    }

    getRequest()

    return (
        <YMaps
            query={{
                apikey,
                lang: "ru_RU",
                load: "package.full",
            }}
        >
            <div style={{ height: "600px", width: "100%" }}>
                <Map defaultState={defaultState} width="100%" height="100%">
                    <RouteButton options={{ float: "right" }} />

                    {isSuccess &&
                        data.map((route, routeIndex) => {
                            const routeColor =
                                colors[routeIndex % colors.length]
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
                                                iconContent: `<strong>${order.number}</strong>`,
                                                iconColor: routeColor,
                                            }}
                                            properties={{
                                                iconContent:
                                                    order.number.toString(),
                                                balloonContent: `
                                                    <strong>${route.name}</strong><br/>
                                                    Buyurtma: #${order.number}<br/>
                                                    Manzil: ${order.client_address}<br/>
                                                    Tartib: ${i + 1}
                                                `,
                                            }}
                                        />
                                    ))}

                                    {/* Yo‘l chizish */}
                                    <Polyline
                                        geometry={route}
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
