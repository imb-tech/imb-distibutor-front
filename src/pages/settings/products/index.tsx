import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { DataTable } from "@/components/ui/datatable"
import { SETTINGS_PRODUCTS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import TableHeader from "../table-header"
import AddProductModal from "./add-modal"
import { useoColumns } from "./cols"

const productData = [
    {
        id: 1,
        product_name: "Cola 0.33ml",
        note: "-",
        measurement_type: "dona",
        quantity: "100",
        price_uz: "750 000",
        total_uz: "750 000",
    },
]

const Products = () => {
    const { getData, setData } = useGlobalStore()
    const item = getData<ProductsType>(SETTINGS_PRODUCTS)
    const { isLoading } = useGet<ProductsType>(SETTINGS_PRODUCTS)

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
    const columns = useoColumns()

    return (
        <div>
            <DataTable
                data={productData}
                columns={columns}
                onDelete={handleDelete}
                onEdit={({ original }) => handleEdit(original)}
                head={
                    <TableHeader
                        fileName="Mahsulotlar"
                        url="excel"
                        storeKey={SETTINGS_PRODUCTS}
                    />
                }
            />
            <Modal
                size="max-w-2xl"
                title={`Mahsulot ${item?.id ? "tahrirlash" : "qo'shish"}`}
                modalKey="create"
            >
                <AddProductModal />
            </Modal>
            <DeleteModal path={SETTINGS_PRODUCTS} id={item?.id} />
        </div>
    )
}

export default Products
