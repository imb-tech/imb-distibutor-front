import {
    GoogleMap,
    useLoadScript,
    LoadScriptProps,
    MarkerF,
} from "@react-google-maps/api";
import Spinner from "@/components/ui/spinner";
import { useTheme } from "@/layouts/theme";
import { darkModeStyle } from "@/constants/map-dark-mode-style";

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const defaultZoom = 10;

function SeeMap({ lat, long }: { lat: number; long: number }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    } as LoadScriptProps);

    const { theme } = useTheme();

    const handleMapLoad = (map: google.maps.Map) => {
        if (map) {
            map.panTo({ lat: +lat, lng: +long });
            map.setZoom(defaultZoom);
        }
    };

    if (loadError) return <div>Xatolik yuz berdi</div>;
    if (!isLoaded)
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner />
            </div>
        );

    return (
        <div className="relative w-full !h-[400px] overflow-hidden">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={defaultZoom}
                center={{ lat: +lat, lng: +long }}
                onLoad={handleMapLoad}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    styles: theme === "light" ? [] : darkModeStyle,
                }}
            >
                <MarkerF
                    position={{ lat: +lat, lng: +long }}
                    animation={window.google.maps.Animation.DROP}
                />
            </GoogleMap>
        </div>
    );
}

export default SeeMap;
