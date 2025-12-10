import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { DataTable } from "@/components/ui/datatable"
import { SETTINGS_LOGISTICIANS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import TableHeader from "../table-header"
import AddLogisticansModal from "./add-logisticians"
import { useColumnsLogisticiansTable } from "./logisticians-cols"

const Logisticians = () => {
    const { data } = useGet<LogisticiansType>(SETTINGS_LOGISTICIANS)
    const { getData, setData } = useGlobalStore()
    const item = getData<LogisticiansType>(SETTINGS_LOGISTICIANS)

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal: openCreateModal } = useModal(`create`)
    const columns = useColumnsLogisticiansTable()

    const handleDelete = (row: { original: LogisticiansType }) => {
        setData(SETTINGS_LOGISTICIANS, row.original)
        openDeleteModal()
    }
    const handleEdit = (item: LogisticiansType) => {
        setData(SETTINGS_LOGISTICIANS, item)
        openCreateModal()
    }
    return (
        <>
            <DataTable
                columns={columns}
                data={logisticiansData}
                onDelete={handleDelete}
                onEdit={({ original }) => handleEdit(original)}
                numeration={true}
                head={
                    <TableHeader
                        fileName="Logistlar"
                        url="excel"
                        storeKey={SETTINGS_LOGISTICIANS}
                    />
                }
            />
            <DeleteModal path={SETTINGS_LOGISTICIANS} id={item?.id} />
            <Modal
                size="max-w-2xl"
                title={item?.id ? "Tahrirlash" : "Qo'shish"}
                modalKey="create"
            >
                <AddLogisticansModal />
            </Modal>
        </>
    )
}

export default Logisticians

const logisticiansData: LogisticiansType[] = [
    {
        id: 1,
        full_name: "Jahongir Sattorov",
        phone_number: "+998901001001",
        working_warehouse: "Toshkent Markaziy Ombori",
    },
    {
        id: 2,
        full_name: "Madina Ortiqova",
        phone_number: "+998901001002",
        working_warehouse: "Chilonzor Ombori",
    },
    {
        id: 3,
        full_name: "Azizbek Shodiyev",
        phone_number: "+998901001003",
        working_warehouse: "Sergeli Katta Ombor",
    },
    {
        id: 4,
        full_name: "Dilshodbek Abduqodirov",
        phone_number: "+998901001004",
        working_warehouse: "Yashnobod Logistika Ombori",
    },
    {
        id: 5,
        full_name: "Nigora Xolmatova",
        phone_number: "+998901001005",
        working_warehouse: "Olmazor Ombori",
    },
    {
        id: 6,
        full_name: "Sirojiddin Qodirov",
        phone_number: "+998901001006",
        working_warehouse: "Bektemir Sanoat Ombori",
    },
    {
        id: 7,
        full_name: "Xurshida Nazarova",
        phone_number: "+998901001007",
        working_warehouse: "Chirchiq Ombori",
    },
    {
        id: 8,
        full_name: "Shohruh Karimov",
        phone_number: "+998901001008",
        working_warehouse: "Angren Logistika Ombori",
    },
    {
        id: 9,
        full_name: "Malika To‘laganova",
        phone_number: "+998901001009",
        working_warehouse: "Samarqand Markaziy Ombori",
    },
    {
        id: 10,
        full_name: "Bekzod Usmonov",
        phone_number: "+998901001010",
        working_warehouse: "Farg‘ona Viloyat Ombori",
    },
]
