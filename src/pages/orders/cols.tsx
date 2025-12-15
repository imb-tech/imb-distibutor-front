import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const cols = () => {
    return useMemo<ColumnDef<OrderRow>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "created_at",
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
                header: "Mijoz",
                accessorKey: "client_data.name",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="min-w-[140px] ">
                        {row.original.client_data.name}
                    </div>
                ),
            },
            {
                header: "Manzil",
                accessorKey: "client_data.address",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="min-w-[200px]  ">
                        {row.original.client_data.address}
                    </div>
                ),
            },
            {
                header: "Eslatma",
                accessorKey: "note",
                enableSorting: true,
                cell: ({ getValue }) => (
                    <div className="min-w-[200px] ">
                        {String(getValue() ?? "")}
                    </div>
                ),
            },
            {
                header: "Status",
                accessorKey: "status",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const status = getValue<number>()
                    const statusMap: Record<number, string> = {
                        0: "Kutilmoqda",
                        1: "Jarayonda",
                        2: "Yetkazildi",
                        3: "Bekor qilindi",
                    }
                    return (
                        <div className="whitespace-nowrap">
                            {statusMap[status] || "Noma'lum"}
                        </div>
                    )
                },
            },
            {
                header: "Vaqt",
                accessorKey: "eta",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const time = getValue<string>()
                    return (
                        <div className="whitespace-nowrap">
                            {format(time, "yyyy-MM-dd HH:mm")}
                        </div>
                    )
                },
            },

            {
                header: "Rad etish sababi",
                accessorKey: "rejection_reason",
                enableSorting: true,
            },
            {
                header: "Ogʼirlik kg",
                accessorKey: "weight",
                enableSorting: true,
            },

            {
                header: "Yuk tushirish vaqti",
                accessorKey: "scheduled_delivery_date",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const date = getValue<string>()
                    return format(date, "yyyy-MM-dd HH:mm")
                },
            },

            {
                header: "Toʼlov naqd summasi",
                accessorKey: "cod", // Using COD field
                enableSorting: true,
                cell: ({ row: { original } }) => formatMoney(original.cod),
            },
            {
                header: "Hajm m3",
                accessorKey: "volume",
                enableSorting: true,
            },
            {
                header: "Yetkazib beruvchi",
                accessorKey: "client_data.company_name", // Using company name
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[200px] ">
                        {row.original.client_data.company_name}
                    </div>
                ),
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
                header: "Ombor manzili",
                accessorKey: "depot_name", // Using depot name
                enableSorting: true,
                cell: ({ getValue }) => (
                    <div className="min-w-[240px]">
                        {String(getValue() ?? "-")}
                    </div>
                ),
            },

            {
                header: "Telefon raqami",
                accessorKey: "client_data.phone_number", // Using client phone
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="whitespace-nowrap">
                        {formatPhoneNumber(
                            row.original.client_data.phone_number,
                        )}
                    </div>
                ),
            },
            {
                header: "Elektron pochta",
                accessorKey: "client_data.email", // Using client email
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[200]">
                        {row.original.client_data.email}
                    </div>
                ),
            },
        ],
        [],
    )
}
