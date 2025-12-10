import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumnsLogisticiansTable = () => {
    return useMemo<ColumnDef<LogisticiansType>[]>(
        () => [
            {
                accessorKey: "full_name",
                header: "F.I.O",
                enableSorting: true,
            },
            {
                accessorKey: "phone_number",
                header: "Telefon raqami",
                enableSorting: true,
            },

            {
                accessorKey: "working_warehouse",
                header: "Ombor",
                enableSorting: true,
            },
        ],
        [],
    )
}
