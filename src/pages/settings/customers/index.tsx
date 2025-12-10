import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { DataTable } from "@/components/ui/datatable"
import { SETTINGS_CUSTOMERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import TableHeader from "../table-header"
import AddCustomersModal from "./add-customers"
import { useColumnsCustomersTable } from "./customers-cols"

const Customers = () => {
    const { data } = useGet<CustomersType>(SETTINGS_CUSTOMERS)
    const { getData, setData } = useGlobalStore()
    const item = getData<CustomersType>(SETTINGS_CUSTOMERS)

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal: openCreateModal } = useModal(`create`)
    const columns = useColumnsCustomersTable()

    const handleDelete = (row: { original: CustomersType }) => {
        setData(SETTINGS_CUSTOMERS, row.original)
        openDeleteModal()
    }
    const handleEdit = (item: CustomersType) => {
        setData(SETTINGS_CUSTOMERS, item)
        openCreateModal()
    }
    return (
        <>
            <DataTable
                columns={columns}
                data={customersData}
                onDelete={handleDelete}
                onEdit={({ original }) => handleEdit(original)}
                numeration={true}
                head={
                    <TableHeader
                        fileName="Mijozlar"
                        url="excel"
                        storeKey={SETTINGS_CUSTOMERS}
                    />
                }
            />
            <DeleteModal path={SETTINGS_CUSTOMERS} id={item?.id} />
            <Modal
                size="max-w-2xl"
                title={item?.id ? "Tahrirlash" : "Qo'shish"}
                modalKey="create"
            >
                <AddCustomersModal />
            </Modal>
        </>
    )
}

export default Customers


const customersData: CustomersType[] = [
  {
    id: 1,
    full_name: "Shavkat Abdurahmonov",
    organization: "Mega Mebel Group",
    location: "Toshkent, Chilonzor 12",
    map_location: "41.28567, 69.20422",
    koordination: "41.28567N / 69.20422E",
    working_days: "Dush–Juma (09:00–18:00)",
    phone_number: "+998901112233",
    email: "sh.abdurahmonov@megamebel.uz",
  },
  {
    id: 2,
    full_name: "Nigora Tursunova",
    organization: "Comfort Style",
    location: "Toshkent, Sergeli 7-mavze",
    map_location: "41.21012, 69.22559",
    koordination: "41.21012N / 69.22559E",
    working_days: "Dush–Shanba (09:00–19:00)",
    phone_number: "+998901223344",
    email: "n.tursunova@comfort.uz",
  },
  {
    id: 3,
    full_name: "Javlonbek Jo‘rayev",
    organization: "Lux Furniture",
    location: "Toshkent, Yakkasaroy tumani",
    map_location: "41.29452, 69.25133",
    koordination: "41.29452N / 69.25133E",
    working_days: "Dush–Juma (10:00–18:00)",
    phone_number: "+998901334455",
    email: "info@luxfurniture.uz",
  },
  {
    id: 4,
    full_name: "Marjona Karimova",
    organization: "Elegant Mebel",
    location: "Toshkent, Olmazor tumani",
    map_location: "41.34550, 69.20310",
    koordination: "41.34550N / 69.20310E",
    working_days: "Sesh–Yakshanba (09:00–17:00)",
    phone_number: "+998901445566",
    email: "karimova@elegant.uz",
  },
  {
    id: 5,
    full_name: "Sardor O‘rinov",
    organization: "Soft Mebel",
    location: "Toshkent, Uchtepa tumani",
    map_location: "41.29920, 69.16400",
    koordination: "41.29920N / 69.16400E",
    working_days: "Dush–Juma (08:30–17:00)",
    phone_number: "+998901556677",
    email: "orinov@softmebel.uz",
  },
  {
    id: 6,
    full_name: "Muxlisa Abdullayeva",
    organization: "Smart Home Furniture",
    location: "Toshkent, Yunusobod 11-kvartal",
    map_location: "41.36780, 69.28050",
    koordination: "41.36780N / 69.28050E",
    working_days: "Dush–Shanba (10:00–20:00)",
    phone_number: "+998901667788",
    email: "abdullayeva@smarthome.uz",
  },
  {
    id: 7,
    full_name: "Sherzod Xaydarov",
    organization: "Modern Line",
    location: "Toshkent, Bektemir",
    map_location: "41.23210, 69.32770",
    koordination: "41.23210N / 69.32770E",
    working_days: "Dush–Juma (09:00–18:00)",
    phone_number: "+998901778899",
    email: "xaydarov@modernline.uz",
  },
  {
    id: 8,
    full_name: "Dilnoza Yuldasheva",
    organization: "Royal Furniture",
    location: "Toshkent, Mirzo Ulug‘bek tumani",
    map_location: "41.33810, 69.33480",
    koordination: "41.33810N / 69.33480E",
    working_days: "Sesh–Shanba (09:00–17:00)",
    phone_number: "+998901889900",
    email: "d.yuldasheva@royal.uz",
  },
  {
    id: 9,
    full_name: "Kamron Usmonov",
    organization: "Art Mebel",
    location: "Chirchiq shahri",
    map_location: "41.46890, 69.58210",
    koordination: "41.46890N / 69.58210E",
    working_days: "Dush–Juma (08:00–17:30)",
    phone_number: "+998907001122",
    email: "usmonov@artmebel.uz",
  },
  {
    id: 10,
    full_name: "Madina Shermatova",
    organization: "Premium Design",
    location: "Samarqand shahri",
    map_location: "39.65021, 66.97551",
    koordination: "39.65021N / 66.97551E",
    working_days: "Dush–Yakshanba (09:00–19:00)",
    phone_number: "+998907112233",
    email: "shermatova@premium.uz",
  }
]
