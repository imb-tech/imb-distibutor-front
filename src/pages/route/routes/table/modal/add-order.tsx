import { FormCheckbox } from "@/components/form/checkbox" // Your existing component
import { Button } from "@/components/ui/button"
import {
    ROUTE_ASSIGNE_ORDERS,
    ROUTE_ORDER_LSIT,
    ROUTE_VEHICLES_DETAIL,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type FormData = {
    [key: `order-${number}`]: boolean
}

const AddOrderList = ({ uuid }: AddOrderListType) => {
    const queryClient = useQueryClient()
    const { clearKey } = useGlobalStore()

    const form = useForm<FormData>({
        defaultValues: {},
    })

    const { handleSubmit, reset, control } = form

    const { data } = useGet(ROUTE_ORDER_LSIT)
    const { closeModal } = useModal("order-list")

    const onSuccess = () => {
        toast.success("Yangi order qo'shildi")
        reset()
        clearKey(ROUTE_ASSIGNE_ORDERS)
        closeModal()
        queryClient.refetchQueries({ queryKey: [ROUTE_ASSIGNE_ORDERS] })
        queryClient.invalidateQueries({
            queryKey: [`${ROUTE_VEHICLES_DETAIL}/${uuid}`],
        })
    }

    const { mutate: create, isPending: creating } = usePost({ onSuccess })

    const orderList: Order[] = data?.results || []

    const onSubmit = (formData: FormData) => {
        const selectedOrderIds: number[] = []
        orderList.forEach((order) => {
            const fieldName = `order-${order.id}` as const
            if (formData[fieldName]) {
                selectedOrderIds.push(order.id)
            }
        })

        const payload = {
            orders: selectedOrderIds,
        }

        create(`${ROUTE_ASSIGNE_ORDERS}/${uuid}`, payload)
    }

    

    return (
        <div className="w-full max-w-4xl mx-auto p-1">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-2">
                        {orderList.map((order) => (
                            <div
                                key={order.id}
                                className="flex items-center gap-2 p-3 bg-secondary rounded-[10px] "
                            >
                                <FormCheckbox
                                    name={`order-${order.id}`}
                                    label={`${order?.code ? `# ${order.code}` : ""} ${order.client_address}`}
                                    control={control}
                                    wrapperClass="flex-1"
                                    hideError
                                />
                            </div>
                        ))}

                        {orderList.length === 0 && (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                Hech qanday buyurtma topilmadi
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-end justify-end">
                    <Button
                        variant={"default2"}
                        loading={creating}
                        type="submit"
                        className="min-w-32"
                    >
                        Tanlash
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddOrderList
