"use client"

import { Button } from "@/components/ui/button"
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api"
import { Layers, Locate, Minus, Plus } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

const dummyDriver: Driver = {
    id: "1",
    name: "John Doe",
    vehicleNumber: "ABC-123",
    status: "moving",
    location: { lat: 41.2995, lng: 69.2401 },
    speed: 60,
    fuelLevel: 80,
}

const mapContainerStyle = { width: "100%", height: "100%" }
const defaultCenter = { lat: 41.2995, lng: 69.2401 }

const VITE_GOOGLE_MAPS_KEY = "AIzaSyDE1X4ckZsrfsMRRN2yN0NlXfdrS8kibAE"

export const MapView = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: VITE_GOOGLE_MAPS_KEY,
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [mapType, setMapType] = useState<google.maps.MapTypeId | null>(null)
    const [infoWindowDriver, setInfoWindowDriver] = useState<Driver | null>(
        dummyDriver,
    )
    const [userLocation, setUserLocation] = useState<{
        lat: number
        lng: number
    } | null>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                    if (map) {
                        map.panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        })
                        map.setZoom(14)
                    }
                },
                (err) => console.error("Geolocation error:", err),
            )
        }
    }, [map])

    const onLoad = useCallback(
        (mapInstance: google.maps.Map) => setMap(mapInstance),
        [],
    )

    const onUnmount = useCallback(() => setMap(null), [])

    const handleZoomIn = () => map?.setZoom((map.getZoom() || 12) + 1)
    const handleZoomOut = () => map?.setZoom((map.getZoom() || 12) - 1)

    const handleLocate = () => {
        if (map && userLocation) {
            map.panTo(userLocation)
            map.setZoom(14)
        }
    }

    const toggleMapType = () => {
        if (!map) return
        const types: google.maps.MapTypeId[] = [
            google.maps.MapTypeId.HYBRID,
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.TERRAIN,
        ]
        const currentIndex = mapType ? types.indexOf(mapType) : 0
        const nextType = types[(currentIndex + 1) % types.length]
        setMapType(nextType)
        map.setMapTypeId(nextType)
    }

    // API yuklanmagan bo'lsa Loading ko'rsatish
    if (!isLoaded) return <div>Loading Map...</div>

    return (
        <div className="flex-1 relative">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userLocation || defaultCenter}
                zoom={userLocation ? 14 : 12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    mapTypeId: mapType || google.maps.MapTypeId.HYBRID,
                }}
            >
                <Marker
                    position={dummyDriver.location}
                    onClick={() => setInfoWindowDriver(dummyDriver)}
                />

                {infoWindowDriver && (
                    <InfoWindow
                        position={infoWindowDriver.location}
                        onCloseClick={() => setInfoWindowDriver(null)}
                    >
                        <div className="p-2 min-w-[200px]">
                            <h3 className="font-semibold text-foreground">
                                {infoWindowDriver.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {infoWindowDriver.vehicleNumber}
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-muted-foreground">
                                        Tezlik:
                                    </span>
                                    <span className="ml-1 font-medium">
                                        {infoWindowDriver.speed} km/h
                                    </span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">
                                        Yoqilg'i:
                                    </span>
                                    <span className="ml-1 font-medium">
                                        {infoWindowDriver.fuelLevel}%
                                    </span>
                                </div>
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

            {/* Zoom Controls */}
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
