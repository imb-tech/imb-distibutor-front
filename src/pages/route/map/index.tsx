"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MapPin, Percent, Users, Warehouse, Settings, Maximize2, ChevronDown, Save, Home, Heart } from "lucide-react"

interface Waypoint {
  id: string
  lat: number
  lng: number
  name: string
  type: "destination" | "waypoint" | "location"
}

interface TruckLocation {
  lat: number
  lng: number
  name: string
}

const MapTracker: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [showLocation, setShowLocation] = useState(true)
  const [showPercentage, setShowPercentage] = useState(false)
  const [showUsers, setShowUsers] = useState(false)
  const [showWarehouse, setShowWarehouse] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Haydovchilar")
  const [error, setError] = useState<string | null>(null)

  const truckLocation: TruckLocation = {
    lat: 41.3067,
    lng: 69.2679,
    name: "Current Location",
  }

  const waypoints: Waypoint[] = [
    { id: "1", lat: 41.2824, lng: 69.2286, name: "Tashkent", type: "waypoint" },
    { id: "2", lat: 41.2895, lng: 69.2401, name: "Bazaar Chorsu", type: "waypoint" },
    { id: "3", lat: 41.302, lng: 69.2401, name: "Metro", type: "waypoint" },
    { id: "4", lat: 41.3067, lng: 69.2679, name: "NeurON Medical", type: "destination" },
    { id: "5", lat: 41.325, lng: 69.28, name: "Tashkentskiy Zoo", type: "location" },
    { id: "6", lat: 41.34, lng: 69.27, name: "Destination", type: "waypoint" },
  ]

  const stats = [
    { label: "Total", value: 0, color: "bg-green-100 text-green-700" },
    { label: "Active", value: 0, color: "bg-orange-100 text-orange-700" },
    { label: "Pending", value: 0, color: "bg-pink-100 text-pink-700" },
    { label: "Completed", value: 0, color: "bg-blue-100 text-blue-700" },
  ]

  useEffect(() => {
    if (!mapContainer.current) return

    const initMap = async () => {
      try {
        const response = await fetch("/api/google-maps-config")
        const  apiKey  = 'AIzaSyDE1X4ckZsrfsMRRN2yN0NlXfdrS8kibAE'

        if (!apiKey) {
          setError("API key not configured")
          console.error("[v0] Google Maps API key not available")
          return
        }

        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`
        script.async = true
        script.onload = () => {
          map.current = new window.google.maps.Map(mapContainer.current!, {
            zoom: 13,
            center: { lat: truckLocation.lat, lng: truckLocation.lng },
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7c8fa3" }],
              },
            ],
          })

          const routePath = waypoints.map((w) => ({ lat: w.lat, lng: w.lng }))
          new window.google.maps.Polyline({
            path: routePath,
            geodesic: true,
            strokeColor: "#ff8c42",
            strokeOpacity: 1,
            strokeWeight: 5,
            map: map.current,
            zIndex: 1,
          })

          const truckIcon = document.createElement("div")
          truckIcon.innerHTML = `
            <div style="
              width: 50px;
              height: 50px;
              background-color: #ff6b35;
              border: 3px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.25);
              font-size: 24px;
            ">✓</div>
          `

          new window.google.maps.marker.AdvancedMarkerElement({
            position: { lat: truckLocation.lat, lng: truckLocation.lng },
            map: map.current,
            title: "Truck Location",
            content: truckIcon,
          })

          waypoints.forEach((waypoint) => {
            const markerColor =
              waypoint.type === "destination" ? "#ff6b35" : waypoint.type === "location" ? "#60a5fa" : "#ff8c42"

            const markerDiv = document.createElement("div")
            markerDiv.innerHTML = `
              <div style="
                width: 40px;
                height: 40px;
                background-color: ${markerColor};
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                font-size: 18px;
              ">📍</div>
            `

            new window.google.maps.marker.AdvancedMarkerElement({
              position: { lat: waypoint.lat, lng: waypoint.lng },
              map: map.current,
              title: waypoint.name,
              content: markerDiv,
            })
          })
        }
        script.onerror = () => {
          setError("Failed to load Google Maps")
          console.error("[v0] Failed to load Google Maps script")
        }
        document.head.appendChild(script)
      } catch (err) {
        setError("Failed to fetch map configuration")
        console.error("[v0] Error fetching map config:", err)
      }
    }

    initMap()
  }, [])

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error: {error}</p>
          <p className="text-gray-600 text-sm mt-2">Please check your API key configuration</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-24 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-4 shadow-sm">
        {/* Location Toggle */}
        <div className="flex flex-col items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-400" />
          <button
            onClick={() => setShowLocation(!showLocation)}
            className={`w-10 h-6 rounded-full transition-colors ${showLocation ? "bg-gray-800" : "bg-gray-300"}`}
          />
        </div>

        {/* Percentage Toggle */}
        <div className="flex flex-col items-center gap-2">
          <Percent className="w-5 h-5 text-gray-400" />
          <button
            onClick={() => setShowPercentage(!showPercentage)}
            className={`w-10 h-6 rounded-full transition-colors ${showPercentage ? "bg-gray-800" : "bg-gray-300"}`}
          />
        </div>

        {/* Users Toggle */}
        <div className="flex flex-col items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" />
          <button
            onClick={() => setShowUsers(!showUsers)}
            className={`w-10 h-6 rounded-full transition-colors ${showUsers ? "bg-gray-800" : "bg-gray-300"}`}
          />
        </div>

        {/* Warehouse Toggle */}
        <div className="flex flex-col items-center gap-2">
          <Warehouse className="w-5 h-5 text-gray-400" />
          <button
            onClick={() => setShowWarehouse(!showWarehouse)}
            className={`w-10 h-6 rounded-full transition-colors ${showWarehouse ? "bg-gray-800" : "bg-gray-300"}`}
          />
        </div>

        {/* Saqlash (Save) Label */}
        <div className="mt-4 flex items-center gap-2 bg-gradient-to-r from-orange-50 to-orange-50 px-3 py-2 rounded-lg border border-orange-200">
          <Save className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-semibold text-gray-700">Saqlash</span>
        </div>

        {/* Settings */}
        <div className="mt-auto flex flex-col items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Status Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
          {/* Location Dropdown */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <span className="text-sm font-semibold text-gray-700">{selectedLocation}</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Status Stats */}
          <div className="flex items-center gap-3">
            {/* Percentage */}
            <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded">
              <Percent className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-700">1</span>
            </div>

            {/* Users Count */}
            <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-700">0</span>
            </div>

            {/* Location Progress */}
            <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-700">0/53</span>
            </div>

            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-xs ${stat.color}`}
              >
                <span>{stat.value}</span>
              </div>
            ))}

            {/* Additional Counter */}
            <div className="flex items-center gap-2 px-2 py-1 bg-blue-100 rounded">
              <span className="text-xs font-semibold text-blue-700">1</span>
            </div>
          </div>

          {/* Fullscreen */}
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <Maximize2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Map Container */}
        <div
          ref={mapContainer}
          className="flex-1 relative bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden"
        />

        {/* Floating Action Buttons */}
        <button className="absolute bottom-6 right-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
          <Maximize2 className="w-5 h-5 text-gray-600" />
        </button>

        <button className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
        </button>

        <button className="absolute bottom-6 left-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
          <Home className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
        </button>
      </div>
    </div>
  )
}

export default MapTracker
