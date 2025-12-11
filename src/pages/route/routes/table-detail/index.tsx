import { LeftSideCars } from "./left-side"
import { RightSideCars } from "./right-side"
interface CarDetailsRowProps {
    car: CarsTypeInOrders
}

export const CarDetailsRow = ({ car }: CarDetailsRowProps) => {
    return (
        <div className="py-3 px-2">
            <div>
                <h1 className=" text-xl mb-4 flex items-center gap-2">
                    Do'konlar
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  ">
                <LeftSideCars shop={car?.shop} />
                <RightSideCars products={car?.products} info={car?.info} />
            </div>
        </div>
    )
}
