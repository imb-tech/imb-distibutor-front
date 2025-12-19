import { ColumnDef } from "@tanstack/react-table"
import { SETTINGS_WAREHOUSE } from "@/constants/api-endpoints"
import { useMemo } from "react"
import { useGet } from "@/hooks/useGet"
import { Skeleton } from "@/components/ui/skeleton"

export const useColumnsWarehouseTable = () => {
        const { data: warehousesData, isLoading: isLoadingWarehouses } = useGet<{
            results: WarehouseType[]
        }>(SETTINGS_WAREHOUSE)
    
        const warehouseMap = useMemo(() => {
            if (!warehousesData?.results) return {}
    
            return warehousesData.results.reduce(
                (acc: Record<string, string>, warehouse: WarehouseType) => {
                    acc[warehouse.id] = warehouse.name
                    return acc
                },
                {},
            )
        }, [warehousesData])
    return useMemo<ColumnDef<WarehouseType>[]>(
        () => [
          {
                accessorKey: "name",
                header: "Ombor",
                enableSorting: true,
                cell: ({ row }) => {
                    const depotId = row.getValue("name")

                    if (isLoadingWarehouses) {
                        return <Skeleton className="h-4 w-20" />
                    }

                    if (!depotId && depotId !== 0) return "-"

                    const driverName = warehouseMap[depotId.toString()]
                    return driverName || depotId
                },
            },
            {
                accessorKey: "address",
                header: "Manzil",
                enableSorting: true,
            },
            {
                accessorKey: "location",
                header: "Kenglik (Latitude)",
                enableSorting: true,
                cell: ({ row }) => {
                    const location = row.original.location
                    return location && location[1] ?
                            location[1].toFixed(6)
                        :   "—"
                },
            },
            {
                accessorKey: "location",
                header: "Uzunlik (Longitude)",
                enableSorting: true,
                cell: ({ row }) => {
                    const location = row.original.location

                    return location && location[0] ?
                            location[0].toFixed(6)
                        :   "—"
                },
            },
        ],
        [warehouseMap,isLoadingWarehouses],
    )
}
