import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

 
export const useColumnsWarehouseTable = () => {
    return useMemo<ColumnDef<WarehouseType>[]>(
        () => [
            {
                accessorKey: "address",
                header: "Manzil",
                enableSorting: true,
            },
            {
                accessorKey: "latitude",
                header: "Kenglik",
                enableSorting: true,
            },
            {
                accessorKey: "longtitude",
                header: "Uzunlik",
                enableSorting: true,
            },
            {
                accessorKey: "map_location",
                header: "Xarita hududi",
                enableSorting: true,
            },
            {
                accessorKey: "location",
                header: "Lokatsiya",
                enableSorting: true,
            },
          
        ],
        [],
    )
}
