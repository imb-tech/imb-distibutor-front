"use client"

import { Button } from "@/components/ui/button"
import {
    DirectionsRenderer,
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api"
import { Layers, Locate, Minus, Plus } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface Store {
    id: string
    name: string
    location: { lat: number; lng: number }
    city: string
    cargoList: string[]
}

// Toshkent shahar va viloyatidagi do'konlar
const toshkentDoKonlar = [
    { name: "Chilonzor Market", location: { lat: 41.2445, lng: 69.1866 } },
    { name: "Yunusobod Market", location: { lat: 41.3133, lng: 69.2877 } },
    { name: "Mirzo Ulug‘bek Market", location: { lat: 41.3201, lng: 69.3189 } },
    { name: "Olmazor Market", location: { lat: 41.2767, lng: 69.1954 } },
    { name: "Sergeli Market", location: { lat: 41.243, lng: 69.225 } },
    { name: "Uchtepa Market", location: { lat: 41.305, lng: 69.233 } },
    { name: "Yashnobod Market", location: { lat: 41.318, lng: 69.31 } },
    { name: "Toshkent City Center", location: { lat: 41.2995, lng: 69.2401 } },
    { name: "Olmaliq Market", location: { lat: 41.125, lng: 69.46 } },
    { name: "Angren Market", location: { lat: 40.5878, lng: 70.2211 } },
    { name: "Bekobod Market", location: { lat: 40.4247, lng: 69.2686 } },
    { name: "Chinoz Market", location: { lat: 41.1912, lng: 69.631 } },
    { name: "Yangiyo‘l Market", location: { lat: 41.1983, lng: 69.2622 } },
    { name: "Qibray Market", location: { lat: 41.285, lng: 69.4 } },
    { name: "Parkent Market", location: { lat: 41.274, lng: 69.722 } },
    { name: "Zangiota Market", location: { lat: 41.31, lng: 69.316 } },
    { name: "Piskent Market", location: { lat: 41.27, lng: 69.79 } },
    { name: "Oqqo‘rg‘on Market", location: { lat: 41.238, lng: 69.37 } },
    { name: "Toshkent Shahri Market 1", location: { lat: 41.32, lng: 69.24 } },
    { name: "Toshkent Shahri Market 2", location: { lat: 41.31, lng: 69.25 } },
]

const stores: Store[] = toshkentDoKonlar.flatMap((v, index) => ({
    id: `${index}-${index}`,
    city: v.name,
    name:
        index === 0 ? `${v.name} Markaziy Do'kon` : `${v.name} Do'kon ${index}`,
    location: {
        lat: v.location.lat + (Math.random() - 0.5) * 0.05,
        lng: v.location.lng + (Math.random() - 0.5) * 0.05,
    },
    cargoList: Array.from({ length: 3 }, (_, j) => `Mahsulot ${j + 1}`),
}))

const mapContainerStyle = { width: "100%", height: "100%" }
const defaultCenter = { lat: 41.2995, lng: 69.2401 }
const VITE_GOOGLE_MAPS_KEY = "AIzaSyDE1X4ckZsrfsMRRN2yN0NlXfdrS8kibAE"

export const MapView = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: VITE_GOOGLE_MAPS_KEY,
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [mapType, setMapType] = useState<google.maps.MapTypeId | null>(null)
    const [userLocation, setUserLocation] = useState<{
        lat: number
        lng: number
    } | null>(null)
    const [infoWindowStore, setInfoWindowStore] = useState<Store | null>(null)
    const [directions, setDirections] = useState<
        google.maps.DirectionsResult[]
    >([])

    // Foydalanuvchi joylashuvi

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) =>
                    setUserLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    }),
                (err) => console.error("Geolocation error:", err),
            )
        }
    }, [])

    // Mapga yuklanish
    const onLoad = useCallback(
        (mapInstance: google.maps.Map) => setMap(mapInstance),
        [],
    )
    const onUnmount = useCallback(() => setMap(null), [])

    // Zoom va locate
    const handleZoomIn = () => map?.setZoom((map.getZoom() || 6) + 1)
    const handleZoomOut = () => map?.setZoom((map.getZoom() || 6) - 1)
    const handleLocate = () => {
        if (map && userLocation) map.panTo(userLocation)
    }

    const toggleMapType = () => {
        if (!map) return
        const types: google.maps.MapTypeId[] = [
            "roadmap",
            "satellite",
            "hybrid",
            "terrain",
        ].map(
            (t) =>
                google.maps.MapTypeId[
                    t.toUpperCase() as keyof typeof google.maps.MapTypeId
                ],
        )
        const currentIndex = mapType ? types.indexOf(mapType) : 0
        const nextType = types[(currentIndex + 1) % types.length]
        setMapType(nextType)
        map.setMapTypeId(nextType)
    }

    // Directions: viloyat markazlari orasida yo'l
    useEffect(() => {
        if (!map) return
        const directionsService = new google.maps.DirectionsService()
        const viloyatMarkazlari = toshkentDoKonlar.map((v) => v.location)
        // har bir markazdan keyingi markazga route
        const tempDirections: google.maps.DirectionsResult[] = []
        viloyatMarkazlari.forEach((origin, i) => {
            if (i < viloyatMarkazlari.length - 1) {
                const destination = viloyatMarkazlari[i + 1]
                directionsService.route(
                    {
                        origin,
                        destination,
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    (result, status) => {
                        if (status === "OK" && result) {
                            tempDirections.push(result)
                            setDirections([...tempDirections])
                        }
                    },
                )
            }
        })
    }, [map])

    if (!isLoaded) return <div>Loading Map...</div>

    return (
        <div className="flex-1 relative">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userLocation || defaultCenter}
                zoom={userLocation ? 16 : 17}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    mapTypeId: mapType || google.maps.MapTypeId.ROADMAP,
                }}
            >
                {/* Markerlar */}
                {stores.map((store, i) => (
                    <Marker
                        key={store.id}
                        position={store.location}
                        onClick={() => setInfoWindowStore(store)}
                    />
                ))}

                {infoWindowStore && (
                    <InfoWindow
                        position={infoWindowStore.location}
                        onCloseClick={() => setInfoWindowStore(null)}
                    >
                        <div className="p-2 min-w-[180px]">
                            <h3 className="font-semibold">
                                {infoWindowStore.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {infoWindowStore.city}
                            </p>
                            <div className="mt-2">
                                <span className="font-semibold">Yuklar:</span>
                                <ul className="text-sm list-disc list-inside">
                                    {infoWindowStore.cargoList.map(
                                        (cargo, idx) => (
                                            <li key={idx}>{cargo}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </InfoWindow>
                )}

                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        }}
                    />
                )}

                {/* Directions */}
                {directions.map((dir, idx) => (
                    <DirectionsRenderer key={idx} directions={dir} />
                ))}
            </GoogleMap>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleMapType}
                    className="bg-card/90 hover:bg-card shadow-lg"
                >
                    <Layers className="w-4 h-4" />
                </Button>
            </div>

            <div className="absolute bottom-24 right-4 flex flex-col gap-1">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleZoomIn}
                    className="bg-card/90 hover:bg-card shadow-lg"
                >
                    <Plus className="w-4 h-4" />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleZoomOut}
                    className="bg-card/90 hover:bg-card shadow-lg"
                >
                    <Minus className="w-4 h-4" />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleLocate}
                    className="bg-card/90 hover:bg-card shadow-lg mt-2"
                >
                    <Locate className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
