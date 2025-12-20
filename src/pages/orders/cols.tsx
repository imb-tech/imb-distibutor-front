import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"
import { useGet } from "@/hooks/useGet"
import { SETTINGS_SHIPPERS } from "@/constants/api-endpoints"
import { Skeleton } from "@/components/ui/skeleton"

export const cols = () => {

        const { data: shippersData, isLoading: isLoadingShippers } =
            useGet<ListResponse<ShippersType>>(SETTINGS_SHIPPERS)
    
        const shippers = useMemo(() => {
            if (!shippersData?.results) return {}
    
            return shippersData.results.reduce(
                (acc: Record<string, string>, shipper: ShippersType) => {
                    acc[shipper.id] = shipper.name
                    return acc
                },
                {},
            )
        }, [shippersData])
    return useMemo<ColumnDef<OrderRow>[]>(
        () => [


            {
                header: "ID buyurtma",
                accessorKey: "id",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="min-w-[140px] ">
                        {row.original.id}
                    </div>
                ),
            },
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
                header: "Haydovchi",
                accessorKey: "driver_name",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="min-w-[140px] ">
                        {row.original.driver_name}
                    </div>
                ),
            },
            {
                header: "Avtomobil raqami",
                accessorKey: "vehicle_number",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="min-w-[140px] ">
                        {row.original.vehicle_number}
                    </div>
                ),
            },

            {
                header: "Mijoz",
                accessorKey: "client_data.company_name",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="min-w-[200px]  ">
                        {row.original.client_data.company_name}
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
                        0: "Unscheduled",
                        1: "Scheduled",
                        2: "In Progress",
                        3: "Partly Delivered",
                        4: "Delivered",
                        5: "Not Delivered"
                    }
                    return (
                        <div className="whitespace-nowrap">
                            {statusMap[status] || "Noma'lum"}
                        </div>
                    )
                },
            },
            {
                header: "ETA vaqti",
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
                header: "Kontakt nomi",
                accessorKey: "name",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[200px]  ">
                        {row.original.client_data.name}
                    </div>
                ),
            },

            {
                header: "Rad etish sababi",
                accessorKey: "reject_reason",
                enableSorting: true,
            },
            {
                header: "Ogʼirlik kg",
                accessorKey: "weight",
                enableSorting: true,
            },

          
            {
                header: "Yuk tushirish vaqti",
                accessorKey: "time_to_drop",
                enableSorting: true,
            },
            {
                header: "Yuk jo'natuvchi",
                accessorKey: "shipper",
                enableSorting: false,
                          cell: ({ row }) => {
                    const shipperId = row.getValue("shipper")

                    if (isLoadingShippers) {
                        return <Skeleton className="h-4 w-20" />
                    }

                    if (!shipperId && shipperId !== 0) return "-"

                    const  shipperName = shippers[shipperId.toString()]
                    return  shipperName || shipperId
                },
            },
            {
                header: "Sana marshrut",
                accessorKey: "route_start_date",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const date = getValue<string>()
                    return format(date, "yyyy-MM-dd  HH:mm")
                },
            },

            {
                header: "Uzunlik (Longitude)",
                accessorKey: "client_data.coordinates", // asl manba
                enableSorting: true,
                sortingFn: (rowA, rowB) => {
                    const coordA = rowA.original.client_data.coordinates?.[0] ?? 0;
                    const coordB = rowB.original.client_data.coordinates?.[0] ?? 0;
                    return coordA - coordB;
                },
                cell: ({ row }) => {
                    const longitude = row.original.client_data.coordinates?.[0];
                    return (
                        <div className="whitespace-nowrap font-medium">
                            {longitude ? longitude.toFixed(6) : "-"}
                        </div>
                    );
                },
            },
            {
                header: "Kenglik (Latitude)",
                accessorKey: "client_data.coordinates",
                enableSorting: true,
                sortingFn: (rowA, rowB) => {
                    const coordA = rowA.original.client_data.coordinates?.[1] ?? 0;
                    const coordB = rowB.original.client_data.coordinates?.[1] ?? 0;
                    return coordA - coordB;
                },
                cell: ({ row }) => {
                    const latitude = row.original.client_data.coordinates?.[1];
                    return (
                        <div className="whitespace-nowrap font-medium">
                            {latitude ? latitude.toFixed(6) : "-"}
                        </div>
                    );
                },
            },
               {
                header: "Reys hududi",
                accessorKey: "client_data.address_zone",
                enableSorting: true,
            },
            {
                header: "Toʼlov naqd summasi",
                accessorKey: "cod",
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
                accessorKey: "client_data.company_name",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[200px] ">
                        {row.original.client_data.company_name}
                    </div>
                ),
            },
   {
                header: "Yetib keldi",
                accessorKey: "end_time",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[200px] ">
                        {row.original.end_time}
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
                accessorKey: "depot_name",
                enableSorting: true,
                cell: ({ getValue }) => (
                    <div className="min-w-[240px]">
                        {String(getValue() ?? "-")}
                    </div>
                ),
            },

            {
                header: "Telefon raqami",
                accessorKey: "client_data.phone_number",
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
                accessorKey: "client_data.email",  
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[200]">
                        {row.original.client_data.email}
                    </div>
                ),
            },
            {
                header: "Haydovchi uchun eslatma",
                accessorKey: "client_data.note",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[200]">
                        {row.original.client_data.note}
                    </div>
                ),
            },
        ],
        [shippers,isLoadingShippers],
    )
}
