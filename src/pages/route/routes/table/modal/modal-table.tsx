import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { useModal } from "@/hooks/useModal"
import { RowSelectionState } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useColumnsOrderTable } from "./order-cols"
import { useGlobalStore } from "@/store/global-store"
import { ROUTE_ASSIGNE_ORDERS } from "@/constants/api-endpoints"

interface ModalOrderTableType {
    routes: OrderRoutesType[]
    onSelectedRowsChange?: (selectedRows: OrderRoutesType[]) => void
}

const ModalOrderTable = ({
    routes,
    onSelectedRowsChange,
}: ModalOrderTableType) => {
    const { openModal: openOrderListModal } = useModal("order-list")
    const columns = useColumnsOrderTable()
    const { setData, getData } = useGlobalStore()
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(
        {},
    )

    const preselectedRowSelection = useMemo<RowSelectionState>(() => {
        if (!routes?.length) return {}
        return Object.fromEntries(routes.map((r) => [String(r.order), true]))
    }, [routes])

    useEffect(() => {
        setRowSelection(preselectedRowSelection)
    }, [preselectedRowSelection])

    const handleModalOpen = () => {
        // Store only the order IDs, not the entire route objects
        const orderIds = routes.map(route => route.order)
        setData(ROUTE_ASSIGNE_ORDERS, orderIds)
        openOrderListModal()
    }

    return (
        <div>
            <div className="flex items-end justify-end">
                <Button type="button" onClick={handleModalOpen}>
                    <Plus size={16} />
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={routes || []}
                viewAll={true}
                selecteds_row
                height="h-[10vh]"
                onSelectedRowsChange={onSelectedRowsChange}
                controlledRowSelection={rowSelection}
                className="min-w-[700px]"
            />
        </div>
    )
}

export default ModalOrderTable