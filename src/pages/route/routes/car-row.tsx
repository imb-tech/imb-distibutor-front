import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { useNavigate, useSearch } from "@tanstack/react-router"
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
}

export const CarTableRow = ({ car, index }: CarTableRowProps) => {
    const search = useSearch({ from: "/_main/route/" })
    const { route_id } = search
    const navigate = useNavigate()

    const cols = [
        { icon: <Package size={16} />, value: car.load_capacity },
        { icon: <Route size={16} />, value: car.path },
        {
            icon: <CircleUser size={16} className="text-primary" />,
            value: car.driver,
        },
        {
            icon: <CircleDollarSign size={16} className="text-primary" />,
            value: car.forwarder,
        },
        {
            icon: <Truck size={16} className="text-primary" />,
            value: car.car_model,
        },
        { icon: null, value: car.car_number },
    ]

    return (
        <>
            <TableRow
                className={`cursor-pointer ${route_id == String(car.id) ? "bg-secondary" : ""}`}
                onClick={() => {
                    navigate({
                        to: "/route",
                        search: {
                            ...search,
                            route_id: route_id ? undefined : String(car.id),
                        },
                    })
                }}
            >
                <TableCell>{index + 1}</TableCell>

                {cols.map((cell, i) => (
                    <TableCell key={i}>
                        <div className="flex items-center gap-[5px] bg-secondary rounded-lg px-3 py-2">
                            {cell.icon}
                            {cell.value}
                        </div>
                    </TableCell>
                ))}

                <TableCell className="text-right p-0">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                                route_id == String(car.id) ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </TableCell>
            </TableRow>

            {route_id == String(car.id) && (
                <TableRow>
                    <TableCell colSpan={8} className="p-0">
                        <CarDetailsRow car={car} />
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}
