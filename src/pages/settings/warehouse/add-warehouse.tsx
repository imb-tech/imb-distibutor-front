import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { SETTINGS_WAREHOUSE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { MapComponent } from "../map"
import { AddressSearch } from "../map/address-search"

export type WarehouseType = {
    uuid?: string
    name: string
    address: string
    location: [number, number]
}

const AddWarehouse = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()

    const currentWarehouse = getData<WarehouseType>(SETTINGS_WAREHOUSE)

    const form = useForm<WarehouseType>({
        defaultValues: currentWarehouse || {
            name: "",
            address: "",
            location: [69.2401, 41.2995], // [lng, lat]
        },
    })

    const { handleSubmit, reset, control, watch, setValue, getValues } = form

    const coordinates = {
        lat: watch("location.1") ?? 41.2995,
        lng: watch("location.0") ?? 69.2401,
    }

    useEffect(() => {
        console.log("Current coordinates in form:", coordinates)
        console.log("Full location array:", getValues("location"))
    }, [coordinates, getValues])

    const onSuccess = () => {
        toast.success(
            currentWarehouse?.uuid ?
                "Ombor muvaffaqiyatli tahrirlandi!"
            :   "Ombor muvaffaqiyatli qo'shildi!",
        )
        reset()
        clearKey(SETTINGS_WAREHOUSE)
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_WAREHOUSE] })
    }

    const { mutate: create, isPending: creating } = usePost({ onSuccess })
    const { mutate: update, isPending: updating } = usePatch({ onSuccess })
    const isPending = creating || updating

    const onSubmit = (data: WarehouseType) => {
        console.log("Submitting data:", data)
        if (currentWarehouse?.uuid) {
            update(`${SETTINGS_WAREHOUSE}/${currentWarehouse.uuid}`, data)
        } else {
            create(SETTINGS_WAREHOUSE, data)
        }
    }

    // In your AddWarehouse component, update the handleLocationSelect function:

    const handleLocationSelect = useCallback(
        ({ lat, lng }: { lat: number; lng: number }) => {
            console.log("handleLocationSelect called with:", { lat, lng })

            setValue("location.0", lng, {
                shouldDirty: true,
                shouldValidate: true,
            })
            setValue("location.1", lat, {
                shouldDirty: true,
                shouldValidate: true,
            })
        },
        [setValue],
    )

    const handleAddressFilled = useCallback(
        (addressData: any) => {
            console.log("handleAddressFilled called with:", addressData)
            setValue("address", addressData.fullAddress ?? "", {
                shouldDirty: true,
                shouldValidate: true,
            })
        },
        [setValue],
    )

    const handleCoordinatesChange = useCallback(
        (coords: { lat: number; lng: number }) => {
            console.log("handleCoordinatesChange called with:", coords)
            setValue("location.0", coords.lng, { shouldDirty: true })
            setValue("location.1", coords.lat, { shouldDirty: true })
        },
        [setValue],
    )

    return (
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar-x p-1">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                <div className="space-y-4">
                    <FormInput
                        required
                        name="name"
                        label="Ombor nomi"
                        methods={form}
                    />

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Manzil <span className="text-red-500">*</span>
                        </label>
                        <AddressSearch
                            onLocationSelect={handleLocationSelect}
                            onAddressFilled={handleAddressFilled}
                            onSearchByLocation={() => {}}
                            isEditing={!!currentWarehouse?.uuid}
                            editingLocation={null}
                            onBackToForm={() => {}}
                            compactMode={true}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormNumberInput<WarehouseType>
                            required
                            name="location.0"
                            label="Uzunlik (Longitude)"
                            control={control}
                            decimalScale={6}
                            thousandSeparator=" "
                            decimalSeparator="."
                            allowNegative={false}
                            valueIsNumericString={false}
                            formatOptions={{
                                minimumFractionDigits: 6,
                                maximumFractionDigits: 6,
                            }}
                        />

                        <FormNumberInput<WarehouseType>
                            required
                            name="location.1"
                            label="Kenglik (Latitude)"
                            control={control}
                            decimalScale={6}
                            thousandSeparator=" "
                            decimalSeparator="."
                            allowNegative={false}
                            valueIsNumericString={false}
                            formatOptions={{
                                minimumFractionDigits: 6,
                                maximumFractionDigits: 6,
                            }}
                        />
                    </div>
                </div>

                <div className="h-[400px] lg:h-[500px]">
                    <MapComponent
                        coordinates={coordinates}
                        onCoordinatesChange={handleCoordinatesChange}
                        onAddressFilled={handleAddressFilled}
                    />
                </div>

                <div className="lg:col-span-2 flex justify-end">
                    <Button
                        type="submit"
                        loading={isPending}
                        className="min-w-40"
                        variant={"default2"}
                    >
                        Saqlash
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddWarehouse
