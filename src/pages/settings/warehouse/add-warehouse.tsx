import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { SETTINGS_WAREHOUSE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { MapSearch } from "../map/map-search"

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
            location: [69.2401, 41.2995],
        },
    })

    const { handleSubmit, reset, control, watch, setValue } = form

    const coordinates = {
        lat: watch("location.1") ?? 41.2995,
        lng: watch("location.0") ?? 69.2401,
    }

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
        if (currentWarehouse?.uuid) {
            update(`${SETTINGS_WAREHOUSE}/${currentWarehouse.uuid}`, data)
        } else {
            create(SETTINGS_WAREHOUSE, data)
        }
    }

    const handleAddressFilled = useCallback(
        (address: string) => {
            setValue("address", address, {
                shouldDirty: true,
                shouldValidate: true,
            })
        },
        [setValue],
    )

    const handleCoordinatesChange = useCallback(
        (coords: [string, string]) => {
            const lat = parseFloat(coords[0]) || 41.2995
            const lng = parseFloat(coords[1]) || 69.2401

            setValue("location.0", lng, { shouldDirty: true })
            setValue("location.1", lat, { shouldDirty: true })
        },
        [setValue],
    )

    return (
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar-x p-1">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormInput
                        required
                        name="name"
                        label="Ombor nomi"
                        methods={form}
                    />

                    {/* Map Search Component */}
                    <div className="space-y-3">
                        <MapSearch
                            onCoordinatesChange={handleCoordinatesChange}
                            onAddressFilled={handleAddressFilled}
                            initialCoordinates={[
                                coordinates.lat.toString(),
                                coordinates.lng.toString(),
                            ]}
                            initialAddress={watch("address") || ""}
                        />
                    </div>

                    <div className="hidden">
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

                <div className="flex justify-end pt-4">
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
