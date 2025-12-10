import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumnsCarsOrderTable = () => {
    return useMemo<ColumnDef<CarsTypeInOrders>[]>(
        () => [
            {
                accessorKey: "no",
                header: "№",
                cell: ({ row }) => row.index + 1,
            },

            {
                accessorKey: "load_capacity",
                header: "Yuk sig'imi",
                enableSorting: true,
            },
            {
                accessorKey: "path",
                header: "Harakatlanish",
                enableSorting: true,
            },
            {
                accessorKey: "driver",
                header: "Haydovchi",
                enableSorting: true,
            },
            {
                accessorKey: "forwarder",
                header: "Ekspeditorlar",
                enableSorting: true,
            },
            {
                accessorKey: "car_model",
                header: "Avtomobil rusimi",
                enableSorting: true,
            },
            {
                accessorKey: "car_number",
                header: "Avtomobil raqami",
                enableSorting: true,
            },
        ],
        [],
    )
}
