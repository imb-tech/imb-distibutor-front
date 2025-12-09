import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { DataTable } from "@/components/ui/datatable"
import { SETTINGS_WAREHOUSE } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import TableHeader from "../table-header"
import { useColumnsWarehouseTable } from "./warehouse-cols"
import AddWarehouse from "./add-warehouse"

const Warehouse = () => {
    const { data } = useGet<WarehouseType>(SETTINGS_WAREHOUSE)
    const { getData, setData } = useGlobalStore()
    const item = getData<WarehouseType>(SETTINGS_WAREHOUSE)

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal: openCreateModal } = useModal(`create`)
    const columns = useColumnsWarehouseTable()

    const handleDelete = (row: { original: WarehouseType }) => {
        setData(SETTINGS_WAREHOUSE, row.original)
        openDeleteModal()
    }
    const handleEdit = (item: WarehouseType) => {
        setData(SETTINGS_WAREHOUSE, item)
        openCreateModal()
    }
    return (
        <>
            <DataTable
                columns={columns}
                data={warehousesData}
                onDelete={handleDelete}
                onEdit={({ original }) => handleEdit(original)}
                numeration={true}
                head={
                    <TableHeader
                        fileName="Ombor"
                        url="excel"
                        storeKey={SETTINGS_WAREHOUSE}
                    />
                }
            />
            <DeleteModal path={SETTINGS_WAREHOUSE} id={item?.id} />
            <Modal
                size="max-w-2xl"
                title={item?.id ? "Tahrirlash" : "Qo'shish"}
                modalKey="create"
            >
                <AddWarehouse/>
            </Modal>
        </>
    )
}

export default Warehouse



const warehousesData: WarehouseType[] = [
  {
    id: 1,
    address: "Toshkent shahri, Chilonzor 15-daha",
    latitude: 41.28567,
    longtitude: 69.20345,
    map_location: "41.28567, 69.20345",
    location: "Chilonzor Ombori"
  },
  {
    id: 2,
    address: "Toshkent shahri, Sergeli tumani, 7-mavze",
    latitude: 41.21124,
    longtitude: 69.22189,
    map_location: "41.21124, 69.22189",
    location: "Sergeli Katta Ombor"
  },
  {
    id: 3,
    address: "Toshkent shahri, Yashnobod tumani, Maxtumquli ko‘chasi",
    latitude: 41.31220,
    longtitude: 69.34800,
    map_location: "41.31220, 69.34800",
    location: "Yashnobod Logistika Ombori"
  },
  {
    id: 4,
    address: "Toshkent shahri, Olmazor tumani, Beruniy metro yaqinida",
    latitude: 41.34550,
    longtitude: 69.20310,
    map_location: "41.34550, 69.20310",
    location: "Olmazor Ombori"
  },
  {
    id: 5,
    address: "Toshkent shahri, Bektemir tumani, Industrial zona",
    latitude: 41.23210,
    longtitude: 69.32770,
    map_location: "41.23210, 69.32770",
    location: "Bektemir Sanoat Ombori"
  },
  {
    id: 6,
    address: "Toshkent viloyati, Chirchiq shahri, Kimyogarlar ko‘chasi",
    latitude: 41.46890,
    longtitude: 69.58210,
    map_location: "41.46890, 69.58210",
    location: "Chirchiq Ombori"
  },
  {
    id: 7,
    address: "Toshkent viloyati, Angren shahri, Logistika markazi",
    latitude: 41.01012,
    longtitude: 70.14329,
    map_location: "41.01012, 70.14329",
    location: "Angren Logistika Ombori"
  },
  {
    id: 8,
    address: "Samarqand shahri, Konigil yo‘li",
    latitude: 39.65021,
    longtitude: 66.97551,
    map_location: "39.65021, 66.97551",
    location: "Samarqand Markaziy Ombori"
  },
  {
    id: 9,
    address: "Buxoro shahri, G‘ijduvon yo‘li",
    latitude: 39.76844,
    longtitude: 64.45520,
    map_location: "39.76844, 64.45520",
    location: "Buxoro Ombori"
  },
  {
    id: 10,
    address: "Farg‘ona shahri, Qo‘qon yo‘li",
    latitude: 40.38412,
    longtitude: 71.78655,
    map_location: "40.38412, 71.78655",
    location: "Farg‘ona Viloyat Ombori"
  }
];






