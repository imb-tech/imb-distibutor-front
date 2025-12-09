// order-products-section.tsx
import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormFormatNumberInput } from "@/components/form/format-number-input"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"
import { MapPin } from 'lucide-react';
type Props = {
    form: UseFormReturn<OrderRow>
    orderType: "regular" | "extra"
    onOrderTypeChange: (value: "regular" | "extra") => void
}
export const ExtraOrders = ({ form, orderType, onOrderTypeChange }: Props) => {

    const { control, watch } = form
    const date = watch("date")

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4 items-center">
                <FormInput
                    methods={form}
                    name="order_id"
                    placeholder="Buyurtma ID"
                    className="max-w-sm"
                />


                <div>
                    <FormDatePicker
                        className={"!w-full"}
                        control={form.control}
                        name="date"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <h2>Mijoz Tafsilotlari</h2>
                <div className="grid grid-cols-2 gap-4 items-center">
                    <FormInput
                        methods={form}
                        name="customer"
                        placeholder="Mijoz: Tashkilot nomi"
                    />
                    <FormInput
                        methods={form}
                        name="address"
                        placeholder="Yuklash  manzil"
                        prefixIcon={<MapPin className="text-primary h-5" />}

                    />
                    <FormFormatNumberInput
                        control={form.control}
                        format="+998 ## ### ## ##"
                        required
                        name={"phone"}
                    />
                    <FormInput
                        methods={form}
                        name="route_region"
                        placeholder="Tushirish manzili"
                        prefixIcon={<MapPin className="text-primary h-5" />}

                    />

                    <FormInput
                        methods={form}
                        name="note"
                        placeholder="Eslatma"
                    />

                    <FormCombobox
                        placeholder="Ustuvor transport"
                        required
                        options={[
                            { name: "Truck", id: "truck" },
                            { name: "Van", id: "van" },
                            { name: "Box", id: "box" },
                        ]}
                        name="preferred_transport"
                        control={control}
                        className="w-full"
                    />

                    <FormCombobox
                        placeholder="To'lov turi"
                        required
                        options={[
                            { name: "Naqd pul", id: "cash" },
                            { name: "Karta orqali", id: "card" },

                        ]}
                        name="preferred_transport"
                        control={control}
                        className="w-full flex"
                    />

                    <FormInput
                        methods={form}
                        name="note"
                        placeholder="Eslatma"
                    />

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
                        name="cargo_type"
                        placeholder="Yuk turi : "
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
