import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumnsCarsTable = () => {
    return useMemo<ColumnDef<CarsType>[]>(
        () => [
            {
                accessorKey: "path",
                header: "Harakatlanish",
                enableSorting: true,
            },
            {
                accessorKey: "car_model",
                header: "Avtomobil rusimi",
                enableSorting: true,
            },
            {
                accessorKey: "car_number",
                header: "Avtomobil raqami",
                enableSorting: true,
            },
            {
                accessorKey: "driver",
                header: "Haydovchi",
                enableSorting: true,
            },
            {
                accessorKey: "license_type",
                header: "Guvohnoma turi",
                enableSorting: true,
            },
            {
                accessorKey: "forwarder",
                header: "Ekspeditor",
                enableSorting: true,
            },
            {
                accessorKey: "series_number",
                header: "Seriya raqami",
                enableSorting: true,
            },
            {
                accessorKey: "year",
                header: "Ishlab chiqarilgan yili",
                enableSorting: true,
            },
            {
                accessorKey: "fuel_type",
                header: "Yoqilg'i turi",
                enableSorting: true,
            },
            {
                accessorKey: "load_capacity",
                header: "Yuk sig'imi",
                enableSorting: true,
            },
            {
                accessorKey: "warehouse",
                header: "Ombor",
                enableSorting: true,
            },
        ],
        [],
    )
}
