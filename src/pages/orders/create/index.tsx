// AddOrder.tsx
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { usePatch } from "@/hooks/usePatch"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import { buildQueryKey } from "@/hooks/useGet"
import { OrderMainSection } from "./regular-order"
import { OrderProductsSection } from "./extra-order"
import { ORDERS } from "@/constants/api-endpoints"



export const AddOrder = () => {
  const queryClient = useQueryClient()
  const { closeModal } = useModal(ORDERS)
  const { getData, clearKey } = useGlobalStore()

  const currentOrder = getData<OrderRow>(ORDERS)

  const form = useForm<OrderRow>({
    defaultValues: currentOrder || {
      // @ts-ignore – agar type’da bo‘lmasa
      order_type: "doimiy",
    },
  })

  const { handleSubmit, reset, watch, setValue } = form

  const orderType = (watch("order_type" as any) as string) || "doimiy"

  const onSuccess = () => {
    toast.success(
      `Buyurtma muvaffaqiyatli ${
        (currentOrder as any)?.id ? "yangilandi" : "yaratildi"
      }`
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
    console.log(values);
    
    if ((currentOrder as any)?.id) {
      updateMutate(`${ORDERS}/${(currentOrder as any).id}`, values)
    } else {
      postMutate(ORDERS, values)
    }
  }

  const handleOrderTypeChange = (value: "doimiy" | "qoshimcha") => {
    // @ts-ignore
    setValue("order_type", value, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

      <OrderMainSection
        form={form}
        orderType={orderType as "doimiy" | "qoshimcha"}
        onOrderTypeChange={handleOrderTypeChange}
      />
      <OrderProductsSection />
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="px-6 rounded-lg"
          onClick={closeModal}
        >
          Bekor qilish
        </Button>
        <Button
          type="submit"
          className="px-6 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
          loading={isPending}
        >
          {(currentOrder as any)?.id ? "Yangilash" : "Qo‘shish"}
        </Button>
      </div>
    </form>
  )
}
