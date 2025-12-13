// components/products-table.tsx
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/datatable"
import { FormInput } from "@/components/form/input"
import { FormCombobox } from "@/components/form/combobox"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

type LoadRow = {
    id: string
    product: number
    quantity: number
    price: string
    order: number
    product_name?: string
    description?: string
    unit?: number
    unit_name?: string
    currency?: number
    total_amount?: number
}

type ProductsTableProps = {
    form: UseFormReturn<any>
    fields: any[]
    productOptions: Array<{
        id: number
        name: string
        unit: number
        price: string
        description: string
        currency: number
    }>
    remove: (index: number) => void
}

export const ProductsTable = ({ form, fields, productOptions, remove }: ProductsTableProps) => {
    const { control } = form

    const columns: ColumnDef<LoadRow>[] = [
        {
            header: "№",
            cell: ({ row }) => {
                const load = row.original
                return (
                    <div className="min-w-[50px]">
                        <FormInput
                            methods={form}
                            name={`loads.${row.index}.order`}
                            value={load.order || row.index + 1}
                            disabled
                            className="bg-muted text-center font-medium"
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                            Tartib raqami
                        </div>
                    </div>
                )
            },
            size: 70,
        },
        {
            header: "Product",
            cell: ({ row }) => {
                const load = row.original
                return (
                    <div className="min-w-[200px]">
                        <FormCombobox
                            placeholder="Mahsulot tanlang"
                            required
                            options={productOptions}
                            name={`loads.${row.index}.product`}
                            control={control}
                            valueKey="id"
                            labelKey="name"
                        />
                        {load.product_name && (
                            <div className="text-xs text-muted-foreground mt-1">
                                {load.product_name}
                            </div>
                        )}
                    </div>
                )
            },
        },
        {
            header: "Description",
            cell: ({ row }) => {
                const load = row.original
                return (
                    <div className="min-w-[250px]">
                        <FormInput
                            methods={form}
                            name={`loads.${row.index}.description`}
                            value={load.description || ""}
                            disabled
                            className="bg-muted"
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                            Mahsulot tavsifi
                        </div>
                    </div>
                )
            },
        },
        {
            header: "Unit",
            cell: ({ row }) => {
                const load = row.original
                const unit = getUnitById(load.unit || 0)
                return (
                    <div className="min-w-[120px]">
                        <FormInput
                            methods={form}
                            name={`loads.${row.index}.unit_name`}
                            value={unit.name}
                            disabled
                            className="bg-muted"
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                            {unit.short_name} (tahrirlab bo'lmaydi)
                        </div>
                    </div>
                )
            },
        },
        {
            header: "Currency",
            cell: ({ row }) => {
                const load = row.original
                const currency = getCurrencyById(load.currency || 1)
                return (
                    <div className="min-w-[120px]">
                        <div className="border rounded-md px-3 py-2 bg-muted flex items-center gap-2">
                            <span className="text-lg">{currency.flag}</span>
                            <div>
                                <div className="font-medium">{currency.code}</div>
                                <div className="text-xs text-muted-foreground">{currency.name}</div>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            Valyuta (tahrirlab bo'lmaydi)
                        </div>
                    </div>
                )
            },
        },
        {
            header: "Quantity",
            cell: ({ row }) => {
                const load = row.original
                return (
                    <div className="min-w-[120px]">
                        <FormNumberInput
                            control={form.control}
                            name={`loads.${row.index}.quantity`}
                            placeholder="Miqdor"
                            defaultValue={load.quantity || 1}
                            min={1}
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                            Backendga yuboriladi
                        </div>
                    </div>
                )
            },
        },
        {
            header: "Price",
            cell: ({ row }) => {
                const load = row.original
                const currency = getCurrencyById(load.currency || 1)
                return (
                    <div className="min-w-[150px]">
                        <div className="relative">
                            <FormNumberInput
                                control={form.control}
                                name={`loads.${row.index}.price`}
                                placeholder="Narx"
                                defaultValue={typeof load.price === 'string' ? parseFloat(load.price) : load.price}
                                className="pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                {currency.flag}
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {currency.code} • Backendga yuboriladi
                        </div>
                    </div>
                )
            },
        },
        {
            header: "Total Sum",
            cell: ({ row }) => {
                const load = row.original
                const currency = getCurrencyById(load.currency || 1)
                const totalAmount = load.total_amount || 0

                return (
                    <div className="min-w-[150px]">
                        <div className="border rounded-md px-3 py-2 bg-muted font-semibold flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm">{currency.flag}</span>
                                <span>{totalAmount.toLocaleString('ru-RU')}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{currency.symbol}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {currency.code} • Faqat UI uchun
                        </div>
                    </div>
                )
            },
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="min-w-[80px]">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(row.index)}
                            className="h-8 w-8"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )
            },
            size: 80,
        },
    ]

    return (
        <DataTable
            data={fields}
            columns={columns}
            selecteds_row={false}
            numeration={false}
            className="border-none"
            viewAll={true}
        />
    )
}

// Helper functions
const getUnitById = (id: number) => {
    const units = [
        { id: 0, name: "Dona", short_name: "dona" },
        { id: 1, name: "Kilogram", short_name: "kg" },
        { id: 2, name: "Metr", short_name: "m" },
        { id: 3, name: "Lit", short_name: "l" },
        { id: 4, name: "Quti", short_name: "quti" },
        { id: 5, name: "Paket", short_name: "paket" },
    ]
    return units.find(u => u.id === id) || { id: 0, name: "Dona", short_name: "dona" }
}

const getCurrencyById = (id: number) => {
    const currencies = [
        { id: 1, code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
        { id: 2, code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
        { id: 3, code: "UZS", name: "Uzbekistani Som", symbol: "so'm", flag: "🇺🇿" },
        { id: 4, code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
        { id: 5, code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", flag: "🇰🇿" },
        { id: 6, code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
    ]
    return currencies.find(c => c.id === id) || currencies[0]
}