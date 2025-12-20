import ParamPagination from "@/components/as-params/pagination"
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
import { useSearch } from "@tanstack/react-router"
import { CarTableRow } from "./car-row"
import { useColumnsCarsOrderTable } from "./cars-col"
import AddVehiclesModal from "./modal/add-car"
import AddOrderList from "./modal/add-order"

export const CarsTable = () => {
    const search = useSearch({ from: "/_main/route/" })
    const { page_tabs, ...params } = search
    const { data } = useGet<ListResponse<CarsTypeInOrders>>(ROUTE_VEHICLES, {
        params,
    })
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

            <div className="flex my-3 justify-center">
                <ParamPagination totalPages={data?.total_pages} />
            </div>

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
            <Modal
                size="max-w-4xl"
                title={"Buyurtmalar tanlang"}
                modalKey="order-list"
            >
                <AddOrderList uuid={selectedCar?.uuid || ""} />
            </Modal>
        </div>
    )
}
