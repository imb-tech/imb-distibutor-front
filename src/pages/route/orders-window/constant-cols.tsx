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
                cell: ({ row }) => CopyButton(row.original.orderId),
            },
            {
                header: "Sana",
                accessorKey: "scheduled_delivery_date",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <span className="whitespace-nowrap">
                        {original.scheduled_delivery_date
                            ? new Date(original.scheduled_delivery_date).toLocaleDateString()
                            : "-"
                        }
                    </span>
                ),
            },
            {
                header: "Ombor",
                accessorKey: "depot_name",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div className="min-w-32">{original.depot_name}</div>
                ),
            },
            {
                header: "Mijoz: Tashkilot nomi",
                accessorKey: "client_data",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div>
                        {original.client_data?.name} ({original.client_data?.company_name})
                    </div>
                ),
            },
            {
                header: "Telefon raqami",
                accessorKey: "phone",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div>
                        {original.client_data?.phone_number}
                    </div>
                ),
            },
            {
                header: "Manzil",
                accessorKey: "address",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div className="min-w-40 break-all">
                        {original.client_data?.address}
                    </div>
                ),
            },
            {
                header: "Kod",
                accessorKey: "code",
                enableSorting: true,
            },
            {
                header: "Yetkazib berish vaqti",
                accessorKey: "time_to_drop",
                enableSorting: true,
            },
            {
                header: "Ustuvorlik",
                accessorKey: "priority",
                enableSorting: true,
            },
            {
                header: "To'lov turi",
                accessorKey: "type",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div>
                        {original.type === 1 ? "COD" : "Other"}
                    </div>
                ),
            },
            {
                header: "To'lov summasi",
                accessorKey: "cod",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div>
                        {original.cod ? `${parseFloat(original.cod).toLocaleString()} UZS` : "-"}
                    </div>
                ),
            },
            {
                header: "Og'irlik (kg)",
                accessorKey: "weight",
                enableSorting: true,
            },
            {
                header: "Hajm (m3)",
                accessorKey: "volume",
                enableSorting: true,
            },
            {
                header: "Mahsulot soni",
                accessorKey: "product_count",
                enableSorting: true,
            },
            {
                header: "Haydovchi",
                accessorKey: "driver_name",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div>
                        {original.driver_name || "-"}
                    </div>
                ),
            },
            {
                header: "Mashina",
                accessorKey: "vehicle_name",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div>
                        {original.vehicle_name || "-"}
                    </div>
                ),
            },
            {
                header: "Ustuvor transport",
                accessorKey: "priority_vehicle",
                enableSorting: true,
            },
            {
                header: "ETA",
                accessorKey: "eta",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div>
                        {original.eta ? new Date(original.eta).toLocaleString() : "-"}
                    </div>
                ),
            },
            {
                header: "Eslatma",
                accessorKey: "note",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <div className="min-w-32 break-all">{original.note}</div>
                ),
            },
        ],
        [type],
    )
}