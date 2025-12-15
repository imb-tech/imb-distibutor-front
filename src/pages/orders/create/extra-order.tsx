import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { UseFormReturn } from "react-hook-form"
import { useGet } from "@/hooks/useGet"
import {
    SETTINGS_CUSTOMERS,
    SETTINGS_PAYMENT_TYPES,
} from "@/constants/api-endpoints"
import Modal from "@/components/custom/modal"
import { MapComponent } from "./map"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Map, MapPin } from "lucide-react"
import { useCallback } from "react"
import { useModal } from "@/hooks/useModal"

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

    const { data: paymentsData } =
        useGet<ListResponse<PaymentMethod>>(SETTINGS_PAYMENT_TYPES)

    /** ---------------- MAP MODAL ---------------- */
    const { openModal: openMap, closeModal: closeMap } = useModal("map")

    /** ---------------- FORM STATE ---------------- */
    const locationValue = watch("loading_coordinates")
    const currentAddress = watch("address")

    const coordinates = {
        lat: locationValue?.[1] ?? 41.2995,
        lng: locationValue?.[0] ?? 69.2401,
    }

    /** ---------------- HANDLERS ---------------- */
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

    /** ---------------- UI ---------------- */
    return (
        <div className="space-y-6">
            {/* ORDER INFO */}
            <div className="grid grid-cols-4 gap-4 items-center">
                <FormInput
                    methods={form}
                    name="code"
                    placeholder="Buyurtma ID"
                    className="max-w-sm"
                />

                <FormDatePicker
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
                        placeholder="Xaridor"
                        required
                        options={clientsData?.results}
                        name="client"
                        control={control}
                        className="w-full"
                    />

                    <FormCombobox
                        placeholder="Ustuvor transport"
                        required
                        options={[
                            { name: "Truck", id: 1 },
                            { name: "Van", id: 2 },
                            { name: "Box", id: 3 },
                        ]}
                        name="priority_vehicle"
                        control={control}
                        className="w-full"
                    />

                    <FormCombobox
                        placeholder="To'lov turi"
                        required
                        options={paymentsData?.results}
                        name="payment_type"
                        control={control}
                        className="w-full"
                    />

                    <FormInput
                        methods={form}
                        name="note"
                        placeholder="Eslatma"
                    />
                </div>
            </div>

            {/* CARGO DETAILS */}
            <div className="space-y-3">
                <h2 className="font-medium">Yuk tafsilotlari</h2>

                <div className="grid grid-cols-2 gap-4">
                    <FormNumberInput
                        thousandSeparator=" "
                        control={control}
                        name="weight"
                        placeholder="Og‘irligi (kg)"
                    />

                    <FormNumberInput
                        thousandSeparator=" "
                        control={control}
                        name="volume"
                        placeholder="Hajm (m³)"
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
                                        {currentAddress ? (
                                            <>
                                                <p className="text-sm font-medium">
                                                    {currentAddress}
                                                </p>
                                                <div className="flex gap-4 text-xs text-muted-foreground">
                                                    <span>
                                                        Kenglik: {Number(coordinates.lat).toFixed(6)}
                                                    </span>
                                                    <span>
                                                        Uzunlik: {
                                                            Number(coordinates.lng).toFixed(6)
                                                        }
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">
                                                    Joylashuv tanlanmagan
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Xaritadan joylashuvni tanlang
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant={currentAddress ? "outline" : "default"}
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

            <Modal
                size="max-w-4xl"
                title="Xaritada belgilash"
                modalKey="map"
            >
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
