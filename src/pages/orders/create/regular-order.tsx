// order-main-section.tsx
import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormFormatNumberInput } from "@/components/form/format-number-input"
import { FormInput } from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Clock, MapPin } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

type Props = {
    form: UseFormReturn<OrderRow>
    orderType: "regular" | "extra"
    onOrderTypeChange: (value: "regular" | "extra") => void
}

export const RegularOrders = ({ form }: Props) => {
    const { control, watch } = form
    const date = watch("date")

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 items-center">
                <FormInput
                    methods={form}
                    name="order_id"
                    placeholder="Buyurtma ID"
                    className="max-w-sm"
                />

                <FormCombobox
                    placeholder="Ustuvorlik"
                    required
                    options={[
                        { label: "High", value: "high" },
                        { label: "Normal", value: "normal" },
                        { label: "Low", value: "low" },
                    ]}
                    name="priority"
                    control={control}
                    className="max-w-sm"
                />

                <div>
                    <FormDatePicker
                        className={"!w-full"}
                        control={form.control}
                        name="date"
                    />
                </div>
                <FormCombobox
                    placeholder="Ombor"
                    required
                    options={[
                        { name: "Main Warehouse", id: "main" },
                        { name: "Warehouse B", id: "b" },
                    ]}
                    name="warehouse"
                    control={control}
                />
            </div>

            <div className="space-y-2">
                <h2>Mijoz Tafsilotlari</h2>
                <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col gap-4 ">
                        <FormInput
                            methods={form}
                            name="customer"
                            placeholder="Mijoz: Tashkilot nomi"
                        />
                        <FormInput
                            methods={form}
                            name="contact_name"
                            placeholder="Kontakt nomi"
                        />
                        <FormFormatNumberInput
                            control={form.control}
                            format="+998 ## ### ## ##"
                            required
                            name={"phone"}
                        />
                        <div className="grid grid-cols-2 items-center gap-4">
                            <FormInput
                                methods={form}
                                name="note"
                                placeholder="Eslatma"
                            />
                            <FormCombobox
                                placeholder="Ustuvor transport"
                                required
                                options={[
                                    { label: "Truck", value: "truck" },
                                    { label: "Van", value: "van" },
                                    { label: "Box", value: "box" },
                                ]}
                                name="preferred_transport"
                                control={control}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 ">
                        <FormInput
                            methods={form}
                            name="address"
                            placeholder="Manzil"
                            prefixIcon={<MapPin className="text-primary h-5" />}

                        />

                        <FormInput
                            methods={form}
                            name="route_region"
                            placeholder="Manzil hududi"
                            prefixIcon={<MapPin className="text-primary h-5" />}

                        />
                        <div className="grid grid-cols-2 justify-between w-full gap-4 ">
                            <FormInput
                                methods={form}
                                name="start_time"
                                placeholder="Yuk tushirish vaqti"
                                type="time"
                                prefixIcon={<Clock className="text-primary h-5" />}
                            />
                            <FormInput
                                methods={form}
                                name="end_time"
                                placeholder="Yuk tushirish vaqti"
                                type="time"
                                prefixIcon={<Clock className="text-primary h-5" />}

                            />

                            <FormInput
                                methods={form}
                                name="unloading_time"
                                placeholder="Yuk tushirish vaqti"

                            />

                            <FormNumberInput
                                thousandSeparator={" "}
                                control={form.control}
                                name="cash_payment"
                                placeholder="To'lov naqd summasi"
                            />
                        </div>
                    </div>
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
                        name="product_count"
                        placeholder="Maxsulot soni"
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
