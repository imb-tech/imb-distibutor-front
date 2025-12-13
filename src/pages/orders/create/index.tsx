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

// Define proper types
type ListResponse<T> = {
  results?: T[]
  count?: number
  // Add other pagination fields as needed
}

type ShipperType = {
  name: string
  id: number | string
}

type Delivery = {
  uuid?: string
  id?: number | string
  order_type: "regular" | "extra"
  shipper?: string | number
  // Add other Delivery fields as needed
}

type OrderRow = {
  // Add all fields that an order submission should have
  order_type: "regular" | "extra"
  shipper?: string | number
  // Add other OrderRow fields as needed
}

export const AddOrder = () => {
  const queryClient = useQueryClient()
  const { closeModal } = useModal("create")
  const { getData, clearKey } = useGlobalStore()
  const { data: shippersData } = useGet<ListResponse<ShipperType>>(SHIPPERS)

  const currentOrder = getData<Delivery>(ORDERS)

  const form = useForm<Delivery>({
    defaultValues: currentOrder || {
      order_type: "regular",
    },
  })

  const { handleSubmit, reset, watch, setValue } = form

  const orderType = watch("order_type") || "regular"

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
    console.log(values)

    const orderRow: OrderRow = {
      order_type: values.order_type,
      shipper: values.shipper,
    }

    if (currentOrder?.uuid) {
      updateMutate(`${ORDERS}/${currentOrder.uuid}`, orderRow)
    } else {
      postMutate(ORDERS, orderRow)
    }
  }

  // Remove handleOrderTypeChange if not used by children

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
        <div className="sm:col-span-2">
          <FormRadioGroup
            methods={form}
            required
            name="order_type"
            className={"grid grid-cols-2"}
            classNameItem={"border rounded-lg p-3"}
            itemClassName="w-full"
            options={[
              { id: "regular", name: "Doimiy" },
              { id: "extra", name: "Qo'shimcha" },
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

      {/* Dynamic body - pass only form prop */}
      {orderType === "regular" && <RegularOrders form={form} />}
      {orderType === "extra" && <ExtraOrders form={form} />}

      {/* Footer */}
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