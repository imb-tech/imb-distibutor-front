import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumnsOrderTable = () => {
    return useMemo<ColumnDef<OrderRow['loads']>[]>(
        () => [
            {
                accessorKey: "client_address",
                header: "Mahsulot nomi",
                enableSorting: true,
            },
       
        ],
        [],
    )
}
