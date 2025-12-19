import { Skeleton } from "@/components/ui/skeleton"
import { SETTINGS_DRIVERS, SETTINGS_WAREHOUSE } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
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

const VEHICLE_TYPES: Record<number, string> = {
    1: "Yengil avtomobil",
    2: "Yuk avtomobili",
    3: "Avtobus",
    4: "Treyler",
    5: "Maxsus texnika",
}

export const useColumnsCarsTable = () => {
    const { data: warehousesData, isLoading: isLoadingWarehouses } = useGet<{
        results: WarehouseType[]
    }>(SETTINGS_WAREHOUSE)

    const { data: driversData, isLoading: isLoadingDrivers } =
        useGet<ListResponse<DriversType>>(SETTINGS_DRIVERS)

    const warehouseMap = useMemo(() => {
        if (!warehousesData?.results) return {}

        return warehousesData.results.reduce(
            (acc: Record<string, string>, warehouse: WarehouseType) => {
                acc[warehouse.id] = warehouse.name
                return acc
            },
            {},
        )
    }, [warehousesData])

    const driverMap = useMemo(() => {
        if (!driversData?.results) return {}

        return driversData?.results.reduce(
            (acc: Record<string, string>, driver: DriversType) => {
                acc[driver.id] = driver.full_name
                return acc
            },
            {},
        )
    }, [driversData])

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
                accessorKey: "type",
                header: "Avtomobil turi",
                enableSorting: true,
                cell: ({ row }) => {
                    const typeId = row.original.type
                    return <span>{VEHICLE_TYPES[typeId] || `${typeId}`}</span>
                },
            },
            {
                header: "Haydovchi",
                accessorKey: "driver",
                enableSorting: true,
                cell: ({ row }) => {
                    const driverId = row.getValue("driver")

                    if (isLoadingWarehouses) {
                        return <Skeleton className="h-4 w-20" />
                    }

                    if (!driverId && driverId !== 0) return "-"

                    const driverName = driverMap[driverId.toString()]
                    return driverName || driverId
                },
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
                accessorKey: "depot",
                header: "Ombor",
                enableSorting: true,
                cell: ({ row }) => {
                    const depotId = row.getValue("depot")

                    if (isLoadingWarehouses) {
                        return <Skeleton className="h-4 w-20" />
                    }

                    if (!depotId && depotId !== 0) return "-"

                    const driverName = warehouseMap[depotId.toString()]
                    return driverName || depotId
                },
            },
        ],
        [warehouseMap, isLoadingWarehouses, driverMap, isLoadingDrivers],
    )
}
