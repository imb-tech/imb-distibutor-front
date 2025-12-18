import { FormCombobox } from "@/components/form/combobox"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface WarehouseType {
    id: string
    name: string
}

interface FormData {
    uuid: string
    driver: string
    vehicleNumber: string
    expeditor: string
    warehouse: string
}

const SETTINGS_WAREHOUSES = "/settings/warehouses"
const SETTINGS_ROUTES = "/settings/routes"
const SETTINGS_ROUTES_UPDATE = "/settings/routes"

const EditModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("vehicle_edit")
    const { getData, clearKey } = useGlobalStore()

    const { data: warehousesData } =
        useGet<ListResponse<WarehouseType>>(SETTINGS_WAREHOUSES)

    const currentRoute = getData<FormData>("current_route")

    const form = useForm<FormData>({
        defaultValues: currentRoute || {
            driver: "",
            vehicleNumber: "",
            expeditor: "",
            warehouse: "",
        },
    })

    const { handleSubmit, reset } = form

    const onSuccess = () => {
        toast.success(
            `Ma'lumotlar muvaffaqiyatli ${currentRoute ? "tahrirlandi!" : "saqlandi!"}`,
        )
        reset()
        clearKey("current_route")
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_ROUTES] })
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const isPending = isPendingCreate || isPendingUpdate

    const onSubmit = (values: FormData) => {
        if (currentRoute?.uuid) {
            updateMutate(
                `${SETTINGS_ROUTES_UPDATE}/${currentRoute.uuid}`,
                values,
            )
        } else {
            postMutate(SETTINGS_ROUTES, values)
        }
    }

    const handleCancel = () => {
        toast.info("Bekor qilindi")
        reset()
        clearKey("current_route")
        closeModal()
    }

    return (
        <div className="w-full ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Driver Input */}
                <FormInput
                    name="driver"
                    label="Haydovchi"
                    methods={form}
                    placeholder="Haydovchi ismini kiriting"
                    required
                />

                {/* Vehicle Number Input */}
                <FormInput
                    name="vehicleNumber"
                    label="Automobil ragami"
                    methods={form}
                    placeholder="Avtomobil raqamini kiriting"
                    required
                />

                {/* Expeditor Input */}
                <FormInput
                    name="expeditor"
                    label="Ekspeditor"
                    methods={form}
                    placeholder="Ekspeditor ismini kiriting"
                    required
                />

                {/* Warehouse Selection */}
                <FormCombobox
                    name="warehouse"
                    label="Ombor"
                    options={warehousesData?.results || []}
                    control={form.control}
                    valueKey="id"
                    labelKey="name"
                    placeholder="Omborni tanlang"
                    required
                />

                {/* Buttons */}
                <div className="flex items-center justify-end ">
                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-6"
                        type="submit"
                        loading={isPending}
                    >
                        Saqlash
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditModal
