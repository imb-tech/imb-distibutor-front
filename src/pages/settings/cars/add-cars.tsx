import { FormCombobox } from "@/components/form/combobox"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { SETTINGS_CARS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
    fuelTypes,
    licenseTypes,
    loadCapacities,
    path,
    warehouses,
} from "./options"

const AddCarsModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()

    const currentCar = getData<CarsType>(SETTINGS_CARS)
    const form = useForm<CarsType>({
        defaultValues: currentCar,
    })

    const { handleSubmit, reset } = form

    const onSuccess = () => {
        if (currentCar?.id) {
            toast.success("Avtomobil muvaffaqiyatli tahrirlandi!")
        } else {
            toast.success("Avtomobil muvaffaqiyatli qo'shildi")
        }

        reset()
        clearKey(SETTINGS_CARS)
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_CARS] })
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const isPending = isPendingCreate || isPendingUpdate

    const onSubmit = (values: CarsType) => {
        if (currentCar?.id) {
            updateMutate(`${SETTINGS_CARS}/${currentCar.id}`, values)
        } else {
            postMutate(SETTINGS_CARS, values)
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
                        name="forwarder"
                        label="Ekspeditor"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="driver"
                        label="Haydovchi"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="car_model"
                        label="Avtomobil rusumi"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="car_number"
                        label="Avtomobil raqami"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="series_number"
                        label="Seriya raqami"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="year"
                        label="Ishlab chiqarilgan yili"
                        methods={form}
                    />
                    <FormCombobox
                        label="Yoqilg'i turi"
                        options={fuelTypes}
                        name="fuel_type"
                        control={form.control}
                    />
                    <FormCombobox
                        label="Yuk sig'imi"
                        options={loadCapacities}
                        name="load_capacity"
                        control={form.control}
                    />
                    <FormCombobox
                        label="Ombor"
                        options={warehouses}
                        name="warehouse"
                        control={form.control}
                    />
                    <FormCombobox
                        label="Harakatlanish hududi"
                        options={path}
                        name="path"
                        control={form.control}
                    />
                    <FormCombobox
                        label="Guvohmoma turi"
                        options={licenseTypes}
                        name="license_type"
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

export default AddCarsModal
