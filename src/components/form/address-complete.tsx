// components/form/google-address-autocomplete.tsx
import { useState, useRef, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Loader2, Navigation, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ["places"]

interface GoogleAddressAutocompleteProps {
  form: UseFormReturn<any>
  coordinatesFieldName: string
  addressFieldName?: string
  label?: string
  placeholder?: string
  required?: boolean
  apiKey: string
  className?: string
}

export const GoogleAddressAutocomplete = ({
  form,
  coordinatesFieldName,
  addressFieldName = "loading_address",
  label = "Yuklash manzili",
  placeholder = "Manzilni kiriting yoki tanlang...",
  required = false,
  apiKey,
  className,
}: GoogleAddressAutocompleteProps) => {
  const { setValue, watch } = form
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("")
  const [mapError, setMapError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)

  // Google Maps API ni yuklash
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  })

  // Get current coordinates from form
  const coordinates = watch(coordinatesFieldName)

  // Autocomplete ni o'rnatish
  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance)
  }

  // Place select bo'lganda
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        
        // Update coordinates in form
        setValue(coordinatesFieldName, [lng, lat], { shouldValidate: true })
        
        // Update address text
        const address = place.formatted_address || place.name || ""
        if (addressFieldName) {
          setValue(addressFieldName, address, { shouldValidate: true })
        }
        
        // Update local state
        setSelectedAddress(address)
        
        // Agar input bo'lsa, to'ldirish
        if (inputRef.current) {
          inputRef.current.value = address
        }
        
        // Markerni harakatlantirish
        if (map && marker) {
          const newLocation = new google.maps.LatLng(lat, lng)
          marker.setPosition(newLocation)
          map.panTo(newLocation)
          map.setZoom(15)
        }
      }
    }
  }

  // Mapni initialize qilish
  const initMap = () => {
    try {
      if (isLoaded && !map) {
        const defaultCenter = coordinates && coordinates.length === 2
          ? { lat: coordinates[1], lng: coordinates[0] }
          : { lat: 41.311081, lng: 69.240562 } // Tashkent default

        const mapContainer = document.getElementById("map")
        if (!mapContainer) {
          setMapError("Xarita konteyneri topilmadi")
          return
        }

        const mapInstance = new google.maps.Map(mapContainer, {
          center: defaultCenter,
          zoom: coordinates && coordinates.length === 2 ? 15 : 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP,
          },
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          styles: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }]
            }
          ]
        })

        const markerInstance = new google.maps.Marker({
          map: mapInstance,
          position: defaultCenter,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: "Yuklash joyi",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(40, 40)
          }
        })

        // Marker drag bo'lganda koordinatalarni yangilash
        google.maps.event.addListener(markerInstance, "dragend", () => {
          const position = markerInstance.getPosition()
          if (position) {
            const lat = position.lat()
            const lng = position.lng()
            
            setValue(coordinatesFieldName, [lng, lat], { shouldValidate: true })
            
            // Reverse geocoding - address ni topish
            reverseGeocode(lat, lng)
          }
        })

        setMap(mapInstance)
        setMarker(markerInstance)
        setMapError(null)
      }
    } catch (error) {
      console.error("Map initialization error:", error)
      setMapError("Xaritani yuklashda xatolik yuz berdi")
    }
  }

  // Reverse geocoding - koordinatalardan manzil topish
  const reverseGeocode = (lat: number, lng: number) => {
    if (isLoaded) {
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const address = results[0].formatted_address
          if (addressFieldName) {
            setValue(addressFieldName, address, { shouldValidate: true })
          }
          setSelectedAddress(address)
          
          if (inputRef.current) {
            inputRef.current.value = address
          }
        }
      })
    }
  }

  // Use my location button
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          
          setValue(coordinatesFieldName, [lng, lat], { shouldValidate: true })
          
          // Reverse geocoding qilish
          reverseGeocode(lat, lng)
          
          // Mapni yangilash
          if (map && marker) {
            const newLocation = new google.maps.LatLng(lat, lng)
            marker.setPosition(newLocation)
            map.panTo(newLocation)
            map.setZoom(15)
          }
          
          setIsLoading(false)
        },
        (error) => {
          console.error("Geolocation error:", error)
          setIsLoading(false)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    }
  }

  // Mapni yuklash
  useEffect(() => {
    if (isLoaded && !loadError) {
      initMap()
    }
  }, [isLoaded, loadError])

  if (loadError) {
    return (
      <div className={cn("space-y-3", className)}>
        <Label className="flex items-center gap-2 text-destructive">
          <MapPin className="h-4 w-4" />
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive">
          <p className="text-sm text-destructive">
            Google Maps yuklanmadi. Iltimos, internet aloqasini tekshiring.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Label */}
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 font-medium">
          <MapPin className="h-4 w-4 text-primary" />
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        
        {selectedAddress && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setValue(coordinatesFieldName, [], { shouldValidate: true })
              if (addressFieldName) {
                setValue(addressFieldName, "", { shouldValidate: true })
              }
              if (inputRef.current) {
                inputRef.current.value = ""
              }
              setSelectedAddress("")
            }}
            className="h-7 text-xs flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Tozalash
          </Button>
        )}
      </div>

      {/* Search Input with Google Autocomplete */}
      <div className="space-y-3">
        {isLoaded ? (
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
              types: ["address"],
              componentRestrictions: { country: "uz" },
            }}
          >
            <div className="relative">
              <Input
                ref={inputRef}
                placeholder={placeholder}
                className="pl-10 pr-10 h-11"
                onChange={(e) => {
                  if (!e.target.value.trim()) {
                    setValue(coordinatesFieldName, [], { shouldValidate: true })
                    setSelectedAddress("")
                  }
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
              )}
            </div>
          </Autocomplete>
        ) : (
          <div className="relative">
            <Input
              placeholder="Google Maps yuklanmoqda..."
              className="pl-10"
              disabled
            />
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUseMyLocation}
            disabled={!isLoaded || isLoading}
            className="flex-1"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Mening joylashuvim
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <Card className="overflow-hidden border-2">
        <CardContent className="p-0">
          <div className="relative">
            <div 
              id="map" 
              className="w-full h-[300px] bg-gray-100"
            />
            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-center p-4">
                  <p>{mapError}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Coordinates Display */}
      {Array.isArray(coordinates) && coordinates.length === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Longitude (Uzunlik)</Label>
              <div className="border rounded-md px-3 py-2 bg-gray-50">
                <code className="font-mono text-sm text-gray-800">
                  {coordinates[0].toFixed(6)}
                </code>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Latitude (Kenglik)</Label>
              <div className="border rounded-md px-3 py-2 bg-gray-50">
                <code className="font-mono text-sm text-gray-800">
                  {coordinates[1].toFixed(6)}
                </code>
              </div>
            </div>
          </div>

          {/* Selected Address Preview */}
          {selectedAddress && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-medium text-sm mb-2 flex items-center gap-2 text-blue-800">
                <MapPin className="h-4 w-4" />
                Tanlangan manzil:
              </div>
              <div className="text-sm text-gray-700 bg-white p-3 rounded border">
                {selectedAddress}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}