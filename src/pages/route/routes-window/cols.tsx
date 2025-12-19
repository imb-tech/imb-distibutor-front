import { Skeleton } from "@/components/ui/skeleton"
import { SETTINGS_DRIVERS, SETTINGS_WAREHOUSE } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

const fuelTypeMap: Record<number, string> = {
    1: "Benzin",
    2: "Dizel",
    3: "Gaz",
    4: "Elektron",
}

const VEHICLE_TYPE_OPTIONS = [
    { label: "Yengil avtomobil", value: 1 },
    { label: "Yuk avtomobili", value: 2 },
    { label: "Avtobus", value: 3 },
    { label: "Treyler", value: 4 },
    { label: "Maxsus texnika", value: 7 },
    { label: "Refrijerator", value: 10 },
]

export const vehicleCols = () => {
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

    const vehicleTypeMap = VEHICLE_TYPE_OPTIONS.reduce(
        (acc, option) => {
            acc[option.value] = option.label
            return acc
        },
        {} as Record<number, string>,
    )

    return useMemo<ColumnDef<VehicleRow>[]>(
        () => [
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
                header: "Turi ID",
                accessorKey: "type",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const type = getValue<number>()
                    return vehicleTypeMap[type] || "Noma'lum"
                },
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
                    return (
                        <div className="min-w-[100px] w-[100px] truncate">
                            {format(date, "dd-MM-yyyy")}
                        </div>
                    )
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
