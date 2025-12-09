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

const AddWarehouse = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()

    const currentCar = getData<WarehouseType>(SETTINGS_WAREHOUSE)
    const form = useForm<WarehouseType>({
        defaultValues: currentCar,
    })

    const { handleSubmit, reset } = form

    const onSuccess = () => {
        toast.success(
            `Ombor muvaffaqiyatli ${currentCar?.id ? "tahrirlandi!" : "qo'shildi"} `,
        )
        reset()
        clearKey(SETTINGS_WAREHOUSE)
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_WAREHOUSE] })
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const isPending = isPendingCreate || isPendingUpdate

    const onSubmit = (values: WarehouseType) => {
        if (currentCar?.id) {
            updateMutate(`${SETTINGS_WAREHOUSE}/${currentCar.id}`, values)
        } else {
            postMutate(SETTINGS_WAREHOUSE, values)
        }
    }

    return (
        <>
            <div className="w-full max-w-4xl mx-auto p-1">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid md:grid-cols-2 gap-4"
                >
                    <FormInput
                        required
                        name="location"
                        label="Manzil"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="location"
                        label="Lokatsiya"
                        methods={form}
                    />
                    <FormNumberInput
                        required
                        name="longtitude"
                        label="Uzunlik"
                        control={form.control}
                    />
                    <FormNumberInput
                        required
                        name="latitude"
                        label="Manzil hududi"
                        control={form.control}
                    />
                    <FormInput
                        required
                        name="map_location"
                        label="Manzil hududi"
                        methods={form}
                    />
                    <FormNumberInput
                        required
                        name="latitude"
                        label="Kenglik"
                        control={form.control}
                    />

                    <div className="flex items-center justify-end gap-2 md:col-span-2">
                        <Button
                            className="min-w-36 w-full md:w-max"
                            type="submit"
                            loading={isPending}
                        >
                            {"Saqlash"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddWarehouse
