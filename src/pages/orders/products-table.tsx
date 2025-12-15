// components/products-table.tsx
import { FormCombobox } from "@/components/form/combobox"
import { FormNumberInput } from "@/components/form/number-input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { Control, UseFormReturn } from "react-hook-form"

type LoadRow = {
    id: string
    product: number
    quantity: number
    price: string
    order: number
    product_name?: string
    unit?: number
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
        currency: number
    }>
    remove: (index: number) => void
}

export const ProductsTable = ({
    form,
    fields,
    productOptions,
    remove,
}: ProductsTableProps) => {
    const { control } = form

    const columns: ColumnDef<LoadRow>[] = [
        {
            id: "order",
            accessorKey: "order",
            header: "#",
            cell: ({ row }) => (
                <div className="text-center font-medium text-sm">
                    {row.index + 1}
                </div>
            ),
            size: 50,
        },
        {
            id: "product",
            accessorKey: "product",
            header: "Mahsulot",
            cell: ({ row }) => {
                return (
                    <div className="space-y-1">
                        <FormCombobox
                            placeholder="Tanlang"
                            required
                            options={productOptions}
                            name={`loads.${row.index}.product`}
                            control={control as Control<any>}
                            valueKey="id"
                            labelKey="name"
                            className="min-w-[120px]"
                        />
                    </div>
                )
            },
            size: 160,
        },
        {
            id: "unit",
            accessorKey: "unit",
            header: "Birlik",
            cell: ({ row }) => {
                const load = row.original
                const unit = getUnitById(load.unit || 0)
                return (
                    <div className="text-center">
                        <Badge variant="outline" className="text-xs">
                            {unit.short_name}
                        </Badge>
                    </div>
                )
            },
            size: 70,
        },
        {
            id: "quantity",
            accessorKey: "quantity",
            header: "Miqdor",
            cell: ({ row }) => (
                <FormNumberInput
                    control={control as Control<any>}
                    name={`loads.${row.index}.quantity`}
                    placeholder="1"
                    defaultValue={1}
                    min={1}
                    step={1}
                    className="w-20"
                />
            ),
            size: 90,
        },
        {
            id: "price",
            accessorKey: "price",
            header: "Narx",
            cell: ({ row }) => {
                return (
                    <div className="space-y-1">
                        <FormNumberInput
                            control={control as Control<any>}
                            name={`loads.${row.index}.price`}
                            placeholder="0"
                            defaultValue={0}
                            className="w-28"
                        />
                    </div>
                )
            },
            size: 100,
        },
        {
            id: "total_amount",
            accessorKey: "total_amount",
            header: "Jami",
            cell: ({ row }) => {
                return (
                    <div className="text-right flex items-center justify-between">
                        <FormNumberInput
                            control={control as Control<any>}
                            name={`loads.${row.index}.total_amount`}
                            placeholder="0"
                            className="w-28"
                        />
                    </div>
                )
            },
            size: 90,
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <Button
                    type="button"
                    size="icon"
                    onClick={() => remove(row.index)}
                    className="h-8 w-8"
                >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
            ),
            size: 50,
        },
    ]

    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                data={fields}
                columns={columns}
                selecteds_row={false}
                numeration={false}
                viewAll={true}
                className="min-w-full"
            />
        </div>
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
    return (
        units.find((u) => u.id === id) || {
            id: 0,
            name: "Dona",
            short_name: "dona",
        }
    )
}

const getCurrencyById = (id: number) => {
    const currencies = [
        { id: 1, code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
        { id: 2, code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
        {
            id: 3,
            code: "UZS",
            name: "Uzbekistani Som",
            symbol: "so'm",
            flag: "🇺🇿",
        },
    ]
    return currencies.find((c) => c.id === id) || currencies[0]
}
