import { useGeolocation } from "@uidotdev/usehooks"
import { MapPin, Navigation, Search, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useGoogleMaps } from "./useGoogleMaps"

interface AddressSearchProps {
    onLocationSelect: (coords: { lat: number; lng: number }) => void
    onAddressFilled: (addressData: any) => void
    onSearchByLocation?: () => void
    isEditing?: boolean
    editingLocation?: {
        street: string
        city: string
        region: string
        home: number
        latitude: number
        longitude: number
    } | null
    onBackToForm?: () => void
    compactMode?: boolean
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
    onLocationSelect,
    onAddressFilled,
    isEditing = false,
    editingLocation = null,
    compactMode = false,
}) => {
    const [address, setAddress] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [suggestions, setSuggestions] = useState<
        google.maps.places.AutocompletePrediction[]
    >([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isSelecting, setIsSelecting] = useState(false)
    const autocompleteServiceRef =
        useRef<google.maps.places.AutocompleteService | null>(null)
    const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
        null,
    )
    const suggestionsRef = useRef<HTMLDivElement>(null)
    const { isLoaded } = useGoogleMaps()
    const { latitude, longitude, error, loading } = useGeolocation({
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
    })

    const initializedRef = useRef(false)

    // Click outside handler to close suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Initialize Google Maps services
    useEffect(() => {
        if (!isLoaded) return

        autocompleteServiceRef.current =
            new google.maps.places.AutocompleteService()
        placesServiceRef.current = new google.maps.places.PlacesService(
            document.createElement("div"),
        )
    }, [isLoaded])

    useEffect(() => {
        if (isEditing && editingLocation && !initializedRef.current) {
            const fullAddress = `${editingLocation.street} ${editingLocation.home || ""}, ${editingLocation.city}, ${editingLocation.region}`
            setAddress(fullAddress)
            setSearchQuery(fullAddress)
            onAddressFilled({
                street: editingLocation.street,
                city: editingLocation.city,
                region: editingLocation.region,
                fullAddress: fullAddress,
            })

            onLocationSelect({
                lat: editingLocation.latitude,
                lng: editingLocation.longitude,
            })

            initializedRef.current = true
        }
    }, [isEditing, editingLocation, onAddressFilled, onLocationSelect])

    const getAddressFromCoords = async (
        lat: number,
        lng: number,
    ): Promise<string> => {
        if (!isLoaded) return ""

        return new Promise((resolve) => {
            const geocoder = new google.maps.Geocoder()

            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === "OK" && results && results[0]) {
                    resolve(results[0].formatted_address)
                } else {
                    resolve(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
                }
            })
        })
    }

    
    useEffect(() => {
        if (
            !isLoaded ||
            !autocompleteServiceRef.current ||
            !searchQuery.trim() ||
            isSelecting
        ) {
            setSuggestions([])
            return
        }

        const timer = setTimeout(() => {
            autocompleteServiceRef.current!.getPlacePredictions(
                {
                    input: searchQuery,
                    componentRestrictions: { country: "uz" },
                    types: ["address"],
                },
                (predictions, status) => {
                    if (
                        status === google.maps.places.PlacesServiceStatus.OK &&
                        predictions
                    ) {
                        setSuggestions(predictions)
                    } else {
                        setSuggestions([])
                    }
                },
            )
        }, 300)

        return () => clearTimeout(timer)
    }, [searchQuery, isLoaded, isSelecting])

    const handlePlaceSelect = useCallback(
        (placeId: string) => {
            if (!isLoaded || !placesServiceRef.current) return

            setIsSelecting(true)
            setShowSuggestions(false)

            placesServiceRef.current.getDetails(
                {
                    placeId: placeId,
                    fields: [
                        "geometry",
                        "address_components",
                        "formatted_address",
                        "name",
                    ],
                },
                (place, status) => {
                    setIsSelecting(false)
                    if (
                        status === google.maps.places.PlacesServiceStatus.OK &&
                        place &&
                        place.geometry
                    ) {
                        const newCoords = {
                            lat: place.geometry.location!.lat(),
                            lng: place.geometry.location!.lng(),
                        }

                        console.log("Place selected:", newCoords)
                        const formattedAddress = place.formatted_address || ""
                        setAddress(formattedAddress)
                        setSearchQuery(formattedAddress)
                        setSuggestions([])

                        onLocationSelect(newCoords)

                        const addressData = {
                            street: "",
                            city: "",
                            region: "",
                            fullAddress: formattedAddress,
                        }

                        place.address_components?.forEach((component) => {
                            const types = component.types

                            if (types.includes("route")) {
                                addressData.street = component.long_name
                            }
                            if (types.includes("locality")) {
                                addressData.city = component.long_name
                            }
                            if (types.includes("administrative_area_level_1")) {
                                addressData.region = component.long_name
                            }
                            if (
                                types.includes("sublocality") &&
                                !addressData.city
                            ) {
                                addressData.city = component.long_name
                            }
                        })

                        
                        onAddressFilled(addressData)
                    }
                },
            )
        },
        [isLoaded, onLocationSelect, onAddressFilled],
    )

    const handleGetExactLocation = async () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser")
            return
        }

        if (loading) {
            return
        }

        if (error) {
            console.error("Geolocation error:", error)
            toast.error(
                "Joylashuvni olishda xatolik yuz berdi. Iltimos, brauzeringizda joylashuv ruxsatini tekshiring.",
            )
            return
        }

        if (latitude !== null && longitude !== null) {
            try {
                setIsSelecting(true)
                setShowSuggestions(false)

                console.log("Getting exact location:", {
                    lat: latitude,
                    lng: longitude,
                })

              
                onLocationSelect({ lat: latitude, lng: longitude })

                
                const exactAddress = await getAddressFromCoords(
                    latitude,
                    longitude,
                )

                setAddress(exactAddress)
                setSearchQuery(exactAddress)
                setSuggestions([])

               
                if (isLoaded) {
                    const geocoder = new google.maps.Geocoder()
                    geocoder.geocode(
                        { location: { lat: latitude, lng: longitude } },
                        (results, status) => {
                            setIsSelecting(false)
                            if (status === "OK" && results && results[0]) {
                                const addressData = {
                                    street: "",
                                    city: "",
                                    region: "",
                                    fullAddress: exactAddress,
                                }

                                results[0].address_components?.forEach(
                                    (component) => {
                                        const types = component.types

                                        if (types.includes("route")) {
                                            addressData.street =
                                                component.long_name
                                        }
                                        if (types.includes("locality")) {
                                            addressData.city =
                                                component.long_name
                                        }
                                        if (
                                            types.includes(
                                                "administrative_area_level_1",
                                            )
                                        ) {
                                            addressData.region =
                                                component.long_name
                                        }
                                        if (
                                            types.includes("sublocality") &&
                                            !addressData.city
                                        ) {
                                            addressData.city =
                                                component.long_name
                                        }
                                    },
                                )

                                onAddressFilled(addressData)
                            }
                        },
                    )
                }
            } catch (error) {
                setIsSelecting(false)
                console.error("Error getting exact location:", error)
                toast.error("Joylashuvni olishda xatolik yuz berdi")
            }
        }
    }

    const handleClearSearch = () => {
        setSearchQuery("")
        setAddress("")
        setSuggestions([])
        setShowSuggestions(false)
        onAddressFilled({
            street: "",
            city: "",
            region: "",
            fullAddress: "",
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)

        if (!value.trim()) {
            setAddress("")
            setSuggestions([])
            setShowSuggestions(false)
            onAddressFilled({
                street: "",
                city: "",
                region: "",
                fullAddress: "",
            })
        } else {
            setShowSuggestions(true)
        }
    }

    const handleInputFocus = () => {
        if (suggestions.length > 0 && !isSelecting) {
            setShowSuggestions(true)
        }
    }

    if (compactMode) {
        return (
            <div className="space-y-3 relative">
                <div className="relative">
                    <input
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Manzilni yozing yoki joylashuv orqali toping..."
                        type="text"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="absolute right-11 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleGetExactLocation}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Joylashuv orqali qidirish"
                        disabled={loading || isSelecting}
                    >
                        <Navigation
                            className={`w-4 h-4 ${loading || isSelecting ? "text-gray-400" : "text-blue-600"}`}
                        />
                    </button>
                </div>
 
                {showSuggestions && suggestions.length > 0 && (
                    <div
                        ref={suggestionsRef}
                        className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                        {suggestions.map((suggestion) => (
                            <button
                                key={suggestion.place_id}
                                type="button"
                                onClick={() =>
                                    handlePlaceSelect(suggestion.place_id)
                                }
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-sm text-gray-800"
                            >
                                <div className="flex items-center">
                                    <Search className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                                    <span className="truncate">
                                        {suggestion.description}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

           
                {(loading || isSelecting) && (
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-xs flex items-center">
                            <span className="animate-spin mr-2">⟳</span>
                            {isSelecting ?
                                "Manzil tanlanmoqda..."
                            :   "Joylashuv aniqlanmoqda..."}
                        </p>
                    </div>
                )}

                {error && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-xs">
                            {error.message ||
                                "Joylashuvni olishda xatolik yuz berdi"}
                        </p>
                    </div>
                )}
            </div>
        )
    }

  
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg">
                        {isEditing ? "Manzilni qidirish" : "Manzil qidirish"}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Manzilni yozing yoki joylashuv orqali toping
                    </p>
                </div>
            </div>

            <div className="relative mb-6">
                <div className="relative">
                    <input
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Manzilni yozing yoki joylashuv orqali toping..."
                        type="text"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleGetExactLocation}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Joylashuv orqali qidirish"
                        disabled={loading || isSelecting}
                    >
                        <Navigation
                            className={`w-4 h-4 ${loading || isSelecting ? "text-gray-400" : "text-blue-600"}`}
                        />
                    </button>
                </div>

                {showSuggestions && suggestions.length > 0 && (
                    <div
                        ref={suggestionsRef}
                        className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                        {suggestions.map((suggestion) => (
                            <button
                                key={suggestion.place_id}
                                type="button"
                                onClick={() =>
                                    handlePlaceSelect(suggestion.place_id)
                                }
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-gray-800"
                            >
                                <div className="flex items-center">
                                    <Search className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                                    <span>{suggestion.description}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {(loading || isSelecting) && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm font-medium flex items-center">
                        <span className="animate-spin mr-2">⟳</span>
                        {isSelecting ?
                            "Manzil tanlanmoqda..."
                        :   "Joylashuv aniqlanmoqda..."}
                    </p>
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                        {error.message ||
                            "Joylashuvni olishda xatolik yuz berdi"}
                    </p>
                </div>
            )}

            {address && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <div>
                            <p className="text-blue-800 font-medium text-sm mb-1">
                                Tanlangan manzil:
                            </p>
                            <p className="text-blue-700">{address}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
