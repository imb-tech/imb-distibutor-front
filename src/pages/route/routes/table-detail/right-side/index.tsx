import ParamTabs from "@/components/as-params/tabs"
import { useSearch } from "@tanstack/react-router"
import InfoTable from "./info-table"
import { ProductTable } from "./product-table"

interface RightSideCarsType {
    info: CarsTypeInOrders["info"]
    products: CarsTypeInOrders["products"]
}

export const RightSideCars = ({ info, products }: RightSideCarsType) => {
    const { tabs } = useSearch({ from: "/_main/route/" })

    return (
        <div>
            <ParamTabs
                className={"w-full mb-3"}
                paramName="tabs"
                options={options}
            />
            {tabs === "product" ?
                <ProductTable products={products} />
            :   <InfoTable info={info} />}
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
