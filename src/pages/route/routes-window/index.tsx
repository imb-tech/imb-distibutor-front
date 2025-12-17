import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SETTINGS_VEHICLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import { toast } from "sonner"
import { vehicleCols } from "./cols"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Search } from "lucide-react"

export const AddRoute = () => {
  const { closeModal } = useModal("create")
  const { clearKey } = useGlobalStore()
  const { data: vehiclesData, isLoading } = useGet<ListResponse<VehicleRow>>(SETTINGS_VEHICLES)

  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const form = useForm()
  const columns = vehicleCols()

  const filteredData = useMemo(() => {
    if (!vehiclesData?.results) return []
    if (!searchTerm) return vehiclesData.results

    const lowerSearch = searchTerm.toLowerCase()
    return vehiclesData.results.filter((vehicle: VehicleRow) =>
      vehicle.number.toLowerCase().includes(lowerSearch) ||
      vehicle.license.toLowerCase().includes(lowerSearch) ||
      vehicle.serial_number.toLowerCase().includes(lowerSearch) ||
      String(vehicle.driver).includes(lowerSearch) ||
      String(vehicle.depot).includes(lowerSearch)
    )
  }, [vehiclesData?.results, searchTerm])

  const onSubmit = () => {
    toast.success("Marshrut muvaffaqiyatli yaratildi!")
    clearKey("ORDERS")
    closeModal()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Marshrutlash</h2>
        <p className="text-sm mb-4">Asosiy ma'lumotlar</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Input
            type="date"
            placeholder="Sana"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="time"
            placeholder="Marshrutlarning boshlanish vaqti"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-base font-medium mb-3 block">Avtomobillar</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Qidiruv"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="border rounded-md overflow-hidden bg-white">
          <div className="max-h-[400px] overflow-auto">
            <DataTable
              columns={columns}
              data={filteredData}
              loading={isLoading}
              form={form}
              enableRowSelection
              noResultsMessage="Avtomobillar topilmadi"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6">
        <Button
          variant="outline"
          className="border-orange-500 text-orange-600 hover:bg-orange-50 px-6"
          onClick={closeModal}
          type="button"
        >
          Bekor qilish
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-6"
          onClick={onSubmit}
        >
          Marshrutlash
        </Button>
      </div>
    </div>
  )
}
