// import { useCallback, useEffect, useRef, useState } from "react"
// import { useGoogleMaps } from "./useGoogleMaps"

// interface MapComponentProps {
//     coordinates: { lat: number; lng: number }
//     onCoordinatesChange: (coords: { lat: number; lng: number }) => void
//     onAddressFilled: (addressData: {
//         street: string
//         city: string
//         region: string
//         fullAddress: string
//     }) => void
// }

// const isValidCoordinate = (coord: any): coord is number => {
//     return typeof coord === "number" && !isNaN(coord) && isFinite(coord)
// }

// const isValidCoordinates = (coords: { lat: number; lng: number }): boolean => {
//     return isValidCoordinate(coords.lat) && isValidCoordinate(coords.lng)
// }

// const FALLBACK_COORDINATES = { lat: 41.3111, lng: 69.2797 }

// export const MapComponent: React.FC<MapComponentProps> = ({
//     coordinates,
//     onCoordinatesChange,
//     onAddressFilled,
// }) => {
//     const mapRef = useRef<HTMLDivElement>(null)
//     const markerRef = useRef<google.maps.Marker | null>(null)
//     const mapInstanceRef = useRef<google.maps.Map | null>(null)
//     const { isLoaded, loadError } = useGoogleMaps()
//     const [isInitialized, setIsInitialized] = useState(false)

//     const getValidCoordinates = useCallback(
//         (coords: { lat: number; lng: number }) => {
//             if (!isValidCoordinates(coords)) {
//                 console.warn(
//                     "Invalid coordinates detected, using fallback:",
//                     coords,
//                 )
//                 return FALLBACK_COORDINATES
//             }
//             return coords
//         },
//         [],
//     )

//     const reverseGeocode = useCallback(
//         (coords: { lat: number; lng: number }) => {
//             if (!window.google || !isValidCoordinates(coords)) return

//             const geocoder = new google.maps.Geocoder()
//             geocoder.geocode(
//                 { location: coords },
//                 (results: any[], status: string) => {
//                     if (status === "OK" && results?.[0]) {
//                         const address = results[0]
//                         const addressComponents = address.address_components

//                         const addressData = {
//                             street: "",
//                             city: "",
//                             region: "",
//                             fullAddress: address.formatted_address,
//                         }

//                         addressComponents.forEach(
//                             (component: { types: any; long_name: string }) => {
//                                 const types = component.types

//                                 if (types.includes("route")) {
//                                     addressData.street = component.long_name
//                                 }
//                                 if (types.includes("locality")) {
//                                     addressData.city = component.long_name
//                                 }
//                                 if (
//                                     types.includes(
//                                         "administrative_area_level_1",
//                                     )
//                                 ) {
//                                     addressData.region = component.long_name
//                                 }
//                                 // Fallback for city if locality not found
//                                 if (
//                                     types.includes("sublocality") &&
//                                     !addressData.city
//                                 ) {
//                                     addressData.city = component.long_name
//                                 }
//                             },
//                         )

//                         console.log("Auto-filled address:", addressData)
//                         onAddressFilled(addressData)
//                     }
//                 },
//             )
//         },
//         [onAddressFilled],
//     )

//     const calculateDistance = useCallback(
//         (point1: google.maps.LatLng, point2: google.maps.LatLng): number => {
//             const R = 6371000
//             const dLat = ((point2.lat() - point1.lat()) * Math.PI) / 180
//             const dLng = ((point2.lng() - point1.lng()) * Math.PI) / 180
//             const a =
//                 Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//                 Math.cos((point1.lat() * Math.PI) / 180) *
//                     Math.cos((point2.lat() * Math.PI) / 180) *
//                     Math.sin(dLng / 2) *
//                     Math.sin(dLng / 2)
//             const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//             return R * c
//         },
//         [],
//     )

//     useEffect(() => {
//         if (!isLoaded || !mapRef.current || isInitialized) return

//         const initMap = () => {
//             try {
//                 const validCoordinates = getValidCoordinates(coordinates)

//                 if (!isValidCoordinates(coordinates)) {
//                     onCoordinatesChange(validCoordinates)
//                 }

//                 const map = new google.maps.Map(mapRef.current!, {
//                     center: validCoordinates,
//                     zoom: 17,
//                     disableDefaultUI: true,
//                     streetViewControl: false,
//                     fullscreenControl: false,
//                     gestureHandling: "greedy",
//                 })

//                 const mapTypeControlDiv = document.createElement("div")
//                 mapTypeControlDiv.className =
//                     "mt-2 ml-2 bg-white rounded-lg overflow-hidden shadow-md flex"

//                 const roadmapButton = document.createElement("button")
//                 roadmapButton.className =
//                     "px-3 py-2 text-sm font-medium bg-blue-100 text-blue-600"
//                 roadmapButton.textContent = "Xarita"
//                 roadmapButton.onclick = () => {
//                     map.setMapTypeId("roadmap")
//                     roadmapButton.className =
//                         "px-3 py-2 text-sm font-medium bg-blue-100 text-blue-600"
//                     satelliteButton.className =
//                         "px-3 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
//                 }

