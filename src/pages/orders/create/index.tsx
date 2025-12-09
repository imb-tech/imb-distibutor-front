import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { ORDERS } from "@/constants/api-endpoints"
import { buildQueryKey } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ExtraOrders } from "./extra-order"
import { RegularOrders } from "./regular-order"
import FormRadioGroup from "@/components/form/radio-group"

export const AddOrder = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(ORDERS)
    const { getData, clearKey } = useGlobalStore()

    const currentOrder = getData<OrderRow>(ORDERS)

    const form = useForm<OrderRow>({
        defaultValues: currentOrder || {
            // keep english default
            order_type: "regular",
            supplier: "",
        },
    })

    const { handleSubmit, reset, watch, setValue } = form

    const orderType = watch("order_type") || "regular"

    const onSuccess = () => {
        toast.success(
            `Order successfully ${(currentOrder as any)?.id ? "updated" : "created"}`,
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

    const onSubmit = (values: OrderRow) => {
        console.log(values)

        if ((currentOrder as any)?.id) {
            updateMutate(`${ORDERS}/${(currentOrder as any).id}`, values)
        } else {
            postMutate(ORDERS, values)
        }
    }

    const handleOrderTypeChange = (value: "regular" | "extra") => {
        // @ts-ignore
        setValue("order_type", value, {
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
             <div className="sm:col-span-2">
                   <FormRadioGroup
                    methods={form}
                    required
                    name="order_type"
                    className={"grid grid-cols-2  "}
                    classNameItem={"border rounded-lg p-3"}
                    itemClassName="w-full"
                    options={[
                         { id: "regular", name: "Doimiy" },
                        { id: "extra", name: "Qo'shimcha" }
                    ]}
                
                />
             </div>

                <div className="sm:col-span-2">
                    <FormInput
                        required
                        name="supplier"
                        placeholder="Yetqazuvchi"
                        methods={form}
                    />
                </div>
            </div>

            {/* Dynamic body */}
            {orderType === "regular" && (
                <RegularOrders
                    form={form}
                    orderType={orderType}
                    onOrderTypeChange={handleOrderTypeChange}
                />
            )}

            {orderType === "extra" && (
                <ExtraOrders
                    form={form}
                    orderType={orderType}
                    onOrderTypeChange={handleOrderTypeChange}
                />
            )}

            {/* Footer */}
            <div className="flex items-center justify-end  pt-2">
                <Button
                    type="submit"
                    className="px-6 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                    loading={isPending}
                >
                    Save
                </Button>
            </div>
        </form>
    )
}
