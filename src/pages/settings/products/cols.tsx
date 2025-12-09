import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useoColumns = () => {
    return useMemo<ColumnDef<ProductsType>[]>(
        () => [
            {
                accessorKey: "product_name",
                header: "Nomi",
            },
            {
                accessorKey: "note",
                header: "Eslatma",
            },
            {
                accessorKey: "measurement_type",
                header: "O'lchov turi",
            },
            {
                accessorKey: "quantity",
                header: "Midqor",
            },
            {
                accessorKey: "price_uz",
                header: "Narx uzs",
            },
            {
                accessorKey: "total_uz",
                header: "Jami",
            },
        ],
        [],
    )
}
