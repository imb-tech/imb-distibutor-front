import SeeMap from "@/components/custom/see-map"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ColumnDef } from "@tanstack/react-table"
import { MapPin } from "lucide-react"
import { useMemo } from "react"

export const useColumnsCustomersTable = () => {
    return useMemo<ColumnDef<CustomersType>[]>(
        () => [
            {
                accessorKey: "name",
                header: "F.I.O",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[180px] w-[220px] truncate">
                        {row.original.name}
                    </div>
                ),
            },
            {
                accessorKey: "company_name",
                header: "Tashkilot",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[180px] w-[220px] truncate">
                        {row.original.company_name}
                    </div>
                ),
            },
            {
                accessorKey: "address",
                header: "Manzil",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="min-w-[220px] w-[300px] truncate">
                        {row.original.address}
                    </div>
                ),
            },

            {
                accessorKey: "coordinates",
                header: "Koordinatalar",
                enableSorting: false,
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center">
                            <Popover>
                                <PopoverTrigger
                                    className="!text-primary"
                                    asChild
                                >
                                    <div className="flex items-center gap-1 ">
                                        <Button
                                            type="button"
                                            icon={<MapPin width={20} />}
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 w-[300px] h-[400px] sm:w-[600px] aspect-[3/2]">
                                    <SeeMap
                                        lat={
                                            +row.original.coordinates[0] ||
                                            41.2775
                                        }
                                        long={
                                            +row.original.coordinates[1] ||
                                            69.2853
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    )
                },
            },
            {
                accessorKey: "phone_number",
                header: "Telefon raqami",
                enableSorting: true,
            },
            {
                accessorKey: "email",
                header: "Elektron pochta",
                enableSorting: true,
            },
            {
                accessorKey: "note",
                header: "Eslatmalar",
                enableSorting: true,
                cell: ({ row }) => {
                    const note = row.getValue("note") as string
                    return note ?
                            <div
                                className="max-w-[200px] truncate"
                                title={note}
                            >
                                {note}
                            </div>
                        :   "-"
                },
            },
            {
                accessorKey: "schedules",
                header: "Ish vaqti",
                enableSorting: false,
                cell: ({ row }) => {
                    const schedules = row.original.schedules
                    if (!schedules || schedules.length === 0) return "-"

                    return (
                        <div
                            className="max-w-[120px] truncate"
                            title={`${schedules.length} kun`}
                        >
                            {schedules.length} kun
                        </div>
                    )
                },
            },
        ],
        [],
    )
}
