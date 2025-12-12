import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { SETTINGS_LOGISTICIANS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { toast } from "sonner"

const AddLogisticansModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()

    const currentLogistician = getData<LogisticiansType>(SETTINGS_LOGISTICIANS)
    const form = useForm<LogisticiansType>({
        defaultValues: currentLogistician,
    })

    const { handleSubmit, reset } = form

    const onSuccess = () => {
        toast.success(
            `Logist muvaffaqiyatli ${currentLogistician?.id ? "tahrirlandi!" : "qo'shildi"} `,
        )

        reset()
        clearKey(SETTINGS_LOGISTICIANS)
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_LOGISTICIANS] })
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const isPending = isPendingCreate || isPendingUpdate

    const onSubmit = (values: LogisticiansType) => {
        if (currentLogistician?.id) {
            updateMutate(
                `${SETTINGS_LOGISTICIANS}/${currentLogistician.id}`,
                values,
            )
        } else {
            postMutate(SETTINGS_LOGISTICIANS, values)
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
                        name="full_name"
                        label="F.I.O"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="phone_number"
                        label="Telefon raqami"
                        methods={form}
                    />

                    <FormInput
                        required
                        name="working_warehouse"
                        label="Ombor"
                        methods={form}
                    />

                    <div className="flex items-center justify-end gap-2 md:col-span-2">
                        <Button
                            variant={"default2"}
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

export default AddLogisticansModal
