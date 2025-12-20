import { useSearch } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useAdditionColumns = () => {
    const search = useSearch({ from: "/_main/route/" })
    const { type } = search

    return useMemo<ColumnDef<RouteAddition>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "scheduled_delivery_date",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const date = getValue<string>()
                    return (
                        <div className="whitespace-nowrap">
                            {format(date, "yyyy-MM-dd HH:mm")}
                        </div>
                    )
                },
            },

            {
                header: "Mijoz (Tashkilot)",
                accessorKey: "company_name",
                enableSorting: true,
                cell: ({ row }) => (
                    <div>
                        {row.original.client_data?.name} (
                        {row.original.client_data?.company_name})
                    </div>
                ),
            },
            {
                header: "Haydovchi ismi",
                accessorKey: "driver_name",
                enableSorting: true,
                cell: ({ row }) => {
                    const value = row.original.driver_name
                    return value ? value : (
                            <span className="text-muted-foreground">-</span>
                        )
                },
            },
            {
                header: "Manzil",
                accessorKey: "address",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-52 break-all">
                        {row.original.client_data?.address}
                    </div>
                ),
            },
            {
                header: "Telefon",
                accessorKey: "phone",
                enableSorting: true,
                cell: ({ row }) => (
                    <div>{row.original.client_data?.phone_number}</div>
                ),
            },
            {
                header: "Ombor",
                accessorKey: "depot_name",
                enableSorting: true,
            },
            {
                header: "Mashina",
                accessorKey: "vehicle_name",
                enableSorting: true,
                cell: ({ row }) => {
                    const value = row.original.vehicle_name
                    return value ? value : (
                            <span className="text-muted-foreground">-</span>
                        )
                },
            },
            {
                header: "To'lov turi",
                accessorKey: "payment_type",
                enableSorting: true,
                   cell: ({ row }) => {
                    const value = row.original.payment_type
                    return value ? value : (
                            <span className="text-muted-foreground">-</span>
                        )
                },
            },
            {
                header: "To'lov summasi",
                accessorKey: "cod",
                enableSorting: true,
                cell: ({ row }) => (
                    <div>
                        {row.original.cod ?
                            `${parseFloat(row.original.cod).toLocaleString()} UZS`
                        :   "-"}
                    </div>
                ),
            },
            {
                header: "Og'irlik (kg)",
                accessorKey: "weight",
                enableSorting: true,
                cell: ({ row }) => {
                    const value = row.original.weight
                    return value ? value : (
                            <span className="text-muted-foreground">-</span>
                        )
                },
            },
            {
                header: "Mahsulot soni",
                accessorKey: "product_count",
                enableSorting: true,
            },
            {
                header: "Hajm (m3)",
                accessorKey: "volume",
                enableSorting: true,
                     cell: ({ row }) => {
                    const value = row.original.volume
                    return value ? value : (
                            <span className="text-muted-foreground">-</span>
                        )
                },
            },
            {
                header: "Ustuvorlik",
                accessorKey: "priority",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const priority = getValue<number>()
                    const priorityMap: Record<number, string> = {
                        1: "Past",
                        2: "Oʻrta",
                        3: "Yuqori",
                    }
                    return priorityMap[priority] || "Noma'lum"
                },
            },
            {
                header: "Ustuvorlik",
                accessorKey: "priority_vehicle",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const priority = getValue<number>()
                    const priorityMap: Record<number, string> = {
                        1: "Past",
                        2: "Oʻrta",
                        3: "Yuqori",
                    }
                    return priorityMap[priority] || "Noma'lum"
                },
            },
            {
                header: "ETA",
                accessorKey: "eta",
                enableSorting: true,
                cell: ({ row }) => (
                    <div>
                        {row.original.eta ?
                            new Date(row.original.eta).toLocaleString()
                        :   "-"}
                    </div>
                ),
            },
            {
                header: "Izoh",
                accessorKey: "note",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-40 break-all">
                        {row.original.note}
                    </div>
                ),
            },
        ],
        [type],
    )
}
