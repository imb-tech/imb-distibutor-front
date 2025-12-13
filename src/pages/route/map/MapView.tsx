import {
    FullscreenControl,
    GeolocationControl,
    Map,
    Placemark,
    Polyline,
    RulerControl,
    SearchControl,
    TrafficControl,
    TypeSelector,
    YMaps,
    ZoomControl,
} from "@pbe/react-yandex-maps"

const stores: number[][] = [
    [41.2995, 69.2401],
    [41.3111, 69.2797],
    [41.3265, 69.2287],
    [41.2842, 69.2036],
    [41.3182, 69.2621],
    [41.2756, 69.2134],
    [41.3453, 69.2845],
    [41.3128, 69.2967],
    [41.2904, 69.2698],
    [41.3042, 69.2519],
    [41.3333, 69.2122],
    [41.2987, 69.3154],
    [41.2879, 69.2891],
    [41.3219, 69.2387],
    [41.3412, 69.2615],
    [41.2733, 69.2446],
    [41.3561, 69.3008],
    [41.3088, 69.2254],
    [41.2922, 69.2318],
    [41.3277, 69.2742],
]

export default function YandexMapView() {
    const defaultState = {
        center: [41.2995, 69.2401],
        zoom: 12,
    }

    return (
        <YMaps>
            <div style={{ height: "600px", width: "100%" }}>
                <Map
                    defaultState={defaultState}
                    width="100%"
                    height="100%"
                    options={{
                        exitFullscreenByEsc: true,
                        yandexMapAutoSwitch: true,
                        suppressMapOpenBlock: true,
                    }}
                >
                    <>
                        {/* Qidiruv paneli */}
                        <SearchControl />
                        {/* Zoom tugmalari */}
                        <ZoomControl />

                        {/* Hozirgi joylashuvni aniqlash tugmasi */}
                        <GeolocationControl />

                        {/* Xarita turini tanlash */}
                        <TypeSelector />

                        {/* Trafik holatini ko‘rsatish */}
                        <TrafficControl />

                        {/* Masofani o‘lchash */}
                        <RulerControl />

                        {/* Fullscreen tugmasi */}
                        <FullscreenControl />
                    </>

                    {stores.map((coords, i) => (
                        <Placemark
                            key={i}
                            geometry={coords}
                            options={{
                                preset: "islands#redShoppingIcon",
                            }}
                            properties={{
                                balloonContent: `Do‘kon ${i + 1}`,
                            }}
                        />
                    ))}

                    <Polyline
                        geometry={stores}
                        options={{
                            strokeColor: "#0000FF",
                            strokeWidth: 4,
                            strokeOpacity: 0.8,
                        }}
                    />
                </Map>
            </div>
        </YMaps>
    )
}
