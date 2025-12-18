import { FormMultiCombobox } from "@/components/form/multi-combobox"
import { Button } from "@/components/ui/button"
import {
    ROUTE_ASSIGNE_ORDERS,
    ROUTE_ORDER_LSIT,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type FormData = {
    "order-list": Array<{ id: number; [key: string]: any }> | number[]
}

type Order = {
    id: number
    client_address: string
}

const AddOrderList = () => {
    const queryClient = useQueryClient()
    const { getData, clearKey } = useGlobalStore()

    const form = useForm<FormData>({
        defaultValues: {
            "order-list": [],
        },
    })
    const { handleSubmit, reset, control, watch } = form

    const { data } = useGet(ROUTE_ORDER_LSIT)
    const { closeModal } = useModal("order-list")
    const search = useSearch({ from: "/_main/route/" })
    const { route_id } = search

    const onSuccess = () => {
        toast.success("Yangi order qo'shildi")
        reset()
        clearKey(ROUTE_ASSIGNE_ORDERS)
        closeModal()
        queryClient.refetchQueries({ queryKey: [ROUTE_ASSIGNE_ORDERS] })
    }

    const { mutate: create, isPending: creating } = usePost({ onSuccess })

    const orderList: Order[] = data?.results || []

    const onSubmit = (formData: FormData) => {
        const selectedOrders = formData["order-list"]
        const orderIds = selectedOrders.map((item: any) =>
            typeof item === "object" && item.id ? item.id : item,
        )

        const payload = {
            orders: orderIds,
        }

        create(`${ROUTE_ASSIGNE_ORDERS}/${route_id}`, payload)
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-1">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormMultiCombobox
                    name="order-list"
                    options={orderList}
                    label="Buyurtmalar"
                    control={control}
                    labelKey="client_address"
                    valueKey="id"
                    placeholder="Buyurtmani tanlang"
                />

                <div className="flex items-end justify-end mt-5">
                    <Button
                        variant={"default2"}
                        loading={creating}
                        type="submit"
                    >
                        Tanlash
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddOrderList
