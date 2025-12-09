import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { DataTable } from "@/components/ui/datatable"
import { SETTINGS_DRIVERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import TableHeader from "../table-header"
import AddDriverModal from "./add-driver"
import { useColumnsDriverTable } from "./drivers-cols"

const driversData: DriversType[] = [
    {
        id: 1,
        full_name: "Aliyev Shavkat Karimovich",
        phone_number: "+998901112233",
        passport_series: "AA1234567",
        jshshir: "12345678901234",
        driver_license: "B, C",
        license_number: "DL001122",
        working_stage: "5 yil",
        company_id: 1,
        login: "shavkat.aliyev",
        parol: "parol123",
        activity: "active",
    },
    {
        id: 2,
        full_name: "Tursunov Javlon Mirzayevich",
        phone_number: "+998903334455",
        passport_series: "AB7654321",
        jshshir: "23456789012345",
        driver_license: "B",
        license_number: "DL003344",
        working_stage: "3 yil",
        company_id: 1,
        login: "javlon.tursunov",
        parol: "parol123",
        activity: "active",
    },
    {
        id: 3,
        full_name: "Qodirova Mahliyo Saidovna",
        phone_number: "+998907778899",
        passport_series: "AC1122334",
        jshshir: "34567890123456",
        driver_license: "B",
        license_number: "DL005566",
        working_stage: "2 yil",
        company_id: 2,
        login: "mahliyo.qodirova",
        parol: "parol123",
        activity: "inactive",
    },
    {
        id: 4,
        full_name: "Rahmonov Doston Shuxratovich",
        phone_number: "+998997771100",
        passport_series: "AD2211443",
        jshshir: "45678901234567",
        driver_license: "B, D",
        license_number: "DL008899",
        working_stage: "7 yil",
        company_id: 2,
        login: "doston.rahmonov",
        parol: "parol123",
        activity: "active",
    },
    {
        id: 5,
        full_name: "Sattorov Alisher Bekzodovich",
        phone_number: "+998935551122",
        passport_series: "AE3344556",
        jshshir: "56789012345678",
        driver_license: "C",
        license_number: "DL009911",
        working_stage: "4 yil",
        company_id: 1,
        login: "alisher.sattorov",
        parol: "parol123",
        activity: "active",
    },
    {
        id: 6,
        full_name: "Xudoyberdiyev Dilshod Akramovich",
        phone_number: "+998933221100",
        passport_series: "AF6677889",
        jshshir: "67890123456789",
        driver_license: "B, C, D",
        license_number: "DL011233",
        working_stage: "10 yil",
        company_id: 3,
        login: "dilshod.xudoyberdiyev",
        parol: "parol123",
        activity: "active",
    },
    {
        id: 7,
        full_name: "Ortiqova Madina Farhodovna",
        phone_number: "+998934442233",
        passport_series: "AG8899001",
        jshshir: "78901234567890",
        driver_license: "B",
        license_number: "DL014455",
        working_stage: "1 yil",
        company_id: 2,
        login: "madina.ortiqova",
        parol: "parol123",
        activity: "inactive",
    },
    {
        id: 8,
        full_name: "Yoqubov Sherzod Murodovich",
        phone_number: "+998936667788",
        passport_series: "AH9900112",
        jshshir: "89012345678901",
        driver_license: "C, D",
        license_number: "DL017788",
        working_stage: "6 yil",
        company_id: 3,
        login: "sherzod.yoqubov",
        parol: "parol123",
        activity: "active",
    },
    {
        id: 9,
        full_name: "Karimova Nilufar Ulug‘bek qizi",
        phone_number: "+998937771144",
        passport_series: "AI2233445",
        jshshir: "90123456789012",
        driver_license: "B",
        license_number: "DL019900",
        working_stage: "2 yil",
        company_id: 1,
        login: "nilufar.karimova",
        parol: "parol123",
        activity: "active",
    },
    {
        id: 10,
        full_name: "Sodiqov Umar Rustamovich",
        phone_number: "+998939998877",
        passport_series: "AJ5566778",
        jshshir: "01234567890123",
        driver_license: "B, C",
        license_number: "DL022233",
        working_stage: "8 yil",
        company_id: 3,
        login: "umar.sodiqov",
        parol: "parol123",
        activity: "active",
    },
]

const Drivers = () => {
    const { data } = useGet<DriversType>(SETTINGS_DRIVERS)
    const { getData, setData } = useGlobalStore()
    const item = getData<DriversType>(SETTINGS_DRIVERS)

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal: openCreateModal } = useModal(`create`)
    const columns = useColumnsDriverTable()

    const handleDelete = (row: { original: DriversType }) => {
        setData(SETTINGS_DRIVERS, row.original)
        openDeleteModal()
    }
    const handleEdit = (item: DriversType) => {
        setData(SETTINGS_DRIVERS, item)
        openCreateModal()
    }
    return (
        <>
            <DataTable
                columns={columns}
                data={driversData}
                onDelete={handleDelete}
                onEdit={({ original }) => handleEdit(original)}
                head={
                    <TableHeader
                        fileName="Eksp"
                        url="excel"
                        storeKey={SETTINGS_DRIVERS}
                    />
                }
            />
            <DeleteModal path={SETTINGS_DRIVERS} id={item?.id} />
            <Modal
                size="max-w-2xl"
                title={item?.id ? "Tahrirlash" : "Qo'shish"}
                modalKey="create"
            >
                <AddDriverModal />
            </Modal>
        </>
    )
}

export default Drivers
