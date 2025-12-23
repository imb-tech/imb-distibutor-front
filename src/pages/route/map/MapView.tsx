import { ROUTE_MAPS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import {
    Map,
    Placemark,
    Polyline,
    RouteButton,
    YMaps,
} from "@pbe/react-yandex-maps"
import { useSearch } from "@tanstack/react-router"
import axios from "axios"
import { useEffect, useRef, useState } from "react"

const getUniqueColor = (index: number): string => {
    const r = (index * 123) % 256
    const g = (index * 231) % 256
    const b = (index * 312) % 256

    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
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
    const { route_id } = useSearch({ from: "/_main/route/" })
    const { isSuccess, data } = useGet<RouteMaps[]>(ROUTE_MAPS, {
        params: { uuid: route_id },
    })

    const mapRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [routesGeometry, setRoutesGeometry] = useState<
        Record<number, number[][]>
    >({})

    const defaultState = {
        center: [41.2995, 69.2401],
        zoom: 12,
    }

    useEffect(() => {
        if (!mapRef.current) return

        const resizeObserver = new ResizeObserver(() => {
            // Kichik kechikish bilan container to'liq o'zgarishini kutish
            setTimeout(() => {
                if (mapRef.current) {
                    mapRef.current.container.fitToViewport()
                }
            }, 100)
        })

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => {
            resizeObserver.disconnect()
        }
    }, [mapRef.current])

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

    return (
        <YMaps
            query={{
                apikey,
                lang: "ru_RU",
                load: "package.full",
            }}
        >
            <div
                ref={containerRef}
                style={{
                    height: "700px",
                    width: "100%",
                }}
            >
                <Map
                    defaultState={defaultState}
                    width="100%"
                    height="100%"
                    instanceRef={(ref) => {
                        mapRef.current = ref
                    }}
                >
                    <RouteButton options={{ float: "right" }} />

                    {isSuccess &&
                        data.map((route) => (
                            <div key={route.id}>
                                {/* Do'konlar */}
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
                                            iconColor:
                                                !route_id ?
                                                    getUniqueColor(order.id)
                                                :   undefined,
                                        }}
                                    />
                                ))}

                                {/* DRIVER YO'LI */}
                                {routesGeometry[route.id] && (
                                    <Polyline
                                        geometry={routesGeometry[route.id]}
                                        options={{
                                            strokeColor:
                                                !route_id ?
                                                    getUniqueColor(route.id)
                                                :   undefined,
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
