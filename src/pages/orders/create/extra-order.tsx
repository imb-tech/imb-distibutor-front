// order-products-section.tsx
import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { UseFormReturn } from "react-hook-form"
import { useGet } from "@/hooks/useGet"
import { SETTINGS_CUSTOMERS, SETTINGS_PAYMENT_TYPES } from "@/constants/api-endpoints"
import { MapComponent } from "./map"

type Props = {
    form: UseFormReturn<any>
}
type PaymentMethod = {
    id: number
    name: string
}
export const ExtraOrders = ({ form }: Props) => {
    const { data: clientsData } = useGet<ListResponse<CustomersType>>(SETTINGS_CUSTOMERS)
    const { data: paymentsData } = useGet<ListResponse<PaymentMethod>>(SETTINGS_PAYMENT_TYPES)
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 items-center">
                <FormInput
                    methods={form}
                    name="code"
                    placeholder="Buyurtma ID"
                    className="max-w-sm"
                />
                <div>
                    <FormDatePicker
                        className={"!w-full"}
                        control={form.control}
                        name="scheduled_delivery_date"
                        placeholder="Sanani tanlang"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <h2>Mijoz Tafsilotlari</h2>
                <div className="grid grid-cols-2 gap-4 items-center">

                    <FormCombobox
                        placeholder="Xaridor"
                        required
                        options={clientsData?.results}
                        name="client"
                        control={form.control}
                        className="w-full"
                    />


                    <FormCombobox
                        placeholder="Ustuvor transport"
                        required
                        options={[
                            { name: "Truck", id: 1 },
                            { name: "Van", id: 2 },
                            { name: "Box", id: 3 },
                        ]}
                        name="priority_vehicle"
                        control={form.control}
                        className="w-full"
                    />

                    <FormCombobox
                        placeholder="To'lov turi"
                        required
                        options={paymentsData?.results}
                        name="payment_type"
                        control={form.control}
                        className="w-full flex"
                    />

                    <FormInput
                        methods={form}
                        name="note"
                        placeholder="Eslatma"
                    />

                </div>
 <div>
    <MapComponent/>
 </div>
            </div>

            <div className="space-y-2">
                <h2>Yuk tavsilotlari</h2>

                <div className="grid grid-cols-2 gap-4">
                    <FormNumberInput
                        thousandSeparator={" "}
                        control={form.control}
                        name="weight"
                        placeholder="Og’irligi kg"
                    />

                    <FormNumberInput
                        thousandSeparator={" "}
                        control={form.control}
                        name="volume"
                        placeholder="Hajm m3"
                    />

                </div>
            </div>


        </div>
    )
}