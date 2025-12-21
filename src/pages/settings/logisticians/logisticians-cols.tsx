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
                accessorKey: "phone",
                header: "Telefon raqami",
                enableSorting: true,
            },
            {
                accessorKey: "depot_name",
                header: "Ombor",
                enableSorting: true,
            },
            {
                accessorKey: "username",
                header: "Login",
                enableSorting: true,
            },
        ],
        [],
    )
}
