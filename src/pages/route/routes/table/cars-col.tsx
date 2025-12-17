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
                accessorKey: "driver_name",
                header: "Haydovchi F.I.O",
                enableSorting: true,
            },
            {
                accessorKey: "vehicle_name",
                header: "Avtomobil rusumi",
                enableSorting: true,
            },
            {
                accessorKey: "vehicle_number",
                header: "Avtomobil raqami",
                enableSorting: true,
            },
            {
                accessorKey: "name",
                header: "Ekspeditorlar",
                enableSorting: true,
            },
            {
                accessorKey: "progress_order_count",
                header: "Jarayondagi buyurtmalar",
                enableSorting: true,
            },
            {
                accessorKey: "finished_order_count",
                header: "Yakunlangan buyurtmalar",
                enableSorting: true,
            },
            {
                accessorKey: "order_weigth",
                header: "Buyurtma og'irligi",
                enableSorting: true,
            } 
        ],
        [],
    )
}
