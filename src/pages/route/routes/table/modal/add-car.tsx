import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import {
    ROUTE_VEHICLES,
    ROUTE_VEHICLES_DETAIL,
    ROUTE_VEHICLES_UPDATE,
    SETTINGS_CARS,
    SETTINGS_DRIVERS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import ModalOrderTable from "./modal-table"

const AddVehiclesModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()
    const currentVehicle = getData<RouteVehiclesAdd>(ROUTE_VEHICLES)
    const { data: routes } = useGet(`${ROUTE_VEHICLES_DETAIL}/${currentVehicle?.uuid}`, {
        enabled: !!currentVehicle?.uuid,
    })
    const { data: drivers } = useGet(SETTINGS_DRIVERS)
    const { data: vehicles } = useGet(SETTINGS_CARS)

    const driverOptions =
        drivers?.results?.map((driver: { id: number; full_name: string }) => ({
            value: driver?.id,
            label: driver.full_name,
        })) || []

    const vehiclesOptions =
        vehicles?.results?.map((vehicle: { id: number; number: any }) => ({
            value: vehicle?.id,
            label: vehicle.number,
        })) || []

    const form = useForm<RouteVehiclesAdd>({
        defaultValues: {
            ...currentVehicle,
        },
    })

    const { handleSubmit, reset } = form

    const onSuccess = () => {
        toast.success(
            currentVehicle?.uuid ?
                "Avtomobil tahrirlandi!"
            :   "Avtomobil qo'shildi!",
        )
        reset()
        clearKey(ROUTE_VEHICLES)
        closeModal()
        queryClient.refetchQueries({ queryKey: [ROUTE_VEHICLES] })
    }

    const { mutate: create, isPending: creating } = usePost({ onSuccess })
    const { mutate: update, isPending: updating } = usePatch({ onSuccess })
    const isPending = creating || updating

    const onSubmit = (data: RouteVehiclesAdd) => {

        if (currentVehicle?.uuid) {
            update(`${ROUTE_VEHICLES_UPDATE}/${currentVehicle.uuid}`, data)
        } else {
            create(ROUTE_VEHICLES, data)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-5"
            >
                <FormInput
                    required
                    name="name"
                    label="Yo'l"
                    methods={form}
                    maxLength={20}
                    placeholder="Misol: 01 A 123 AA"
                />
                <FormCombobox
                    required
                    name="driver"
                    control={form.control}
                    label="Haydovchi"
                    options={driverOptions}
                    labelKey="label"
                    valueKey="value"
                />
                <FormCombobox
                    required
                    name="vehicle"
                    control={form.control}
                    label="Avtomobil"
                    options={vehiclesOptions}
                    labelKey="label"
                    valueKey="value"
                />

                <FormDatePicker
                    required
                    name="start_date"
                    label="Boshlanish sanasi"
                    control={form.control}
                    className={"w-full"}
                />
            </form>
            <div className="mt-6 ">
                <ModalOrderTable routes={routes?.order_routes} />
            </div>

            <div className="md:col-span-2 flex justify-end ">
                <Button
                    loading={isPending}
                    type="submit"
                    className="min-w-40"
                    variant={"default2"}
                >
                    Saqlash
                </Button>
            </div>
        </div>
    )
}

export default AddVehiclesModal
