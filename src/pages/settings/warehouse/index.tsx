// import DeleteModal from "@/components/custom/delete-modal"
// import Modal from "@/components/custom/modal"
// import { DataTable } from "@/components/ui/datatable"
// import { SETTINGS_FORWARDERS } from "@/constants/api-endpoints"
// import { useGet } from "@/hooks/useGet"
// import { useModal } from "@/hooks/useModal"
// import { useGlobalStore } from "@/store/global-store"
// import TableHeader from "../table-header"
 

 

// const  Warehouse = () => {
//     const { data } = useGet<ForwardersType>(SETTINGS_FORWARDERS)
//     const { getData, setData } = useGlobalStore()
//     const item = getData<ForwardersType>(SETTINGS_FORWARDERS)

//     const { openModal: openDeleteModal } = useModal("delete")
//     const { openModal: openCreateModal } = useModal(`create`)
//     const columns = useColumnsForwardersTable()

//     const handleDelete = (row: { original: ForwardersType }) => {
//         setData(SETTINGS_FORWARDERS, row.original)
//         openDeleteModal()
//     }
//     const handleEdit = (item: ForwardersType) => {
//         setData(SETTINGS_FORWARDERS, item)
//         openCreateModal()
//     }
//     return (
//         <>
//             <DataTable
//                 columns={columns}
//                 data={forwardersData}
//                 onDelete={handleDelete}
//                 onEdit={({ original }) => handleEdit(original)}
//                 numeration={true}
//                 head={
//                     <TableHeader
//                         fileName="Haydovchilar"
//                         url="excel"
//                         storeKey={SETTINGS_FORWARDERS}
//                     />
//                 }
//             />
//             <DeleteModal path={SETTINGS_FORWARDERS} id={item?.id} />
//             <Modal
//                 size="max-w-2xl"
//                 title={item?.id ? "Tahrirlash" : "Qo'shish"}
//                 modalKey="create"
//             >
//                 <AddForwarderModal />
//             </Modal>
//         </>
//     )
// }

// export default  Warehouse
