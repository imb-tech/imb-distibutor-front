import { useAdditionColumns } from "@/pages/route/orders-window/addition-cols"
import { useConstantColumns } from "@/pages/route/orders-window/constant-cols"
import { useSearch } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { CloudCog } from "lucide-react"
import { useMemo } from "react"


export const useRouteColumns = () => {
  const search = useSearch({ from: "/_main/route/" })
  const type = search.type
  console.log(type);
  

  const constantCols = useConstantColumns()
  const additionCols = useAdditionColumns()

  return useMemo<ColumnDef<any>[]>(() => {
    if (type === "2") return additionCols
    return constantCols 
  }, [type, constantCols, additionCols])
}
