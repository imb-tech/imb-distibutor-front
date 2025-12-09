import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useoColumns = () => {
    return useMemo<ColumnDef<ProductsType>[]>(
        () => [
            {
                accessorKey: "product_name",
                header: "Nomi",
                enableSorting: true,
            },
            {
                accessorKey: "note",
                header: "Eslatma",
                enableSorting: true,
            },
            {
                accessorKey: "measurement_type",
                header: "O'lchov turi",
                enableSorting: true,
            },
            {
                accessorKey: "quantity",
                header: "Midqor",
                enableSorting: true,
            },
            {
                accessorKey: "price_uz",
                header: "Narx uzs",
                enableSorting: true,
            },
            {
                accessorKey: "total_uz",
                header: "Jami",
                enableSorting: true,
            },
        ],
        [],
    )
}
