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
import { AddOrder } from "./create"

import ParamInput from "@/components/as-params/input"

const OrdersMain = () => {
    const navigate = useNavigate()
    const search = useSearch({ from: "/_main/orders/" })
    const { openModal: createOrder } = useModal("create")
    const { openModal: deleteOrder } = useModal("delete")
    const { setData, getData, clearKey } = useGlobalStore()
    const { data, isLoading } = useGet<ListResponse<OrderRow>>(ORDERS, {
        params: search
    })

    const orderTabs = [
        {
            value: "1",
            label: "Doimiy"
        },
        {
            value: "2",
            label: "Qo'shimcha"
        }
    ]


    const currentStaff = getData<OrderRow>(ORDERS)


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

    function setToday(navigate: any, search: any) {
        navigate({
            to: "/orders",
            search: {
                ...search,
                today: new Date().toISOString().split("T")[0],
                from: undefined,
                to: undefined,
            },
        });
    }

    function setLastMonth(navigate: any, search: any) {
        const now = new Date();
        const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const last = new Date(now.getFullYear(), now.getMonth(), 0);

        navigate({
            to: "/orders",
            search: {
                ...search,
                today: undefined,
                from: first.toISOString().split("T")[0],
                to: last.toISOString().split("T")[0],
            },
        });
    }


    return (
        <div>
            <DataTable
                loading={isLoading}
                numeration
                columns={cols()}
                data={data?.results}
                onEdit={(row) => handleEdit(row.original)}
                // loading={isLoading}
                onDelete={(row) => handleDelete(row.original)}
                head={
                    <div className="flex  items-center justify-between gap-3 mb-3">
                        <ParamInput className="w-lg" name="company_name"/>

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
                                    onClick={() => setToday(navigate, search)

                                    }
                                    size={"sm"}
                                    type="button"
                                >
                                    Bugungi
                                </Button>
                                <Button variant={
                                    search?.from && search?.to
                                        ? "default"
                                        : "outline"
                                }

                                    onClick={() => setLastMonth(navigate, search)}
                                    size={"sm"} type="button">
                                    Oxirgi oy
                                </Button>
                                <ParamDateRange
                                    addButtonProps={{ size: "sm" }}
                                />
                            </div>

                            <ParamTabs options={orderTabs} paramName="type" />
                        </div>
                    </div>
                }
            />

            <Modal
                modalKey="create"
                size="max-w-5xl"
                classNameTitle={"font-medium text-xl "}
                title={
                    currentStaff?.uuid ?
                        "Buyurtma tahrirlash"
                        : "Buyurtma qo'shish"
                }
            >
                <div className=" max-h-[80vh] overflow-y-auto no-scrollbar-x p-0.5">
                    <AddOrder />
                </div>
            </Modal>
            <DeleteModal path={ORDERS} id={currentStaff?.uuid} />
        </div>
    )
}

export default OrdersMain
