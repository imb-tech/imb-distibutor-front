import Modal from "@/components/custom/modal"
import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    SETTINGS_CUSTOMERS,
    SETTINGS_PAYMENT_TYPES,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { Map, MapPin } from "lucide-react"
import { useCallback } from "react"
import { UseFormReturn } from "react-hook-form"
import { MapComponent } from "./map"

type Props = {
    form: UseFormReturn<any>
}

type PaymentMethod = {
    id: number
    name: string
}

export const ExtraOrders = ({ form }: Props) => {
    const { control, watch, setValue } = form

    const { data: clientsData } =
        useGet<ListResponse<CustomersType>>(SETTINGS_CUSTOMERS)

    const { data: paymentsData } = useGet<ListResponse<PaymentMethod>>(
        SETTINGS_PAYMENT_TYPES,
    )

    const { openModal: openMap, closeModal: closeMap } = useModal("map")

    const locationValue = watch("loading_coordinates")
    const currentAddress = watch("address")

    const coordinates = {
        lat: locationValue?.[1] ?? 41.2995,
        lng: locationValue?.[0] ?? 69.2401,
    }

    const handleMapOpen = () => {
        openMap()
    }

    const handleMapSelection = () => {
        closeMap()
    }

    const handleAddressFilled = useCallback(
        (address: {
            street: string
            city: string
            region: string
            fullAddress: string
        }) => {
            setValue("address", address.fullAddress, {
                shouldDirty: true,
                shouldValidate: true,
            })
        },
        [setValue],
    )

    const handleCoordinatesChange = useCallback(
        (coords: { lat: number; lng: number }) => {
            setValue("loading_coordinates.0", coords.lng, { shouldDirty: true })
            setValue("loading_coordinates.1", coords.lat, { shouldDirty: true })
        },
        [setValue],
    )

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4 items-center">
                <FormInput
                    label="Buyurtma ID"
                    methods={form}
                    name="code"
                    placeholder="Buyurtma raqami"
                    className="max-w-sm"
                />

                <FormDatePicker
                    label="Yetkazib berish sanasi"
                    className="!w-full"
                    control={control}
                    name="scheduled_delivery_date"
                    placeholder="Sanani tanlang"
                />
            </div>

            {/* CUSTOMER DETAILS */}
            <div className="space-y-3">
                <h2 className="font-medium">Mijoz Tafsilotlari</h2>

                <div className="grid grid-cols-2 gap-4">
                    <FormCombobox
                        label="Xaridor"
                        required
                        options={clientsData?.results}
                        name="client"
                        control={control}
                        className="w-full"
                        placeholder="Xaridorni tanlang"
                    />

                    <FormCombobox
                        label="Ustuvor transport"
                        required
                        options={[
                            { name: "Yuk mashinasi", id: 1 },
                            { name: "Furgon", id: 2 },
                            { name: "Konteyner", id: 3 },
                        ]}
                        name="priority_vehicle"
                        control={control}
                        className="w-full"
                        placeholder="Transport turini tanlang"
                    />

                    <FormCombobox
                        label="To'lov turi"
                        required
                        options={paymentsData?.results}
                        name="payment_type"
                        control={control}
                        className="w-full"
                        placeholder="To'lov turini tanlang"
                    />

                    <FormInput
                        label="Izoh"
                        methods={form}
                        name="note"
                        placeholder="Qo'shimcha izoh"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <h2 className="font-medium">Yuk Tafsilotlari</h2>

                <div className="grid grid-cols-2 gap-4">
                    <FormNumberInput
                        label="Og'irligi (kg)"
                        thousandSeparator=" "
                        control={control}
                        name="weight"
                        placeholder="Og'irlik kiriting"
                    />

                    <FormNumberInput
                        label="Hajm (m³)"
                        thousandSeparator=" "
                        control={control}
                        name="volume"
                        placeholder="Hajm kiriting"
                    />

                    {/* MAP CARD */}
                    <Card className="col-span-2 border-dashed border-2 hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        {currentAddress ?
                                            <>
                                                <p className="text-sm font-medium">
                                                    {currentAddress}
                                                </p>
                                                <div className="flex gap-4 text-xs text-muted-foreground">
                                                    <span>
                                                        Kenglik:{" "}
                                                        {Number(
                                                            coordinates.lat,
                                                        ).toFixed(6)}
                                                    </span>
                                                    <span>
                                                        Uzunlik:{" "}
                                                        {Number(
                                                            coordinates.lng,
                                                        ).toFixed(6)}
                                                    </span>
                                                </div>
                                            </>
                                        :   <div className="space-y-1">
                                                <p className="text-sm font-medium">
                                                    Joylashuv tanlanmagan
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Xaritadan joylashuvni
                                                    tanlang
                                                </p>
                                            </div>
                                        }
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant={
                                        currentAddress ? "outline" : "default"
                                    }
                                    onClick={handleMapOpen}
                                >
                                    <Map className="w-4 h-4 mr-2" />
                                    Tanlash
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="hidden">
                <FormNumberInput control={control} name="location.0" />
                <FormNumberInput control={control} name="location.1" />
            </div>

            <Modal size="max-w-4xl" title="Xaritada belgilash" modalKey="map">
                <MapComponent
                    coordinates={coordinates}
                    onCoordinatesChange={handleCoordinatesChange}
                    onAddressFilled={handleAddressFilled}
                    showSearch
                    showMapControls
                    showCurrentLocationBtn
                    searchPlaceholder="Manzilni qidirish..."
                    mapHeight="500px"
                    className="rounded-lg"
                />

                <div className="flex justify-end mt-4">
                    <Button
                        type="button"
                        variant="default2"
                        onClick={handleMapSelection}
                        disabled={!currentAddress}
                    >
                        Tanlashni tasdiqlash
                    </Button>
                </div>
            </Modal>
        </div>
    )
}