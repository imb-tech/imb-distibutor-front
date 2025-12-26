import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormInput } from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { SETTINGS_CUSTOMERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { Clock } from "lucide-react"
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

    const orderType = form.watch("type")

    const inputRequired = Number(orderType) === 1 ? true : false

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                <FormInput
                    required={inputRequired}
                    label="Buyurtma ID"
                    methods={form}
                    name="code"
                    placeholder="Buyurtma raqami"
                />

                <FormCombobox
                    label="Ustuvorlik"
                    placeholder="Ustuvorlik darajasini tanlang"
                    options={[
                        { name: "Yuqori", id: 3 },
                        { name: "O'rtacha", id: 2 },
                        { name: "Past", id: 1 },
                    ]}
                    name="priority"
                    control={form.control}
                    required={inputRequired}
                />

                <FormDatePicker
                    label="Yetkazib berish sanasi"
                    className="w-full"
                    control={form.control}
                    name="scheduled_delivery_date"
                    placeholder="Sanani tanlang"
                    required={inputRequired}
                />

                <FormCombobox
                    label="Ombor"
                    placeholder="Omborni tanlang"
                    required={inputRequired}
                    options={[
                        { name: "Asosiy ombor", id: 1 },
                        { name: "B ombori", id: 2 },
                    ]}
                    name="depot"
                    control={form.control}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <FormCombobox
                        label="Xaridor"
                        placeholder="Xaridorni tanlang"
                        required={inputRequired}
                        options={clientsData?.results}
                        name="client"
                        control={form.control}
                        className="w-full"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            label="Izoh"
                            methods={form}
                            name="note"
                            placeholder="Qo'shimcha izoh"
                        />
                        <FormCombobox
                            label="Ustuvor transport"
                            placeholder="Transport turini tanlang"
                            options={[
                                { name: "Yuk mashinasi", id: 1 },
                                { name: "Furgon", id: 2 },
                            ]}
                            name="priority_vehicle"
                            control={form.control}
                            className="w-full"
                            required={inputRequired}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <FormNumberInput
                        label="Naqd to'lov summasi"
                        thousandSeparator=" "
                        control={form.control}
                        name="cod"
                        placeholder="Naqd to'lov miqdori"
                        required={inputRequired}
                    />
                    <FormInput
                        label="Yetkazish vaqti"
                        prefixIcon={<Clock className="h-4 w-4" />}
                        methods={form}
                        name="time_to_drop"
                        type="time"
                        className="w-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <FormNumberInput
                    label="Og'irligi (kg)"
                    thousandSeparator=" "
                    control={form.control}
                    name="weight"
                    placeholder="Og'irlikni kiriting"
                    required={inputRequired}
                />
                <FormNumberInput
                    label="Mahsulot soni"
                    thousandSeparator=" "
                    control={form.control}
                    name="product_count"
                    placeholder="Mahsulotlar soni"
                    required={inputRequired}
                />
                <FormNumberInput
                    label="Hajm (m³)"
                    thousandSeparator=" "
                    control={form.control}
                    name="volume"
                    placeholder="Hajmni kiriting"
                    required={inputRequired}
                />
            </div>

            <ProductsSection form={form} />
        </div>
    )
}
