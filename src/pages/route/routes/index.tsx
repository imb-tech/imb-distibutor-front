import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { ORDERS, ORDERS_WINDOW } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { AddOrder } from "@/pages/orders/create"
import { useGlobalStore } from "@/store/global-store"
import { useSearch } from "@tanstack/react-router"
import { useAdditionColumns } from "./addition-cols"
import { useConstantColumns } from "./constant-cols"
import HeaderRoute from "./header"

export const constantOrders: RouteConstant[] = [
    {
        orderId: "1234",
        date: "2025-09-12",
        warehouse: "Zalina Montella",
        customerOrg: "Smart",
        address: "77Q3+R47, Ташкент, Tashkent, Узбекистан",
        region: "Yunusobod 1",
        phone: "+998909084402",
        workTime: "8:00-22:00",
        note: "Pul olish kerak",
        priorityTransport: "Damas Van",
        unloadTime: "30 min",
        cashPayment: "750 000 so'm",
        weightKg: "1200",
        productCount: "10",
        volumeM3: "0",
        contact_name: "Usmon aka",
    },
]

const additionOrders: RouteAddition[] = [
    {
        orderId: "5678",
        date: "12.12.2025",
        warehouse: "Ombor 1",
        customerOrg: "OOO “Montella group”",
        address: "Toshkent, Yashnobod",
        region: "Chilonzor",
        phone: "+998901234567",
        note: "Tez yetkazib berish kerak",
        priorityTransport: "Yuqori",
        unloadTime: "Naqd",
        cashPayment: "75000",
        weightKg: "1500",
        productCount: "Elektr jihozlari",
        volumeM3: "3",
    },
]

type RouteRow = RouteConstant | RouteAddition

function RoutesMain() {
    const search = useSearch({ from: "/_main/route/" })
    const { type } = search
    const { openModal: createOrder } = useModal(ORDERS)
    const { openModal: deleteOrder } = useModal("delete")
    const { setData, getData } = useGlobalStore()
    const currentStaff = getData<RouteRow>(ORDERS_WINDOW)
    const { isLoading } = useGet<RouteRow>(ORDERS_WINDOW, {
        params: search,
    })

    const handleDelete = (item: RouteRow) => {
        setData<RouteRow>(ORDERS_WINDOW, item)
        deleteOrder()
    }

    const handleEdit = (item: RouteRow) => {
        setData(ORDERS_WINDOW, item)
        createOrder()
    }

    const data = type === "addition" ? additionOrders : constantOrders

    const allData = Array.from({ length: 25 }, (_, i) => ({
        ...data[i % data.length],
    }))

    const columns: any =
        type === "addition" ? useAdditionColumns() : useConstantColumns()

    return (
        <Card>
            <CardContent>
                <HeaderRoute />
                <DataTable
                    numeration
                    columns={columns}
                    // loading={isLoading}
                    data={allData}
                    onEdit={(row) => handleEdit(row.original)}
                    onDelete={(row) => handleDelete(row.original)}
                />

                <Modal
                    modalKey={ORDERS}
                    size="max-w-5xl"
                    title={currentStaff?.orderId ? "Tahrirlash" : "Yaratish"}
                >
                    <div className=" max-h-[80vh] overflow-y-auto no-scrollbar-x p-0.5">
                        <AddOrder />
                    </div>
                </Modal>
                <DeleteModal path={ORDERS_WINDOW} id={currentStaff?.orderId} />
            </CardContent>
        </Card>
    )
}

export default RoutesMain
