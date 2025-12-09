
import { DataTable } from "@/components/ui/datatable";
import { cols } from "./cols";
import ParamsInput from '../../components/as-params/input'
import ParamTabs from "@/components/as-params/tabs";
import { orderTabs } from "./constants";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useGlobalStore } from "@/store/global-store";
import Modal from "@/components/custom/modal";
import { AddOrder } from "./create";
import ParamDateRange from "@/components/as-params/date-picker-range";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useGet } from "@/hooks/useGet";
import { ORDERS } from "@/constants/api-endpoints";
import DeleteModal from "@/components/custom/delete-modal";





const orders: OrderRow[] = [
    {
        reys_kodi: "R000007",
        id_buyurtma: "1234",
        sana: "12.02.2025",
        haydovchi: "Tohirbek Nazarov",
        avto_raqami: "01 154 JNA",
        ekspeditor: "Murodov tolib",
        mijoz: 'OOO “Montella grrouo"',
        manzil: "Toshkent shaxar Yashnobod",
        eslatma: "Pul olish kerak",
        status: "Jarayonda",
        vaqt: "2025.09.16 13:50",
        kontakt_nomi: "Umar aka",
        rad_sababi: "-",
        ogirlik: "2300",
        ish_dan: "10:00",
        ish_gacha: "07:00",
        tushirish_vaqti: "30 min",
        yuk_jonatuvchi: "IMb-truck",
        sana_marshrut: "2025.09.16",
        uzunlik: "69.2707583",
        kenglik: "69.2707583",
        reys_hududi: "Yunusobod 1",
        kuzatuv_id: "c9545878-e18c-452e-b10d-f76fa5f7568b",
        tolov_summasi: "50000",
        hajm: "0",
        yetkazib_beruvchi: "IMB_truck",
        yetib_keldi: "2025.09.16 13:49",
        ustuvorlik: "Yuqori",
        ombor_manzili: "Uzbekistan",
        logist: "Aris Chimbayev",
        yaratilgan_vaqt: "2025.09.15 02:01",
        kuzatuv_link:
            "https://live.track-pod.com/ru/c9545878-e18c-452e-b10d-f76fa5f7568b?src=1",
        telefon: "+998909084402",
        ketdi: "2025.09.16 13:50",
        qabul_tolov: "5000",
        hayd_eslatma: "Пул олинди",
        email: "ach58364@gmail.com",
        eta_vaqti: "-",
        tugallanish: "2025.09.15 18:41",
        boshlash: "-",
        faoliyat: "-",
    },
];
const allData = Array.from({ length: 25 }, (_, i) => ({
    ...orders[i % orders.length],
}));




const OrdersMain = () => {
    const navigate = useNavigate()
    const search = useSearch({ from: "/_main/orders/" })

    const { openModal: createOrder } = useModal(ORDERS)
    const { openModal: deleteOrder } = useModal("delete")
    const { setData, getData, clearKey } = useGlobalStore();
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
                        <ParamsInput className="w-lg" />

                        <div className="flex justify-between items-center gap-4 ">
                            <Button onClick={handleCreate}> Buyurtma qo'shish +</Button>

                            <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                                <Button variant={!!search?.today ? "default" : "outline"} onClick={() => navigate({ to: "/orders", search: { ...search, today: String(new Date()) } })} size={"sm"} type="button">
                                    Bugungi
                                </Button>
                                <Button size={"sm"} type="button">
                                    Oxirgi oy
                                </Button>
                                <ParamDateRange addButtonProps={{ size: "sm" }} />
                            </div>

                            <ParamTabs options={orderTabs} />
                        </div>
                    </div>
                }
            />

            <Modal modalKey={"order_create"} size="max-w-5xl" title={currentStaff?.id ? "Yangilash" : "Yaratish"}>
                <div className=" max-h-[80vh] overflow-y-auto no-scrollbar-x p-0.5"><AddOrder /></div>
            </Modal>
            <DeleteModal path={ORDERS} id={currentStaff?.id} />
        </div>
    );
};

export default OrdersMain;
