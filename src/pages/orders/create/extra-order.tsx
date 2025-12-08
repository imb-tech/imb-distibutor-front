// order-products-section.tsx
import { Button } from "@/components/ui/button"

export const OrderProductsSection = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">
          Mahsulotlar
        </h3>

        <Button
          type="button"
          variant="outline"
          className="gap-2 rounded-full border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-orange-500">
            +
          </span>
          Qo‘shish
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs text-slate-500">
              <th className="px-4 py-3 w-10">№</th>
              <th className="px-4 py-3">Nomi</th>
              <th className="px-4 py-3">Eslatma</th>
              <th className="px-4 py-3">O‘lchov turi</th>
              <th className="px-4 py-3">Miqdor</th>
              <th className="px-4 py-3">Narx uzs</th>
              <th className="px-4 py-3">Jami uzs</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t text-slate-700">
              <td className="px-4 py-2 text-xs">1</td>
              <td className="px-4 py-2">
                <input
                  className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="–"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="-"
                />
              </td>
              <td className="px-4 py-2">
                <select className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                  <option value="">Tanlang</option>
                  <option value="dona">Dona</option>
                  <option value="kg">Kg</option>
                  <option value="litr">Litr</option>
                </select>
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  disabled
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
