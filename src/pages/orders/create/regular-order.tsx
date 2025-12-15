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

    const prepareDataForSubmit = (data: any) => {
        if (data.loads && Array.isArray(data.loads)) {
            const cleanedLoads = data.loads.map((load: any) => {
                return {
                    quantity: load.quantity || 0,
                    price: load.price || "0",
                    product: load.product || 0,
                    order: load.order || 1,
                }
            })
            return { ...data, loads: cleanedLoads }
        }
        return data
    }

    useEffect(() => {
        const originalSubmit = form.handleSubmit
        form.handleSubmit = (onValid) => {
            return originalSubmit((data) => {
                const preparedData = prepareDataForSubmit(data)
                console.log(
                    "Backendga yuboriladigan loads:",
                    preparedData.loads,
                )
                onValid(preparedData)
            })
        }
    }, [form, prepareDataForSubmit])

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
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <FormNumberInput
                        thousandSeparator=" "
                        control={form.control}
                        name="cod"
                        placeholder="To'lov naqd summasi"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <FormNumberInput
                    thousandSeparator=" "
                    control={form.control}
                    name="weight"
                    placeholder="Og'irligi (kg)"
                />
                <FormNumberInput
                    thousandSeparator=" "
                    control={form.control}
                    name="product_count"
                    placeholder="Mahsulot soni"
                />
                <FormNumberInput
                    thousandSeparator=" "
                    control={form.control}
                    name="volume"
                    placeholder="Hajm (m³)"
                />
            </div>

            <ProductsSection form={form} />
        </div>
    )
}
