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
    // add more if needed
]

const AddCarsModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()
    const currentCar = getData<CarsType>(SETTINGS_CARS)

    const form = useForm<CarsType>({
        defaultValues: {
            driver: currentCar?.driver,
            type: currentCar?.type ?? 1,
            number: currentCar?.number,
            license: currentCar?.license,
            serial_number: currentCar?.serial_number,
            year: currentCar?.year,
            fuel_type: currentCar?.fuel_type,
            size: currentCar?.size,
            depot: currentCar?.depot,
        },
    })

    const { handleSubmit, reset } = form

    const onSuccess = () => {
        toast.success(currentCar?.uuid ? "Avtomobil tahrirlandi!" : "Avtomobil qo'shildi!")
        reset()
        clearKey(SETTINGS_CARS)
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_CARS] })
    }

    const { mutate: create, isPending: creating } = usePost({ onSuccess })
    const { mutate: update, isPending: updating } = usePatch({ onSuccess })
    const isPending = creating || updating

    const onSubmit = (data: CarsType) => {
      
        if (currentCar?.uuid) {
            update(`${SETTINGS_CARS}/${currentCar.uuid}`,data)
        } else {
            create(SETTINGS_CARS,data)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-5">

                <FormInput
                    required
                    name="number"
                    label="Avtomobil raqami"
                    methods={form}
                    placeholder="87 LCC 386"
                    maxLength={20}
                />

                <FormInput
                    required
                    name="license"
                    label="Guvohnoma raqami"
                    methods={form}
                    placeholder="VL164456"
                    maxLength={50}
                />

                <FormInput
                    required
                    name="serial_number"
                    label="Seriya raqami"
                    methods={form}
                    placeholder="SN9760527"
                    maxLength={100}
                />

                <FormInput
                    required
                    name="year"
                    label="Ishlab chiqarilgan yili"
                    methods={form}
                    placeholder="2025-12-11"
                />

                <FormCombobox
                    required
                    label="Avtomobil turi"
                    name="type"
                    control={form.control}
                    options={VEHICLE_TYPE_OPTIONS}
                    placeholder="Turini tanlang"
                    labelKey="label"
                    valueKey="value"
                />

                <FormCombobox
                    required
                    label="Yoqilg'i turi"
                    name="fuel_type"
                    control={form.control}
                    options={FUEL_TYPE_OPTIONS}
                    placeholder="Yoqilg'i turini tanlang"
                    labelKey="label"
                    valueKey="value"
                />

                <FormInput
                    required
                    name="size"
                    label="Yuk sig'imi (kg)"
                    type="number"
                    methods={form}
                    placeholder="5000"
                />

                <FormInput
                    name="depot"
                    label="Ombor ID (ixtiyoriy)"
                    type="number"
                    methods={form}
                    placeholder="101 (bo'sh qoldirsangiz null bo'ladi)"
                />

                <FormInput
                    required
                    name="driver"
                    label="Haydovchi ID"
                    type="number"
                    methods={form}
                    placeholder="62"
                />

                <div className="md:col-span-2 flex justify-end mt-6">
                    <Button type="submit" className="min-w-40">
                        Saqlash
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddCarsModal