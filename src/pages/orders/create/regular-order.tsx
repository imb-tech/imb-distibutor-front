// order-main-section.tsx
import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormInput } from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { useEffect } from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { useGet } from "@/hooks/useGet"
import { SETTINGS_CUSTOMERS } from "@/constants/api-endpoints"
import { ProductsSection } from "./add-products"

type Props = {
    form: UseFormReturn<any>
}

type ListResponse<T> = {
    total_pages: number;
    count: number;
    results: T[];
}

type CustomersType = {
    id: number
    name: string
    // Add other customer fields as needed
}

export const RegularOrders = ({ form }: Props) => {
    const { control, watch } = form

    // useFieldArray hook'ini ishlatish - loads nomi bilan
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "loads",
    })

    const { data: clientsData } = useGet<ListResponse<CustomersType>>(SETTINGS_CUSTOMERS)

    // Form submit uchun tayyorlash - faqat backend uchun kerakli field'larni qoldirish
    const prepareDataForSubmit = (data: any) => {
        if (data.loads && Array.isArray(data.loads)) {
            // Faqat backend uchun kerakli 4 ta field'larni qoldirish
            const cleanedLoads = data.loads.map((load: any) => {
                return {
                    quantity: load.quantity || 0,
                    price: load.price || "0",
                    product: load.product || 0,
                    order: load.order || 1
                }
            })
            return { ...data, loads: cleanedLoads }
        }
        return data
    }

    // Form submit handler
    useEffect(() => {
        // Form submit handler ni o'rnatish
        const originalSubmit = form.handleSubmit
        form.handleSubmit = (onValid) => {
            return originalSubmit((data) => {
                const preparedData = prepareDataForSubmit(data)
                console.log("Backendga yuboriladigan loads:", preparedData.loads)
                onValid(preparedData)
            })
        }
    }, [form, prepareDataForSubmit])

    return (
        <div className="space-y-6">
            {/* Asosiy ma'lumotlar */}
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
                    control={control}
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
                    control={control}
                />
            </div>

            {/* Mijoz ma'lumotlari */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <FormCombobox
                        placeholder="Xaridor"
                        required
                        options={clientsData?.results}
                        name="client"
                        control={control}
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
                            control={control}
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

            {/* Yuk ma'lumotlari */}
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
                    value={watch("product_count") || 0}
                />
                <FormNumberInput
                    thousandSeparator=" "
                    control={form.control}
                    name="volume"
                    placeholder="Hajm (m³)"
                />
            </div>

            {/* Products Section */}
            <ProductsSection
                form={form}
                fields={fields}
                append={append}
                remove={remove}
                update={update}
            />
        </div>
    )
}