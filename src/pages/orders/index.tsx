import ParamDateRange from "@/components/as-params/date-picker-range"
import ParamTabs from "@/components/as-params/tabs"
import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { ORDERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { cols } from "./cols"
import { orderTabs } from "./constants"
import { AddOrder } from "./create"

import ParamInput from "@/components/as-params/input"
import { orders } from "./constants"

const allData = Array.from({ length: 25 }, (_, i) => ({
    ...orders[i % orders.length],
}))

const OrdersMain = () => {
    const navigate = useNavigate()
    const search = useSearch({ from: "/_main/orders/" })

    const { openModal: createOrder } = useModal(ORDERS)
    const { openModal: deleteOrder } = useModal("delete")
    const { setData, getData, clearKey } = useGlobalStore()
    const currentStaff = getData<OrderRow>(ORDERS)
    const { isLoading } = useGet<OrderRow>(ORDERS)

    const handleDelete = (item: OrderRow) => {
        setData<OrderRow>(ORDERS, item)
        deleteOrder()
    }

    const handleEdit = (item: OrderRow) => {
        setData(ORDERS, item)
        createOrder()
    }
    const handleCreate = () => {
        clearKey(ORDERS)
        createOrder()
    }

    return (
        <div>
            <DataTable
                numeration
                columns={cols()}
                data={allData}
                onEdit={(row) => handleEdit(row.original)}
                // loading={isLoading}
                onDelete={(row) => handleDelete(row.original)}
                head={
                    <div className="flex  items-center justify-between gap-3 mb-3">
                        <ParamInput className="w-lg" />

                        <div className="flex justify-between items-center gap-4 ">
                            <Button onClick={handleCreate}>
                                {" "}
                                Buyurtma qo'shish +
                            </Button>

                            <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                                <Button
                                    variant={
                                        !!search?.today ? "default" : "outline"
                                    }
                                    onClick={() =>
                                        navigate({
                                            to: "/orders",
                                            search: {
                                                ...search,
                                                today: String(new Date()),
                                            },
                                        })
                                    }
                                    size={"sm"}
                                    type="button"
                                >
                                    Bugungi
                                </Button>
                                <Button size={"sm"} type="button">
                                    Oxirgi oy
                                </Button>
                                <ParamDateRange
                                    addButtonProps={{ size: "sm" }}
                                />
                            </div>

                            <ParamTabs options={orderTabs} />
                        </div>
                    </div>
                }
            />

            <Modal
                modalKey={ORDERS}
                size="max-w-5xl"
                classNameTitle={"font-medium text-xl "}
                title={
                    currentStaff?.id ?
                        "Buyurtma tahrirlash"
                        : "Buyurtma qo'shish"
                }
            >
                <div className=" max-h-[80vh] overflow-y-auto no-scrollbar-x p-0.5">
                    <AddOrder />
                </div>
            </Modal>
            <DeleteModal path={ORDERS} id={currentStaff?.id} />
        </div>
    )
}

export default OrdersMain
