// order-products-section.tsx
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"
type Props = {
    form: UseFormReturn<OrderRow>
    orderType: "regular" | "extra"
    onOrderTypeChange: (value: "regular" | "extra") => void
}
export const ExtraOrders = ({ form, orderType, onOrderTypeChange }: Props) => {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
                    Mahsulotlar
                </h3>

                <Button
                    type="button"
                    variant="outline"
                    className="gap-2 rounded-lg border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-lg border border-orange-500">
                        +
                    </span>
                    Qo‘shish
                </Button>
            </div>
        </section>
    )
}
