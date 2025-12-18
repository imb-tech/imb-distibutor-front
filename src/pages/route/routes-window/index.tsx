import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { Label } from "@/components/ui/label"
import {
    ROUTE_VEHICLES,
    ROUTE_VEHICLES_CREATE,
    SELECTED_ORDER_IDS,
    SELECTED_VEHICLE_IDS,
    SETTINGS_VEHICLES,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { Clock, Search } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { vehicleCols } from "./cols"

interface RoutePayload {
    date: string
    start_time: string
    vehicle_ids: string[]
    status?: string
    name?: string
    order_ids?: string[]
}

export const AddRoute = () => {
    const { closeModal, openModal: routeModal } = useModal("route_create")
    const { openModal: vehicleModal } = useModal("vehicle_edit")
    const { clearKey, getData, setData } = useGlobalStore()
    const { data: vehiclesData, isLoading } =
        useGet<ListResponse<VehicleRow>>(SETTINGS_VEHICLES)

    const [searchQuery, setSearchQuery] = useState<string>("")

    const selectedVehicleIds = getData<string[]>(SELECTED_VEHICLE_IDS) || []

    const selectedOrderIds = getData<string[]>(SELECTED_ORDER_IDS) || []

    const form = useForm<Omit<RoutePayload, "vehicle_ids" | "order_ids">>({
        defaultValues: {
            date: "",
            start_time: "",
            status: "active",
        },
    })

    const onSuccess = () => {
        toast.success("Marshrut muvaffaqiyatli yaratildi!")
        clearKey(ROUTE_VEHICLES)
        clearKey(SELECTED_VEHICLE_IDS)
        clearKey(SELECTED_ORDER_IDS)
        closeModal()
        form.reset()
        setSearchQuery("")
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
        onError: (error) => {
            toast.error("Marshrut yaratishda xatolik yuz berdi")
            console.error("Route creation error:", error)
        },
    })

    const handleVehicleEdit = (item: VehicleRow) => {
        setData(SETTINGS_VEHICLES, item)
        vehicleModal()
    }

    const onSubmit = (
        data: Omit<RoutePayload, "vehicle_ids" | "order_ids">,
    ) => {
        // Validation
        if (!data.date || !data.start_time) {
            toast.error("Iltimos, sana va boshlanish vaqtini kiriting")
            return
        }

        if (selectedVehicleIds.length === 0) {
            toast.error("Iltimos, kamida bitta avtomobil tanlang")
            return
        }

        if (selectedOrderIds.length === 0) {
            toast.error("Iltimos, kamida bitta buyurtma tanlang")
            return
        }

        const payload: RoutePayload = {
            ...data,
            vehicle_ids: selectedVehicleIds,
            order_ids: selectedOrderIds,
            name: `Route ${data.date} ${data.start_time}`,
        }

        postMutate(ROUTE_VEHICLES_CREATE, payload)
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full overflow-hidden p-1"
        >
            {/* Form inputs for backend submission */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <FormDatePicker
                        control={form.control}
                        placeholder="Sana"
                        name="date"
                        className="w-full"
                    />
                </div>
                <div>
                    <FormInput
                        prefixIcon={<Clock className="h-4 w-4" />}
                        methods={form}
                        name="start_time"
                        type="time"
                        placeholder="Marshrutlarning boshlanish vaqti"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Search section - not part of form submission */}
            <div className="mb-4">
                <Label className="text-base font-medium mb-3 block">
                    Avtomobillar
                </Label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Qidirish"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Data table with filtered results */}
            <div className="mb-6 flex-1 min-h-0">
                <div className="border rounded-md overflow-hidden bg-white h-full">
                    <div className="h-[300px] overflow-auto">
                        <DataTable
                            onEdit={(row) => handleVehicleEdit(row.original)}
                            columns={vehicleCols()}
                            data={vehiclesData?.results}
                            loading={isLoading}
                            selecteds_row
                            onSelectedRowsChange={(rows: VehicleRow[]) => {
                                const ids = rows.map((row) => row.id)
                                setData(SELECTED_VEHICLE_IDS, ids)
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t">
                <Button
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50 px-6"
                    onClick={() => {
                        closeModal()
                        form.reset()
                        clearKey(SELECTED_VEHICLE_IDS)
                        setSearchQuery("")
                    }}
                    type="button"
                    disabled={isPendingCreate}
                >
                    Bekor qilish
                </Button>
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                    type="submit"
                    loading={isPendingCreate}
                    disabled={
                        isPendingCreate ||
                        selectedVehicleIds.length === 0 ||
                        selectedOrderIds.length === 0
                    }
                >
                    Marshrutlash
                </Button>
            </div>
        </form>
    )
}
