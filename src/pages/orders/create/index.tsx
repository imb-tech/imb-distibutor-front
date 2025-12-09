
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { usePatch } from "@/hooks/usePatch"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import { buildQueryKey } from "@/hooks/useGet"
import { ORDERS } from "@/constants/api-endpoints"
import { RegularOrders } from "./regular-order"
import { ExtraOrders } from "./extra-order"
import FormInput from "@/components/form/input"

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
      `Order successfully ${(currentOrder as any)?.id ? "updated" : "created"}`
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
    setValue("order_type", value, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-xl font-semibold">Add Order</h2>
      </div>


      <div className="flex items-center gap-3 w-full justify-between">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={() => handleOrderTypeChange("regular")}
            className={`px-4 py-2 rounded-lg border hover:bg-secondary ${orderType === "regular"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600"
              }`}
          >
            Regular
          </Button>

          <Button
            type="button"
            onClick={() => handleOrderTypeChange("extra")}
            className={`px-4 py-2 rounded-lg border hover:bg-secondary ${orderType === "extra"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600"
              }`}
          >
            Extra
          </Button>
        </div>


        <div>
          <FormInput
            required
            name="supplier"
            placeholder="Yetqazuvchi"
            methods={form}
            className="min-w-[320px]"
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
      <div className="flex items-center justify-end gap-3 pt-2">
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
