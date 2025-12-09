import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useAdditionColumns = () => {
    return useMemo<ColumnDef<RouteAddition>[]>(
        () => [
            {
                header: "ID buyurtma",
                accessorKey: "orderId",
                enableSorting: true,
            },
            { header: "Sana", accessorKey: "date", enableSorting: true },
            { header: "Ombor", accessorKey: "warehouse", enableSorting: true },
            {
                header: "Mijoz:Tashkilot nomi",
                accessorKey: "customerOrg",
                enableSorting: true,
            },
            {
                header: "Yuklash manzili",
                accessorKey: "address",
                enableSorting: true,
            },
            {
                header: "Tushirish manzili",
                accessorKey: "region",
                enableSorting: true,
            },
            {
                header: "Telefon raqami",
                accessorKey: "phone",
                enableSorting: true,
            },
            { header: "Eslatma", accessorKey: "note", enableSorting: true },
            {
                header: "Ustuvor transport",
                accessorKey: "priorityTransport",
                enableSorting: true,
            },
            {
                header: "To'lov turi",
                accessorKey: "unloadTime",
                enableSorting: true,
            },
            {
                header: "To'lov summasi",
                accessorKey: "cashPayment",
                enableSorting: true,
            },
            {
                header: "Og'irlik kg",
                accessorKey: "weightKg",
                enableSorting: true,
            },
            {
                header: "Yuk turi",
                accessorKey: "productCount",
                enableSorting: true,
            },
            { header: "Hajm m3", accessorKey: "volumeM3", enableSorting: true },
        ],
        [],
    )
}
