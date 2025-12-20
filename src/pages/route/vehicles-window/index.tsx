import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import {
    SETTINGS_CARS,
    SETTINGS_DRIVERS,
    SETTINGS_WAREHOUSE,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const FUEL_TYPE_OPTIONS = [
    { label: "Dizel", value: 2 },
    { label: "Propan", value: 6 },
    { label: "Benzin", value: 1 },
    { label: "Metan", value: 3 },
    { label: "Elektr", value: 4 },
    { label: "Gibrid", value: 5 },
]

const VEHICLE_TYPE_OPTIONS = [
    { label: "Yengil avtomobil", value: 1 },
    { label: "Yuk avtomobili", value: 2 },
    { label: "Avtobus", value: 3 },
    { label: "Treyler", value: 4 },
    { label: "Maxsus texnika", value: 7 },
    { label: "Refrijerator", value: 10 },
]

const EditModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("vehicle_edit")
    const { getData, clearKey } = useGlobalStore()
    const currentCar = getData<any>(SETTINGS_CARS)

    const { data: drivers } =
        useGet<ListResponse<DriversType>>(SETTINGS_DRIVERS)
    const { data: depots } =
        useGet<ListResponse<WarehouseType>>(SETTINGS_WAREHOUSE)

    const form = useForm<CarsType>({
        defaultValues: { ...currentCar, type: currentCar?.type || 1 },
    })

    const onSuccess = () => {
        toast.success("Avtomobil tahrirlandi!")
        form.reset()
        clearKey(SETTINGS_CARS)
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_CARS] })
    }

    const { mutate: update, isPending: updating } = usePatch({ onSuccess })

    const onSubmit = (data: CarsType) => {
        const carId = currentCar?.uuid

        update(`${SETTINGS_CARS}/${carId}`, data)
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-5"
            >
                <FormInput
                    required
                    name="number"
                    label="Avtomobil raqami"
                    methods={form}
                    maxLength={20}
                    placeholder="Misol: 01 A 123 AA"
                />

                <FormInput
                    required
                    name="license"
                    label="Guvohnoma raqami"
                    methods={form}
                    maxLength={50}
                    placeholder="Misol: ABC1234567"
                />

                <FormInput
                    required
                    name="serial_number"
                    label="Seriya raqami"
                    methods={form}
                    maxLength={100}
                    placeholder="Misol: VIN12345678901234"
                />

                <FormDatePicker
                    required
                    name="year"
                    label="Ishlab chiqarilgan yili"
                    control={form.control}
                    className={"w-full"}
                />

                <FormCombobox
                    required
                    label="Avtomobil turi"
                    name="type"
                    control={form.control}
                    options={VEHICLE_TYPE_OPTIONS}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Misol: Yengil avtomobil"
                />

                <FormCombobox
                    required
                    label="Yoqilg'i turi"
                    name="fuel_type"
                    control={form.control}
                    options={FUEL_TYPE_OPTIONS}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Misol: Benzin"
                />

                <FormInput
                    required
                    name="size"
                    label="Yuk sig'imi (kg)"
                    type="number"
                    methods={form}
                    placeholder="Misol: 1000"
                />

                <FormCombobox
                    name="depot"
                    label="Ombor (ixtiyoriy)"
                    options={depots?.results}
                    labelKey="name"
                    valueKey="id"
                    control={form.control}
                />

                <FormCombobox
                    required
                    name="driver"
                    label="Haydovchi"
                    options={drivers?.results}
                    labelKey="full_name"
                    valueKey="id"
                    control={form.control}
                    placeholder="Misol: Farrux"
                />

                <div className="md:col-span-2 flex justify-end ">
                    <Button
                        loading={updating}
                        type="submit"
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

export default EditModal
