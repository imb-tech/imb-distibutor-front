import { Card, CardContent } from "@/components/ui/card"


interface LeftSideCarsType{
    shop:CarsTypeInOrders["shop"]

}

export const LeftSideCars = ({shop}:LeftSideCarsType) => {
    return (
        <Card>
            <CardContent>
                <div className="space-y-4">
                    {shop?.map((sh, idx) => (
                        <div key={idx} className="space-y-3">
                            <h1 className="font-[500] text-lg">{sh}</h1>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
