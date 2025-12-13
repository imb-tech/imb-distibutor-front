import FormRadioGroup from "@/components/form/radio-group"
import { Button } from "@/components/ui/button"
import { ORDERS, SHIPPERS } from "@/constants/api-endpoints"
import { buildQueryKey, useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ExtraOrders } from "./extra-order"
import { RegularOrders } from "./regular-order"
import { FormCombobox } from "@/components/form/combobox"
import { Control } from "react-hook-form"


type ShipperType = {
    name: string
    id: number | string
}

type Delivery = {
    uuid?: string
    id?: number | string
    type: number | string
    shipper?: string | number
}

type OrderRow = {
    type: number | string
    shipper?: string | number
}

export const AddOrder = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()
    const { data: shippersData } = useGet<ListResponse<ShipperType>>(SHIPPERS)

    const currentOrder = getData<Delivery>(ORDERS)

    const form = useForm<Delivery>({
        defaultValues: { ...currentOrder, type: currentOrder?.type ? String(currentOrder?.type) : "1" }
    })

    const { handleSubmit, reset, watch } = form

    const orderType = watch("type")


    const onSuccess = () => {
        toast.success(
            `Order successfully ${currentOrder?.uuid ? "updated" : "created"}`,
        )
        reset()
        clearKey(ORDERS)
        closeModal()
        queryClient.refetchQueries({
            queryKey: buildQueryKey(ORDERS),
        })
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const isPending = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Delivery) => {

        const orderRow: OrderRow = {
            ...values,
            type: Number(values.type),
            shipper: values.shipper,
        }

        if (currentOrder?.uuid) {
            updateMutate(`${ORDERS}/${currentOrder.uuid}`, orderRow)
        } else {
            postMutate(ORDERS, orderRow)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
                <div className="sm:col-span-2">
                    <FormRadioGroup
                        methods={form}
                        required
                        name="type"
                        className={"grid grid-cols-2"}
                        classNameItem={"border rounded-lg p-3"}
                        itemClassName="w-full"
                        options={[
                            { id: 1, name: "Doimiy" },
                            { id: 2, name: "Qo'shimcha" },
                        ]}
                    />
                </div>

                <div className="sm:col-span-2">
                    <FormCombobox
                        required
                        name="shipper"
                        placeholder="Yetqazuvchi"
                        control={form.control as Control<any>}
                        options={shippersData?.results || []}
                    />
                </div>
            </div>

            {orderType == 2 && <ExtraOrders form={form} />}
            {orderType == 1 && <RegularOrders form={form} />}

            <div className="flex items-center justify-end pt-2">
                <Button
                    variant={"default2"}
                    type="submit"
                    className="px-6"
                    loading={isPending}
                >
                    Saqlash
                </Button>
            </div>
        </form>
    )
}