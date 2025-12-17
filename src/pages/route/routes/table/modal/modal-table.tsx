import { DataTable } from "@/components/ui/datatable"
import { useColumnsOrderTable } from "./order-cols"

interface ModalOrderTableType {
    routes: OrderRoutesType[]
}

const ModalOrderTable = ({ routes }: ModalOrderTableType) => {
    const columns = useColumnsOrderTable()
    return (
        <>
            <DataTable
                columns={columns}
                data={routes}
                viewAll={true}
                selecteds_row={true}
                height="h-[30vh]"
                onSelectedRowsChange={(item)=>console.log(item.map(el=>el.id))
                }
            />
        </>
    )
}

export default ModalOrderTable
