import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { ROUTE_VEHICLES } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { format } from "date-fns"
import {
    ChevronDown,
    CircleUser,
    Clock,
    MoreVertical,
    Package,
    Pencil,
    Trash2,
    Truck,
} from "lucide-react"
import { CarDetailsRow } from "../table-detail"

interface CarTableRowProps {
    car: CarsTypeInOrders
    index: number
    colSpan?: number
}

export const CarTableRow = ({ car, index, colSpan }: CarTableRowProps) => {
    const search = useSearch({ from: "/_main/route/" })
    const { setData } = useGlobalStore()
    const { openModal: openCreateModal } = useModal("create")
    const { openModal: openDeleteModal } = useModal("delete")
    const { route_id, ...otherSearchParams } = search
    const navigate = useNavigate()

    const cols = [
        {
            icon: <CircleUser size={16} className="text-primary" />,
            value: car.driver_name,
        },
        {
            icon: <Truck size={16} className="text-primary" />,
            value: car.vehicle_name,
        },
        {
            icon: <Truck className="text-primary" size={16} />,
            value: car.vehicle_number,
        },
        {
            icon: <CircleUser size={16} className="text-primary" />,
            value: car.name,
        },
        {
            icon: <Package className="text-primary" size={16} />,
            value: car.progress_order_count,
        },
        {
            icon: <Package className="text-primary" size={16} />,
            value: car.finished_order_count,
        },
        {
            icon: <Package className="text-primary" size={16} />,
            value: car.order_weight,
        },
        {
            icon: <Clock className="text-primary" size={16} />,
            value:
                car.start_date ?
                    format(car.start_date, "yyyy-MM-dd HH:mm")
                :   "-",
        },
    ]

    const handleRowClick = () => {
        const hasId = route_id === String(car.uuid)

        navigate({
            to: "/route",
            search: {
                ...otherSearchParams,
                route_id: hasId ? undefined : String(car.uuid),
                order_id: undefined,
                tabs: undefined,
            },
        })
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        setData(ROUTE_VEHICLES, car)
        openCreateModal()
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        setData(ROUTE_VEHICLES, car)
        openDeleteModal()
    }

    const totalColSpan = colSpan || 10

    return (
        <>
            <TableRow
                className={`cursor-pointer ${route_id == String(car.uuid) ? "bg-secondary" : ""}`}
                onClick={handleRowClick}
            >
                <TableCell>{index + 1}</TableCell>

                {cols.map((cell, i) => (
                    <TableCell key={i}>
                        <div className="flex items-center gap-[5px] bg-secondary whitespace-nowrap rounded-lg px-3 py-2">
                            {cell?.icon}
                            {cell?.value}
                        </div>
                    </TableCell>
                ))}

                <TableCell className="p-0 text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleEdit}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Tahrirlash
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleDelete}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                O'chirish
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>

                <TableCell className="text-right p-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleRowClick()
                        }}
                    >
                        <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                                route_id == String(car.uuid) ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </TableCell>
            </TableRow>

            {route_id == String(car.uuid) && (
                <TableRow>
                    <TableCell colSpan={totalColSpan} className="p-0">
                        <CarDetailsRow car={car} />
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}
