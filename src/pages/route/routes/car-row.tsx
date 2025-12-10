import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import {
    ChevronDown,
    CircleDollarSign,
    CircleUser,
    Package,
    Route,
    Truck,
} from "lucide-react"
import { CarDetailsRow } from "./car-detail"

interface CarTableRowProps {
    car: CarsTypeInOrders
    index: number
    isExpanded: boolean
    onToggle: (id: number) => void
}

export const CarTableRow = ({
    car,
    index,
    isExpanded,
    onToggle,
}: CarTableRowProps) => {
    const handleClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("button")) return
        onToggle(car.id)
    }

    return (
        <>
            <TableRow
                className={` cursor-pointer border-b-0 ${
                    isExpanded ? "bg-secondary" : ""
                }`}
                onClick={handleClick}
            >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-[5px] bg-accent border-slate-200 dark:border-accent border-2 rounded-[10px] p-[10px]">
                        <Package size={16} />
                        {car.load_capacity}
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-[5px] bg-accent border-slate-200 dark:border-accent border-2 rounded-[10px] p-[10px]">
                        <Route size={16} />
                        {car.path}
                    </div>
                </TableCell>
                <TableCell className="font-mono">
                    <div className="flex items-center gap-[5px] bg-accent border-slate-200 dark:border-accent border-2 rounded-[10px] p-[10px]">
                        <CircleUser className="text-primary" size={16} />
                        {car.driver}
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-[5px] bg-accent border-slate-200 dark:border-accent border-2 rounded-[10px] p-[10px]">
                        <CircleDollarSign className="text-primary" size={16} />
                        {car.forwarder}
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-[5px] bg-accent border-slate-200 dark:border-accent border-2 rounded-[10px] p-[10px]">
                        <Truck className="text-primary" size={16} />
                        {car.car_model}
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-[5px] bg-accent border-slate-200 dark:border-accent border-2 rounded-[10px] p-[10px]">
                        {car.car_number}
                    </div>
                </TableCell>
                <TableCell className="text-right p-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                            e.stopPropagation()
                            onToggle(car.id)
                        }}
                    >
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </TableCell>
            </TableRow>
            {isExpanded && (
                <TableRow className="border-t-0">
                    <TableCell colSpan={8} className="p-0 bg-gray-50/50">
                        <CarDetailsRow car={car} />
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}
