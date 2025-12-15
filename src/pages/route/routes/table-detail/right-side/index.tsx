import ParamTabs from "@/components/as-params/tabs"
import { ORDERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import InfoTable from "./info-table"
import { ProductTable } from "./product-table"

export const RightSideCars = () => {
    const { tabs, order_id } = useSearch({ from: "/_main/route/" })

    const { data } = useGet(`${ORDERS}/${order_id}`)

    return (
        <div>
            <ParamTabs
                className={"w-full mb-3"}
                paramName="tabs"
                options={options}
            />
            {tabs === "product" ?
                <ProductTable products={data?.loads} />
            :   <InfoTable info={data?.client_data} />}
        </div>
    )
}

const options = [
    {
        value: "info",
        label: "Ma'lumotlar",
        className: "!w-full",
    },
    {
        value: "product",
        label: "Mahsulotlar",
        className: "!w-full",
    },
]
