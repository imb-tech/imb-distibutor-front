import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { SETTINGS_DRIVERS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { toast } from "sonner"

const AddDriverModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()

    const currentDriver = getData<DriversType>(SETTINGS_DRIVERS)
    const form = useForm<DriversType>({
        defaultValues: currentDriver,
    })

    const { handleSubmit, reset } = form

    const onSuccess = () => {
         toast.success(
            `Avtomobil muvaffaqiyatli ${currentDriver?.id ? "tahrirlandi!" : "qo'shildi"} `,
        )

        reset()
        clearKey(SETTINGS_DRIVERS)
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_DRIVERS] })
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const isPending = isPendingCreate || isPendingUpdate

    const onSubmit = (values: DriversType) => {
        if (currentDriver?.id) {
            updateMutate(`${SETTINGS_DRIVERS}/${currentDriver.id}`, values)
        } else {
            postMutate(SETTINGS_DRIVERS, values)
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
                        name="passport_series"
                        label="Pasport seriya va raqami"
                        methods={form}
                    />
                    <FormNumberInput
                        registerOptions={{
                            max: {
                                value: 14,
                                message: "14 xonali bo'lishi kerak",
                            },
                            min: {
                                value: 14,
                                message: "14 xonali bo'lishi kerak",
                            },
                        }}
                        thousandSeparator={""}
                        required
                        name="jshshir"
                        label="JShShIR"
                        control={form.control}
                    />
                    <FormInput
                        required
                        name="driver_license"
                        label="Haydovchilik quvohnomasi"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="company_id"
                        label="Kompanya ID"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="login"
                        label="Login"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="parol"
                        label="Parol"
                        methods={form}
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

export default AddDriverModal
