import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

 
export const useColumnsDriverTable = () => {
    return useMemo<ColumnDef<DriversType>[]>(
        () => [
            {
                accessorKey: "full_name",
                header: "F.I.O",
                enableSorting: true,
            },
            {
                accessorKey: "phone_number",
                header: "Telefon raqami",
                enableSorting: true,
            },
            {
                accessorKey: "passport_series",
                header: "Passport seriyasi",
                enableSorting: true,
            },
            {
                accessorKey: "jshshir",
                header: "JShShIR",
                enableSorting: true,
            },
            {
                accessorKey: "driver_license",
                header: "Hayodvchilik guvohnomasi",
                enableSorting: true,
            },
            {
                accessorKey: "license_number",
                header: "Guvohnoma raqami",
                enableSorting: true,
            },
            {
                accessorKey: "working_stage",
                header: "Ish staji",
                enableSorting: true,
            },
            {
                accessorKey: "company_id",
                header: "Kompanya ID",
                enableSorting: true,
            },
            {
                accessorKey: "login",
                header: "login",
                enableSorting: true,
            },
            {
                accessorKey: "parol",
                header: "parol",
                enableSorting: true,
            },
            {
                accessorKey: "activity",
                header: "Faol",
                enableSorting: true,
            },
        ],
        [],
    )
}
