// order-main-section.tsx
import React from "react"
import { ParamCombobox } from "@/components/as-params/combobox"
import { FormCombobox } from "@/components/form/combobox"
import { FormInput } from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { DatePicker } from "@/components/ui/datepicker"
import { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { FormFormatNumberInput } from "@/components/form/format-number-input"
import { DatePickerWithRange } from "@/components/form/date-range-picker"

type Props = {
  form: UseFormReturn<OrderRow>
  orderType: "regular" | "extra"
  onOrderTypeChange: (value: "regular" | "extra") => void
}

export const RegularOrders = ({ form }: Props) => {
  const { control, register, watch, setValue } = form
  const date = watch("date")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-2 items-center">
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

        <div className="flex flex-col">
          <DatePicker
            date={date}
            setDate={(value: any) => setValue("date", value, { shouldDirty: true })}
            placeholder="Sana"
            fullWidth={false}
            className="max-w-sm"
          />
        </div>
        <FormCombobox
          placeholder="Ombor"
          required
          options={[
            { label: "Main Warehouse", value: "main" },
            { label: "Warehouse B", value: "b" },
          ]}
          name="warehouse"
          control={control}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 items-center">
        <h2>
          Mijoz Tafsilotlari
        </h2>
        <div className="grid grid-cols-2 gap-4 items-center">

          <div className="flex flex-col gap-2 py-2">
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
            <div className="grid grid-cols-2 items-center gap-2 py-2">
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

          <div className="flex flex-col items-center gap-2 py-2 ">
            <FormInput
              methods={form}
              name="address"
              placeholder="Manzil"
            />


            <FormInput
              methods={form}
              name="route_region"
              placeholder="Manzil hududi"
            />
            <div className="grid grid-cols-2 justify-between w-full gap-2 py-2">

              <FormInput
                methods={form}
                name="start_time"
                placeholder="Yuk tushirish vaqti"
                type="time"

              />
  <FormInput
                methods={form}
                name="end_time"
                placeholder="Yuk tushirish vaqti"
                type="time"

              />


              <FormInput
                methods={form}
                name="unloading_time"
                placeholder="Yuk tushirish vaqti"

              />

              <FormInput
                methods={form}
                name="cash_payment"
                placeholder="To'lov naqd summasi"

              />
            </div>
          </div>

        </div>
      </div>


      <div>

      </div>
    </div>
  )
}
