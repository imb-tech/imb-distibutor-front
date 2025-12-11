import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { SETTINGS_WAREHOUSE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

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
        defaultValues: {
            name: currentWarehouse?.name ?? "",
            address: currentWarehouse?.address ?? "",
            location: currentWarehouse?.location,
        },
    })

    const { handleSubmit, reset, control } = form

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

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-6"
            >
                <FormInput
                    required
                    name="name"
                    label="Ombor nomi"
                    methods={form}
                />

                <FormInput
                    required
                    name="address"
                    label="Manzil"
                    methods={form}
                />
 
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

                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                    <Button
                        type="submit"
                        loading={isPending}
                        className="min-w-40"
                    >
                        Saqlash
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddWarehouse