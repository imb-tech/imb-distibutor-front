import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InfoTable from "./info-table"
import { ProductTable } from "./product-table"
interface CarDetailsRowProps {
    car: CarsTypeInOrders
}

export const CarDetailsRow = ({ car }: CarDetailsRowProps) => {
    return (
        <div className="px-6 py-6 border-t dark:">
            <div>
                <h1 className=" text-[18px] mb-4 flex items-center gap-2">
                    Do'konlar
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  ">
                <Card className="border shadow-sm">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {car?.shop?.map((sh, idx) => (
                                <div key={idx} className="space-y-3">
                                    <h1 className="font-[500] text-[14px]">
                                        {sh}
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Tabs defaultValue="information">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="information">
                                Ma'lumotlar
                            </TabsTrigger>
                            <TabsTrigger value="products">
                                Mahsulotlar
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="information">
                            <Card className="border shadow-sm">
                                <CardContent className="pt-6">
                                    <InfoTable info={car.info} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="products">
                            <Card className="border shadow-sm">
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold mb-6 text-lg flex items-center gap-2"></h3>
                                    <ProductTable products={car.products} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
