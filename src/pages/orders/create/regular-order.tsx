// order-main-section.tsx

import { FormInput } from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"



export const OrderMainSection = ({
  form,
  orderType,
  onOrderTypeChange,
}: Props) => {
  const { control, register } = form

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">
          Asosiy ma’lumotlar
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 flex items-center">
            <div className="inline-flex w-full md:w-auto rounded-full bg-slate-50 p-1 gap-1">
              <button
                type="button"
                onClick={() => onOrderTypeChange("doimiy")}
                className={`flex-1 px-4 py-2 text-sm rounded-full border transition 
                  ${
                    orderType === "doimiy"
                      ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                      : "bg-transparent text-slate-700 border-transparent hover:bg-white"
                  }`}
              >
                Doimiy
              </button>
              <button
                type="button"
                onClick={() => onOrderTypeChange("qoshimcha")}
                className={`flex-1 px-4 py-2 text-sm rounded-full border transition 
                  ${
                    orderType === "qoshimcha"
                      ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                      : "bg-transparent text-slate-700 border-transparent hover:bg-white"
                  }`}
              >
                Qo‘shimcha
              </button>
            </div>
            <input
              type="hidden"
              {...register("order_type")}
            />
          </div>

          <div className="md:col-span-2">
            <FormInput
              name="yetkazib_beruvchi"
              label="Yetkazib beruvchi"
              methods={form}
            />
          </div>

          <FormInput
            required
            name="id_buyurtma"
            label="ID buyurtma"
            methods={form}
          />

          <FormInput
            name="ustuvorlik"
            label="Ustuvorlik"
            methods={form}
          />

          <FormInput
            name="sana"
            label="Sana"
            methods={form}
            placeholder="YYYY.MM.DD"
          />

          <FormInput
            name="ombor_manzili"
            label="Ombor"
            methods={form}
          />
        </div>
      </section>

      {/* --- Mijoz tafsilotlari --- */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">
          Mijoz tafsilotlari
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <FormInput
              required
              name="mijoz"
              label="Mijoz:Tashkilot nomi"
              methods={form}
            />
          </div>

          <div className="md:col-span-2">
            <FormInput
              required
              name="manzil"
              label="Manzil"
              methods={form}
            />
          </div>

          <FormInput
            name="kontakt_nomi"
            label="Kontakt nomi"
            methods={form}
          />

          <FormInput
            name="reys_hududi"
            label="Manzil hududi"
            methods={form}
          />

          <FormInput
            name="telefon"
            label="Telefon raqami"
            methods={form}
            type="tel"
          />

          <FormInput
            name="ish_dan"
            label="Ish vaqti: dan"
            methods={form}
          />

          <FormInput
            name="ish_gacha"
            label="Ish vaqti: gacha"
            methods={form}
          />

          <FormInput
            name="eslatma"
            label="Eslatma"
            methods={form}
          />

          <FormInput
            name="ustuvor_transport"
            label="Ustuvor transport"
            methods={form}
          />

          <FormInput
            name="tushirish_vaqti"
            label="Yuk tushirish vaqti"
            methods={form}
          />

          <FormNumberInput
            name="tolov_summasi"
            label="To‘lov naqd summasi"
            control={control}
            maxLength={10}
          />
        </div>
      </section>

    
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">
          Yuk tavsilotlari
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormNumberInput
            name="ogirlik"
            label="Og‘irligi kg"
            control={control}
            maxLength={6}
          />

          <FormNumberInput
            name="maxsulot_soni"
            label="Maxsulot soni"
            control={control}
            maxLength={6}
          />

          <FormInput
            name="hajm"
            label="Hajm m3"
            methods={form}
          />
        </div>
      </section>
    </div>
  )
}
