import ParamTabs from "@/components/as-params/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useSearch } from "@tanstack/react-router"
import InfoTable from "./info-table"
import { ProductTable } from "./product-table"
interface CarDetailsRowProps {
    car: CarsTypeInOrders
}

export const CarDetailsRow = ({ car }: CarDetailsRowProps) => {
    const { tabs } = useSearch({ from: "/_main/route/" })
    return (
        <div className="py-3 px-2">
            <div>
                <h1 className=" text-xl mb-4 flex items-center gap-2">
                    Do'konlar
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  ">
                <Card>
                    <CardContent>
                        <div className="space-y-4">
                            {car?.shop?.map((sh, idx) => (
                                <div key={idx} className="space-y-3">
                                    <h1 className="font-[500] text-lg">{sh}</h1>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <ParamTabs className={"w-full mb-3"} paramName="tabs" options={options} />
                    {tabs === "product" ?
                        <ProductTable products={car.products} />
                    :   <InfoTable info={car.info} />}
                </div>
            </div>
        </div>
    )
}

const options = [
    {
        value: "info",
        label: "Ma'lumotlar",
        className:"!w-full"
    },
    {
        value: "product",
        label: "Mahsulotlar",
        className:"!w-full"
    },
]
