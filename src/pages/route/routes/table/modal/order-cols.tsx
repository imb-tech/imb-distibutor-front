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

export const useColumnsOrderTable = () => {
    return useMemo<ColumnDef<OrderRoutesType>[]>(
        () => [
            {
                accessorKey: "client_address",
                header: "Manzil",
                enableSorting: true,
                cell: ({ row }) => {
                    const address = row.original.client_address
                    return (
                        <div className="max-w-[300px] truncate" title={address}>
                            {address}
                        </div>
                    )
                },
            },
            {
                accessorKey: "client_coordinates",
                header: "Harita",
                enableSorting: false,
                cell: ({ row }) => {
                    const coordinates = row.original.client_coordinates

                    if (
                        !Array.isArray(coordinates) ||
                        coordinates.length !== 2
                    ) {
                        return <span className="text-muted-foreground">—</span>
                    }

                    const [longitude, latitude] = coordinates

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
                                        lat={latitude || 41.2775}
                                        long={longitude || 69.2853}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    )
                },
            },
        ],
        [],
    )
}
