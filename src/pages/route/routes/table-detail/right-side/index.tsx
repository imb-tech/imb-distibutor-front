import ParamTabs from "@/components/as-params/tabs"
import { ORDERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import InfoTable from "./info-table"
import { ProductTable } from "./product-table"

interface RightSideCarsType {
    uuid: string
}

export const RightSideCars = ({ uuid }: RightSideCarsType) => {
    const { data } = useGet(`${ORDERS}/${uuid}`)
    const { tabs } = useSearch({ from: "/_main/route/" })

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