//                 const satelliteButton = document.createElement("button")
//                 satelliteButton.className =
//                     "px-3 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
//                 satelliteButton.textContent = "Suniy yo'ldosh"
//                 satelliteButton.onclick = () => {
//                     map.setMapTypeId("hybrid")
//                     satelliteButton.className =
//                         "px-3 py-2 text-sm font-medium bg-blue-100 text-blue-600"
//                     roadmapButton.className =
//                         "px-3 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
//                 }

//                 mapTypeControlDiv.appendChild(roadmapButton)
//                 mapTypeControlDiv.appendChild(satelliteButton)
//                 map.controls[google.maps.ControlPosition.TOP_LEFT].push(
//                     mapTypeControlDiv,
//                 )

//                 // Create marker
//                 const marker = new google.maps.Marker({
//                     position: validCoordinates,
//                     map,
//                     draggable: true,
//                     icon: {
//                         url:
//                             "data:image/svg+xml;charset=UTF-8," +
//                             encodeURIComponent(`
//               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#FF3B30"/>
//                 <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="white"/>
//               </svg>
//             `),
//                         scaledSize: new google.maps.Size(40, 40),
//                         anchor: new google.maps.Point(20, 40),
//                     },
//                 })

//                 marker.addListener("dragend", () => {
//                     const newPosition = marker.getPosition()!
//                     const newCoords = {
//                         lat: newPosition.lat(),
//                         lng: newPosition.lng(),
//                     }

//                     if (isValidCoordinates(newCoords)) {
//                         onCoordinatesChange(newCoords)
//                         reverseGeocode(newCoords)
//                     }
//                 })

//                 map.addListener("click", (event: google.maps.MapMouseEvent) => {
//                     if (event.latLng) {
//                         const newCoords = {
//                             lat: event.latLng.lat(),
//                             lng: event.latLng.lng(),
//                         }

//                         if (isValidCoordinates(newCoords)) {
//                             marker.setPosition(newCoords)
//                             onCoordinatesChange(newCoords)
//                             reverseGeocode(newCoords)
//                         }
//                     }
//                 })

//                 markerRef.current = marker
//                 mapInstanceRef.current = map
//                 setIsInitialized(true)

//                 console.log(
//                     "Map initialized with coordinates:",
//                     validCoordinates,
//                 )
//             } catch (error) {
//                 console.error("Error initializing map:", error)
//             }
//         }

//         initMap()
//     }, [
//         isLoaded,
//         isInitialized,
//         coordinates,
//         onCoordinatesChange,
//         reverseGeocode,
//         getValidCoordinates,
//     ])

//     useEffect(() => {
//         if (markerRef.current && mapInstanceRef.current && isInitialized) {
//             if (!isValidCoordinates(coordinates)) {
//                 console.error(
//                     "Invalid coordinates received, skipping update:",
//                     coordinates,
//                 )
//                 return
//             }

//             try {
//                 const newPosition = new google.maps.LatLng(
//                     coordinates.lat,
//                     coordinates.lng,
//                 )

//                 markerRef.current.setPosition(newPosition)

//                 const currentCenter = mapInstanceRef.current.getCenter()
//                 if (currentCenter) {
//                     let distance: number

//                     if (
//                         google.maps.geometry &&
//                         google.maps.geometry.spherical
//                     ) {
//                         distance =
//                             google.maps.geometry.spherical.computeDistanceBetween(
//                                 currentCenter,
//                                 newPosition,
//                             )
//                     } else {
//                         distance = calculateDistance(currentCenter, newPosition)
//                     }

//                     if (distance > 50) {
//                         mapInstanceRef.current?.panTo(newPosition)
//                     }
//                 } else {
//                     mapInstanceRef.current.panTo(newPosition)
//                 }

//                 console.log("Marker updated to coordinates:", coordinates)
//             } catch (error) {
//                 console.error("Error updating marker position:", error)
//             }
//         }
//     }, [
//         coordinates.lat,
//         coordinates.lng,
//         isInitialized,
//         calculateDistance,
//         coordinates,
//     ])

//     useEffect(() => {
//         console.log("Coordinates changed:", coordinates)
//         console.log("Coordinates valid?", isValidCoordinates(coordinates))
//     }, [coordinates])

//     if (loadError) {
//         return (
//             <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
//                 <div className="text-center text-red-600">
//                     <p>Xarita yuklanmadi</p>
//                     <p className="text-sm">{loadError}</p>
//                 </div>
//             </div>
//         )
//     }

//     if (!isLoaded) {
//         return (
//             <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="mt-2 text-gray-600">Xarita yuklanmoqda...</p>
//                 </div>
//             </div>
//         )
//     }

//     return <div ref={mapRef} className="w-full h-full rounded-lg" />
// }
