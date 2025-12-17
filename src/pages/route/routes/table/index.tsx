import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ROUTE_VEHICLES,
    ROUTE_VEHICLES_DETAIL,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useGlobalStore } from "@/store/global-store"
import { CarTableRow } from "./car-row"
import { useColumnsCarsOrderTable } from "./cars-col"
import AddVehiclesModal from "./modal/add-car"

export const CarsTable = () => {
    const { data } = useGet<ListResponse<CarsTypeInOrders>>(ROUTE_VEHICLES)
    const { getData } = useGlobalStore()
    const selectedCar = getData(ROUTE_VEHICLES) as CarsTypeInOrders | null
    const columns = useColumnsCarsOrderTable()
    const totalColumns = columns.length + 2

    return (
        <div className="overflow-x-auto  ">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column: any, index) => (
                            <TableHead
                                key={index}
                                className="whitespace-nowrap"
                            >
                                {column.header}
                            </TableHead>
                        ))}

                        <TableHead className="whitespace-nowrap text-right"></TableHead>

                        <TableHead className="w-[40px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.results.map((car, index) => (
                        <CarTableRow
                            key={car.uuid}
                            car={car}
                            index={index}
                            colSpan={totalColumns}
                        />
                    ))}
                </TableBody>
            </Table>

            <DeleteModal path={ROUTE_VEHICLES_DETAIL} id={selectedCar?.uuid} />

            <Modal
                size="max-w-4xl"
                title={
                    selectedCar?.uuid ?
                        "Marshurtlarni tahrirlash"
                    :   "Marshurt qo'shish"
                }
                modalKey={"create"}
            >
                <AddVehiclesModal />
            </Modal>
        </div>
    )
}
