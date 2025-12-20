import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { ROUTE_ASSIGNE_ORDERS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import { RowSelectionState } from "@tanstack/react-table"
import { Plus } from "lucide-react"
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
    const { openModal: openOrderListModal } = useModal("order-list")
    const columns = useColumnsOrderTable()
    const { setData } = useGlobalStore()
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

    const handleModalOpen = () => {
        const orderIds = routes.map((route) => route.order)
        setData(ROUTE_ASSIGNE_ORDERS, orderIds)
        openOrderListModal()
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-end justify-end mb-4">
                <Button type="button" onClick={handleModalOpen}>
                    <Plus size={16} />
                    Yaratish
                </Button>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden ">
                <DataTable
                    columns={columns}
                    data={routes || []}
                    viewAll={true}
                    selecteds_row
                    height="100%"
                    onSelectedRowsChange={onSelectedRowsChange}
                    controlledRowSelection={rowSelection}
                    className="min-w-[700px]"
                    wrapperClassName="h-full"
                    tableWrapperClassName="h-full overflow-auto"
                />
            </div>
        </div>
    )
}

export default ModalOrderTable
