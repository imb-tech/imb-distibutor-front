import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { DataTable } from "@/components/ui/datatable"
import { SETTINGS_PRODUCTS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import TableHeader from "../table-header"
import AddProductModal from "./add-modal"
import {  useoColumns } from "./cols"
import { productData } from "./table-data"
import { useGet } from "@/hooks/useGet"

const Products = () => {
    const {  getData, setData } = useGlobalStore()
    const item = getData<ProductsType>(SETTINGS_PRODUCTS)
    const {isLoading}=useGet(SETTINGS_PRODUCTS)

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal: openCreateModal } = useModal(`create`)
    const handleDelete = (row: { original: ProductsType }) => {
        setData(SETTINGS_PRODUCTS, row.original)
        openDeleteModal()
    }

    const handleEdit = (item: ProductsType) => {
        setData(SETTINGS_PRODUCTS, item)
        openCreateModal()
    }
    const columns =useoColumns()

    return (
        <>
            <div className="flex flex-col gap-[25px]">
                <DataTable
                    data={productData}
                    columns={columns}
                    onDelete={handleDelete}
                    onEdit={({ original }) => handleEdit(original)}
                    head={   <TableHeader
                    fileName="Mahsulotlar"
                    url="excel"
                    storeKey={SETTINGS_PRODUCTS}

                />}
                />
                <DeleteModal path={SETTINGS_PRODUCTS} id={item?.id} />
                <Modal title={item?.id? "Tahrirlash":"Qo'shish"} modalKey="create">
                    <AddProductModal />
                </Modal>
            </div>
        </>
    )
}

export default Products
