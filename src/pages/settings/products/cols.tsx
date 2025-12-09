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
                accessorKey: "eslatma",
                header: "Eslatma",
            },
            {
                accessorKey: "measurement_type",
                header: "O'lchov turi",
            },
            {
                accessorKey: "miqdor",
                header: "Midqor",
            },
            {
                accessorKey: "narx_uz",
                header: "Narx uzs",
            },
            {
                accessorKey: "jami_uz",
                header: "Jami",
            },
        ],
        [],
    )
}
