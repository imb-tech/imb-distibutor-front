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
import { useEffect, useState } from "react"

const getUniqueColor = (index: number) => {
    const hue = (index * 137.508) % 360
    return `hsl(${hue}, 75%, 50%)`
}

const apikey = import.meta.env.VITE_YANDEX_MAP_API_KEY
const apuKeyRoute = import.meta.env.VITE_YANDEX_MAP_API_ROUTE_KEY

const getDrivingRoute = async (points: number[][]): Promise<number[][]> => {
    const waypoints = points.map((p) => `${p[0]},${p[1]}`).join("|")

    const { data } = await axios.get(
        "https://api.routing.yandex.net/v2/route",
        {
            params: {
                apikey: apuKeyRoute,
                waypoints,
                mode: "driving",
                lang: "ru_RU",
            },
        },
    )

    const result: number[][] = []

    data.route.legs.forEach((leg: any) => {
        leg.steps.forEach((step: any) => {
            if (step.polyline?.points) {
                step.polyline.points.forEach(([lat, lng]: number[]) => {
                    result.push([lat, lng])
                })
            }
        })
    })

    return result
}

export default function YandexMapView() {
    const { isSuccess, data } = useGet<RouteMaps[]>(ROUTE_MAPS)

    const [routesGeometry, setRoutesGeometry] = useState<
        Record<number, number[][]>
    >({})

    const defaultState = {
        center: [41.2995, 69.2401],
        zoom: 12,
    }

    useEffect(() => {
        if (!isSuccess || !data) return

        const loadRoutes = async () => {
            for (const route of data) {
                const startPoint = [41.2995, 69.2401]

                const shopPoints = route.order_routes.map((o) => [
                    o.client_coordinates[1],
                    o.client_coordinates[0],
                ])

                const fullPoints = [startPoint, ...shopPoints]

                const geometry = await getDrivingRoute(fullPoints)

                setRoutesGeometry((prev) => ({
                    ...prev,
                    [route.id]: geometry,
                }))
            }
        }

        loadRoutes()
    }, [isSuccess, data])

    console.log(routesGeometry)

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
                        data.map((route, index) => (
                            <div key={route.id}>
                                {/* Do‘konlar */}
                                {route.order_routes.map((order, i) => (
                                    <Placemark
                                        key={order.id}
                                        geometry={[
                                            order.client_coordinates[1],
                                            order.client_coordinates[0],
                                        ]}
                                        properties={{
                                            iconContent:
                                                order.number.toString(),
                                            balloonContent: `
                                                <strong>${route.name}</strong><br/>
                                                Buyurtma: #${order.number}<br/>
                                                Manzil: ${order.client_address}<br/>
                                                Tartib: ${order.number}
                                            `,
                                        }}
                                        options={{
                                            preset: "islands#blueCircleIcon",
                                            iconColor: getUniqueColor(i),
                                        }}
                                    />
                                ))}

                                {/* DRIVER YO‘LI */}
                                {routesGeometry[route.id] && (
                                    <Polyline
                                        geometry={routesGeometry[route.id]}
                                        options={{
                                            strokeWidth: 5,
                                            strokeOpacity: 0.85,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                </Map>
            </div>
        </YMaps>
    )
}
