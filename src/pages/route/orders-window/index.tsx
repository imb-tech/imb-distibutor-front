import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { ORDERS_WINDOW, SETTINGS_VEHICLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { AddOrder } from "@/pages/orders/create"
import { useGlobalStore } from "@/store/global-store"
import { useSearch } from "@tanstack/react-router"
import HeaderRoute from "./header"
import { useRouteColumns } from "@/hooks/use-router-column"
import { AddRoute } from "../routes-window"

function RoutesMain() {
    const search = useSearch({ from: "/_main/route/" })
    const params = {
        ...search,
        status: 0,
        page_tabs:null

    }

    const { openModal: createOrder } = useModal("create")
    const { openModal: deleteOrder } = useModal("delete")
    const { setData, getData } = useGlobalStore()

    const currentStaff = getData<OrderRow>(ORDERS_WINDOW)
    const currentRoute = getData<VehicleRow>(SETTINGS_VEHICLES)

    const { data: ordersData, isLoading } = useGet<ListResponse<OrderRow>>(ORDERS_WINDOW, {
        params: params
    })

    const columns = useRouteColumns()

    const handleDelete = (item: OrderRow) => {
        setData<OrderRow>(ORDERS_WINDOW, item)
        deleteOrder()
    }

    const handleEdit = (item: OrderRow) => {
        setData(ORDERS_WINDOW, item)
        createOrder()
    }

    // const handleRowSelectionChange = (rows:OrderRow[]) => {
    //     const ids = rows.map(row => row.orderId || row.id || "").filter(Boolean)
    //     setData("order_ids", ids)
    // }

    return (
        <Card>
            <CardContent>
                <HeaderRoute />

                <DataTable
                    numeration
                    columns={columns}
                    loading={isLoading}
                    data={ordersData?.results}
                    onEdit={(row) => handleEdit(row.original)}
                    onDelete={(row) => handleDelete(row.original)}
                    wrapperClassName="px-0"
                    selecteds_row={true}
                    // onSelectedRowsChange={handleRowSelectionChange}

                />

                <Modal
                    modalKey={"create"}
                    size="max-w-5xl"
                    title={currentStaff?.uuid ? "Tahrirlash" : "Yaratish"}
                >
                    <div className="max-h-[80vh] overflow-y-auto no-scrollbar-x p-0.5">
                        <AddOrder />
                    </div>
                </Modal>

                <Modal
                    modalKey="route"
                    size="max-w-5xl"
                    title="Marshrut yaratish"
                >
                    <AddRoute />
                </Modal>

                <DeleteModal path={ORDERS_WINDOW} id={currentStaff?.uuid} />
            </CardContent>
        </Card>
    )
}

export default RoutesMain