import { DataTable } from "@/components/ui/datatable"
import { RowSelectionState } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { useColumnsOrderTable } from "./order-cols"

interface ModalOrderTableType {
    routes: OrderRoutesType[]
    onSelectedRowsChange?: (selectedRows: OrderRoutesType[]) => void
}

const ModalOrderTable = ({
    routes,
    onSelectedRowsChange,
}: ModalOrderTableType) => {
    const columns = useColumnsOrderTable()
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(
        {},
    )


    const preselectedRowSelection = useMemo<RowSelectionState>(() => {
        if (!routes?.length) return {}
        return Object.fromEntries(routes.map((r) => [String(r.id), true]))
    }, [routes])

    useEffect(() => {
        setRowSelection(preselectedRowSelection)
    }, [preselectedRowSelection])

console.log(routes);

     
    return (
        <DataTable
            columns={columns}
            data={routes || []}
            viewAll={true}
            selecteds_row={true}
            height="h-[30vh]"
            onSelectedRowsChange={onSelectedRowsChange}
            controlledRowSelection={rowSelection}
        />
    )
}

export default ModalOrderTable
