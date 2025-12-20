import { Button } from "@/components/ui/button"
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
                    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`

                    return (
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8"
                            onClick={() => window.open(googleMapsUrl, "_blank")}
                        >
                            <MapPin className="h-3 w-3 mr-1" />
                            Karta
                        </Button>
                    )
                },
            },
        ],
        [],
    )
}
