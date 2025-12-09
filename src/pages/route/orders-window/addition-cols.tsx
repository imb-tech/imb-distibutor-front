import { CopyButton } from "@/lib/copy-button"
import { useSearch } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useAdditionColumns = () => {
    const search = useSearch({ from: "/_main/route/" })
    const { type } = search

    return useMemo<ColumnDef<RouteAddition>[]>(
        () => [
            {
                header: "ID",
                accessorKey: "orderId",
                enableSorting: true,
                cell: ({ row: { original } }) => CopyButton(original.orderId),
            },
            {
                header: "Sana",
                accessorKey: "date",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <span className="whitespace-nowrap">{original.date}</span>
                ),
            },
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
                cell: ({ row: { original } }) => (
                    <div className="min-w-40 break-all">{original.address}</div>
                ),
            },
            {
                header: "Tushirish manzili",
                accessorKey: "region",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div className="min-w-40 break-all">{original.region}</div>
                ),
            },
            {
                header: "Telefon raqami",
                accessorKey: "phone",
                enableSorting: true,
            },
            {
                header: "Eslatma",
                accessorKey: "note",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div className="min-w-44 break-all">{original.note}</div>
                ),
            },
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
                cell: ({ row: { original } }) => (
                    <div className="min-w-24 break-all">
                        {original.productCount}
                    </div>
                ),
            },
            { header: "Hajm m3", accessorKey: "volumeM3", enableSorting: true },
        ],
        [type],
    )
}
