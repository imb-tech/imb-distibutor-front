// components/form/google-address-autocomplete.tsx
import { useState, useRef, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Loader2, Navigation } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api"
import { Card, CardContent } from "@/components/ui/card"

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ["places"]

interface GoogleAddressAutocompleteProps {
  form: UseFormReturn<any>
  coordinatesFieldName: string
  addressFieldName?: string
  label?: string
  placeholder?: string
  required?: boolean
  apiKey: string
}

export const GoogleAddressAutocomplete = ({
  form,
  coordinatesFieldName,
  addressFieldName = "loading_address",
  label = "Yuklash manzili",
  placeholder = "Manzilni kiriting yoki tanlang...",
  required = false,
  apiKey,
}: GoogleAddressAutocompleteProps) => {
  const { setValue, watch } = form
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("")
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
    if (isLoaded && !map) {
      const defaultCenter = coordinates && coordinates.length === 2
        ? { lat: coordinates[1], lng: coordinates[0] }
        : { lat: 41.311081, lng: 69.240562 } // Tashkent default

      const mapInstance = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: defaultCenter,
        zoom: coordinates && coordinates.length === 2 ? 15 : 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })

      const markerInstance = new google.maps.Marker({
        map: mapInstance,
        position: defaultCenter,
        draggable: true,
        animation: google.maps.Animation.DROP,
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

  // Format coordinates for display
  const formatCoordinates = () => {
    if (Array.isArray(coordinates) && coordinates.length === 2) {
      const [lng, lat] = coordinates
      return `[${lng.toFixed(6)}, ${lat.toFixed(6)}]`
    }
    return "Koordinatalar kiritilmagan"
  }

  if (loadError) {
    return (
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-destructive">
          <MapPin className="h-4 w-4" />
          {label}
        </Label>
        <div className="p-4 bg-destructive/10 rounded-md border border-destructive">
          <p className="text-sm text-destructive">
            Google Maps yuklanmadi. Iltimos, internet aloqasini tekshiring.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Label */}
      <Label className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>

      {/* Search Input with Google Autocomplete */}
      <div className="space-y-3">
        {isLoaded ? (
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
              types: ["address"],
              componentRestrictions: { country: "uz" }, // O'zbekiston uchun
            }}
          >
            <div className="relative">
              <Input
                ref={inputRef}
                placeholder={placeholder}
                className="pl-10 pr-10"
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

        {/* Use My Location Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUseMyLocation}
          disabled={!isLoaded || isLoading}
          className="w-full"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Mening joylashuvimdan foydalanish
        </Button>
      </div>

      {/* Map Container */}
      <Card>
        <CardContent className="p-0">
          <div id="map" className="w-full h-[300px] rounded-lg overflow-hidden" />
        </CardContent>
      </Card>

      {/* Coordinates Display */}
      {Array.isArray(coordinates) && coordinates.length === 2 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Longitude (Uzunlik)</Label>
              <div className="border rounded-md px-3 py-2 bg-muted">
                <code className="font-mono text-sm">
                  {coordinates[0].toFixed(6)}
                </code>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Latitude (Kenglik)</Label>
              <div className="border rounded-md px-3 py-2 bg-muted">
                <code className="font-mono text-sm">
                  {coordinates[1].toFixed(6)}
                </code>
              </div>
            </div>
          </div>

         

          {/* Selected Address Preview */}
          {selectedAddress && (
            <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
              <div className="font-medium text-sm mb-1 flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                Tanlangan manzil:
              </div>
              <div className="text-sm text-gray-700">
                {selectedAddress}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Clear Button */}
      <div className="flex justify-end">
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
            
            // Mapni reset qilish
            if (map && marker) {
              const defaultCenter = { lat: 41.311081, lng: 69.240562 }
              marker.setPosition(defaultCenter)
              map.panTo(defaultCenter)
              map.setZoom(12)
            }
          }}
          className="h-7 text-xs"
        >
          Tozalash
        </Button>
      </div>
    </div>
  )
}