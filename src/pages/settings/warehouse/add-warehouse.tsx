import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { SETTINGS_WAREHOUSE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export type WarehouseType = {
  uuid?: string
  name: string
  address: string
  location: [number, number] 
}

const AddWarehouse = () => {
  const queryClient = useQueryClient()
  const { closeModal } = useModal('create')
  const { getData, clearKey } = useGlobalStore()

  const currentWarehouse = getData<WarehouseType>(SETTINGS_WAREHOUSE)

  const form = useForm<WarehouseType>({
    defaultValues: {
      name: currentWarehouse?.name ?? "",
      address: currentWarehouse?.address ?? "",
      location: currentWarehouse?.location ?? [69.2401, 41.3111] as [number, number], // Tashkent default
    },
  })

  const { handleSubmit, reset, setValue, watch } = form

  const location = watch("location")

  const onSuccess = () => {
    toast.success(
      currentWarehouse?.uuid
        ? "Ombor muvaffaqiyatli tahrirlandi!"
        : "Ombor muvaffaqiyatli qo'shildi!"
    )
    reset()
    clearKey(SETTINGS_WAREHOUSE)
    closeModal()
    queryClient.refetchQueries({ queryKey: [SETTINGS_WAREHOUSE] })
  }

  const { mutate: create, isPending: creating } = usePost({ onSuccess })
  const { mutate: update, isPending: updating } = usePatch({ onSuccess })
  const isPending = creating || updating

  const onSubmit = (data: WarehouseType) => {
    if (currentWarehouse?.uuid) {
      update(`${SETTINGS_WAREHOUSE}/${currentWarehouse.uuid}`, data)
    } else {
      create(SETTINGS_WAREHOUSE, data)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">

        <FormInput
          required
          name="name"
          label="Ombor nomi"
          methods={form}
          placeholder="Masalan: Main Depot Tashkent"
        />

        <FormInput
          required
          name="address"
          label="Manzil"
          methods={form}
          placeholder="Yunusabad 5-17"
        />

        <FormInput
          required
          name="location.0"
          label="Uzunlik (Longitude)"
          methods={form}
          type="number"
          step="0.000001"
          placeholder="69.240100"
          onChange={(e) => {
            const val = parseFloat(e.target.value) || 0
            setValue("location", [val, location?.[1] || 41.3111])
          }}
        />

        <FormInput
          required
          name="location.1"
          label="Kenglik (Latitude)"
          methods={form}
          type="number"
          step="0.000001"
          placeholder="41.311100"
          onChange={(e) => {
            const val = parseFloat(e.target.value) || 0
            setValue("location", [location?.[0] || 69.2401, val])
          }}
        />

        {/* Optional: Show Google Maps preview link */}
        <div className="md:col-span-2">
          <div className="text-sm text-gray-600 mb-2">Xaritada ko'rish:</div>
          <a
            href={`https://www.google.com/maps?q=${location?.[1]},${location?.[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {location?.[1] && location?.[0]
              ? `Ochish: ${location[1].toFixed(6)}, ${location[0].toFixed(6)}`
              : "Koordinatalar kiritilmagan"}
          </a>
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <Button type="submit" loading={isPending} className="min-w-40">
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddWarehouse