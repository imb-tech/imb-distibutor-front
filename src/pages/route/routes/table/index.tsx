import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ROUTE_VEHICLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { CarTableRow } from "./car-row"
import { useColumnsCarsOrderTable } from "./cars-col"

export const CarsTable = () => {
    const { data } = useGet<ListResponse<CarsTypeInOrders>>(ROUTE_VEHICLES)
    const columns = useColumnsCarsOrderTable()
    return (
        <div className="overflow-x-auto  no-scrollbar-x">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column: any, index) => (
                            <TableHead
                                key={index}
                                className=" whitespace-nowrap"
                            >
                                {column.header}
                            </TableHead>
                        ))}
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.results.map((car, index) => (
                        <CarTableRow key={car.uuid} car={car} index={index} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
