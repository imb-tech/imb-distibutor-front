import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumnsCustomersTable = () => {
    return useMemo<ColumnDef<CustomersType>[]>(
        () => [
            {
                accessorKey: "full_name",
                header: "F.I.O",
                enableSorting: true,
            },
            {
                accessorKey: "organization",
                header: "Tashkilot",
                enableSorting: true,
            },
            {
                accessorKey: "location",
                header: "Manzil",
                enableSorting: true,
            },
            {
                accessorKey: "map_location",
                header: "Manzil hududi",
                enableSorting: true,
            },
            {
                accessorKey: "koordination",
                header: "Kordinatsiya",
                enableSorting: true,
            },
            {
                accessorKey: "working_days",
                header: "Kordinatsiya",
                enableSorting: true,
            },
            {
                accessorKey: "phone_number",
                header: "Telefon raqami",
                enableSorting: true,
            },

            {
                accessorKey: "email",
                header: "Elektron pochta",
                enableSorting: true,
            },
        ],
        [],
    )
}


