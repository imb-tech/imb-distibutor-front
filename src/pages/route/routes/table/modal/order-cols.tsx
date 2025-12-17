import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumnsOrderTable = () => {
    return useMemo<ColumnDef<OrderRoutesType>[]>(
        () => [
            {
                accessorKey: "client_address",
                header: "Manzil",
                enableSorting: true,
            },
            {
                accessorKey: "client_coordinates",
                header: "Manzil koordinatalari",
                enableSorting: true,
            },
        ],
        [],
    )
}
