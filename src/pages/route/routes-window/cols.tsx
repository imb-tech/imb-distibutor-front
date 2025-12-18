import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { useMemo } from "react"

const fuelTypeMap: Record<number, string> = {
  1: "Benzin",
  2: "Dizel",
  3: "Gaz",
  4: "Elektron",
}

export const vehicleCols = () => {
  return useMemo<ColumnDef<VehicleRow>[]>(() => [

    {
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      header: "Raqam",
      accessorKey: "number",
      enableSorting: true,
      cell: ({ getValue }) => (
        <div className="font-medium whitespace-nowrap">
          {getValue<string>()}
        </div>
      ),
    },
    {
      header: "Haydovchi ID",
      accessorKey: "driver",
      enableSorting: true,
    },
    {
      header: "Turi ID",
      accessorKey: "type",
      enableSorting: true,
    },
    {
      header: "Litsenziya",
      accessorKey: "license",
      enableSorting: true,
    },
    {
      header: "Seriya raqami",
      accessorKey: "serial_number",
      enableSorting: true,
    },
    {
      header: "Yil",
      accessorKey: "year",
      enableSorting: true,
      cell: ({ getValue }) => {
        const date = getValue<string>()
        return format(date, "yyyy-MM-dd")
      },
    },
    {
      header: "Yoqilgʻi turi",
      accessorKey: "fuel_type",
      enableSorting: true,
      cell: ({ getValue }) => {
        const fuel = getValue<number>()
        return fuelTypeMap[fuel] || "Noma'lum"
      },
    },
    {
      header: "Hajmi (m³)",
      accessorKey: "size",
      enableSorting: true,
      cell: ({ getValue }) => {
        const size = getValue<number>()
        return size.toLocaleString()
      },
    },
    {
      header: "Ombor ID",
      accessorKey: "depot",
      enableSorting: true,
    },
  ], [])
}
