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

export const useColumnsWarehouseTable = () => {
    return useMemo<ColumnDef<WarehouseType>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Ombor",
                enableSorting: true,
            },
            {
                accessorKey: "address",
                header: "Manzil",
                enableSorting: true,
            },
            {
                accessorKey: "location",
                header: "Uzunlik",
                enableSorting: true,
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
                                            +row.original.location[0] || 41.2775
                                        }
                                        long={
                                            +row.original.location[1] || 69.2853
                                        }
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
