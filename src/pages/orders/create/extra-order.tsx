// order-products-section.tsx
import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { UseFormReturn } from "react-hook-form"
import { useGet } from "@/hooks/useGet"
import { SETTINGS_CUSTOMERS } from "@/constants/api-endpoints"
import { GoogleAddressAutocomplete } from "@/components/form/address-complete"
type Props = {
    form: UseFormReturn<Delivery>
    orderType: "extra" | "redular"
    onOrderTypeChange: (value: "extra" | "regular") => void
}
export const ExtraOrders = ({ form }: Props) => {

    const { control} = form
    

    const { data: clientsData } = useGet<ListResponse<CustomersType>>(SETTINGS_CUSTOMERS)


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
                        control={control}
                        className="w-full"
                    />
                  // Add to your form
                    <GoogleAddressAutocomplete
                        form={form}
                        coordinatesFieldName="loading_coordinates"
                        addressFieldName="loading_address"
                        label="Yuklash manzili"
                        placeholder="Manzilni qidiring..."
                        apiKey="AIzaSyDE1X4ckZsrfsMRRN2yN0NlXfdrS8kibAE"
                        required
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
                        control={control}
                        className="w-full"
                    />

                    <FormCombobox
                        placeholder="To'lov turi"
                        required
                        options={[
                            { name: "Naqd pul", id: 1 },
                            { name: "Karta orqali", id: 2 },
                        ]}
                        name="payment_type"
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

                <div className="grid grid-cols-2 gap-4">                    <FormNumberInput
                    thousandSeparator={" "}
                    control={form.control}
                    name="weight"
                    placeholder="Og’irligi kg"
                />
                    {/* <FormNumberInput
                        thousandSeparator={" "}
                        control={form.control}
                        name="cargo_type"
                        placeholder="Yuk turi : "
                    /> */}
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