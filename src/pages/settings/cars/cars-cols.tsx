import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Check, X } from "lucide-react"
import { useMemo } from "react"

const FUEL_TYPES: Record<number, string> = {
    1: "Benzin",
    2: "Dizel",
    3: "Gaz",
    4: "Elektr",
    5: "Gibrid",
    6: "Propan",
}


export const useColumnsCarsTable = () => {
    return useMemo<ColumnDef<CarsType>[]>(
        () => [
            {
                accessorKey: "number",
                header: "Avtomobil raqami",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className="font-medium">{row.original.number}</div>
                ),
            },
            {
                accessorKey: "type_name",
                header: "Avtomobil turi",
                enableSorting: true,
            },
            {
                header: "Haydovchi",
                accessorKey: "driver_name",
                enableSorting: true,
            },
            {
                accessorKey: "license",
                header: "Guvohnoma raqami",
                enableSorting: true,
            },
            {
                accessorKey: "serial_number",
                header: "Seriya raqami",
                enableSorting: true,
            },
            {
                accessorKey: "year",
                header: "Ishlab chiqarilgan yili",
                enableSorting: true,
                cell: ({ row }) => {
                    const date = row.original.year
                    return date ? format(new Date(date), "dd.MM.yyyy") : "-"
                },
            },
            {
                accessorKey: "fuel_type",
                header: "Yoqilg'i turi",
                enableSorting: true,
                cell: ({ row }) => {
                    const fuelId = row.original.fuel_type
                    return (
                        <span>
                            {FUEL_TYPES[fuelId] || `Noma'lum (${fuelId})`}
                        </span>
                    )
                },
            },
            {
                accessorKey: "size",
                header: "Yuk sig'imi (kg)",
                enableSorting: true,
                cell: ({ row }) => {
                    const size = row.original.size
                    return size ? `${size.toLocaleString()} kg` : "-"
                },
            },
            {
                accessorKey: "open_side",
                header: "Yon bagaj",
                enableSorting: true,
                cell: ({ row }) => {
                    const isOpen = row.original.open_side
                    return isOpen ?
                            <Check className="h-4 w-4 text-green-600" />
                        :   <X className="h-4 w-4 text-red-600" />
                },
            },
            {
                accessorKey: "open_back_side",
                header: "Orqa bagaj",
                enableSorting: true,
                cell: ({ row }) => {
                    const isOpen = row.original.open_back_side
                    return isOpen ?
                            <Check className="h-4 w-4 text-green-600" />
                        :   <X className="h-4 w-4 text-red-600" />
                },
            },
            {
                accessorKey: "depot_name",
                header: "Ombor",
                enableSorting: true,
            },
        ],
        [],
    )
}
