import { CopyButton } from "@/lib/copy-button"
import { useSearch } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useConstantColumns = () => {
    const search = useSearch({ from: "/_main/route/" })
    const { type } = search

    return useMemo<ColumnDef<RouteConstant>[]>(
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
            {
                header: "Ombor",
                accessorKey: "warehouse",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div className="min-w-32">{original.warehouse}</div>
                ),
            },
            {
                header: "Mijoz:Tashkilot nomi",
                accessorKey: "customerOrg",
                enableSorting: true,
            },
            {
                header: "Manzil",
                accessorKey: "address",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div className="min-w-52 break-all">{original.address}</div>
                ),
            },
            {
                header: "Manzil hududi",
                accessorKey: "region",
                enableSorting: true,
            },
            {
                header: "Kontakt nomi",
                accessorKey: "contact_name",
                enableSorting: true,
            },
            {
                header: "Telefon raqami",
                accessorKey: "phone",
                enableSorting: true,
            },
            {
                header: "Ish vaqti",
                accessorKey: "workTime",
                enableSorting: true,
            },
            { header: "Eslatma", accessorKey: "note", enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div className="min-w-32 break-all">{original.note}</div>
                ),
             },
            {
                header: "Ustuvor transport",
                accessorKey: "priorityTransport",
                enableSorting: true,
            },
            {
                header: "Yuk tushirish vaqti",
                accessorKey: "unloadTime",
                enableSorting: true,
            },
            {
                header: "To'lov naqd summasi",
                accessorKey: "cashPayment",
                enableSorting: true,
            },
            {
                header: "Og'irlik kg",
                accessorKey: "weightKg",
                enableSorting: true,
            },
            {
                header: "Mahsulot soni",
                accessorKey: "productCount",
                enableSorting: true,
            },
            { header: "Hajm m3", accessorKey: "volumeM3", enableSorting: true },
        ],
        [type],
    )
}
