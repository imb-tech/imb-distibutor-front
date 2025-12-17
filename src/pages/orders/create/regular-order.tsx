// order-main-section.tsx
import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormInput } from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { SETTINGS_CUSTOMERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { ProductsSection } from "./add-products"
import { Clock } from "lucide-react"

type Props = {
    form: UseFormReturn<any>
}

type ListResponse<T> = {
    total_pages: number
    count: number
    results: T[]
}

type CustomersType = {
    id: number
    name: string
}

export const RegularOrders = ({ form }: Props) => {
    const { data: clientsData } =
        useGet<ListResponse<CustomersType>>(SETTINGS_CUSTOMERS)

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                <FormInput
                    methods={form}
                    name="code"
                    placeholder="Buyurtma ID"
                />

                <FormCombobox
                    placeholder="Ustuvorlik"
                    required
                    options={[
                        { name: "High", id: 3 },
                        { name: "Normal", id: 2 },
                        { name: "Low", id: 1 },
                    ]}
                    name="priority"
                    control={form.control}
                />

                <FormDatePicker
                    className="w-full"
                    control={form.control}
                    name="scheduled_delivery_date"
                    placeholder="Sanani tanlang"
                    required

                />

                <FormCombobox
                    placeholder="Ombor"
                    required
                    options={[
                        { name: "Main Warehouse", id: 1 },
                        { name: "Warehouse B", id: 2 },
                    ]}
                    name="depot"
                    control={form.control}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <FormCombobox
                        placeholder="Xaridor"
                        required
                        options={clientsData?.results}
                        name="client"
                        control={form.control}
                        className="w-full"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            methods={form}
                            name="note"
                            placeholder="Eslatma"
                            required

                        />
                        <FormCombobox
                            placeholder="Ustuvor transport"
                            options={[
                                { name: "Truck", id: 1 },
                                { name: "Van", id: 2 },
                            ]}
                            name="priority_vehicle"
                            control={form.control}
                            className="w-full"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <FormNumberInput
                        thousandSeparator=" "
                        control={form.control}
                        name="cod"
                        placeholder="To'lov naqd summasi"
                        required

                    />
                     <FormInput
                        prefixIcon={
                            <Clock className="h-4 w-4" />
                        }
                        methods={form}
                        name={`time_to_drop`}
                        type="time"
                        className="w-full"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <FormNumberInput
                    thousandSeparator=" "
                    control={form.control}
                    name="weight"
                    placeholder="Og'irligi (kg)"
                    required

                />
                <FormNumberInput
                    thousandSeparator=" "
                    control={form.control}
                    name="product_count"
                    placeholder="Mahsulot soni"
                    required

                />
                <FormNumberInput
                    thousandSeparator=" "
                    control={form.control}
                    name="volume"
                    placeholder="Hajm (m³)"
                    required

                />
            </div>

            <ProductsSection form={form} />
        </div>
    )
}
