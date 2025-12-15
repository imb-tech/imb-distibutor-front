// components/products-table.tsx
import { FormCombobox } from "@/components/form/combobox"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { Copy, X } from "lucide-react"
import { UseFormReturn, useWatch } from "react-hook-form"

type LoadRow = {
    id?: string
    product?: number
    quantity?: number
    price?: string
    order?: number
    product_name?: string
    unit?: number
    unit_name?: string
    currency?: number
    total_amount?: number
}

type ProductsTableProps = {
    form: UseFormReturn
    fields: LoadRow[]
    productOptions: Array<{
        id: number
        name: string
        unit: number
        price: string
        currency: number
    }>
    remove: (index: number) => void
    copyProduct: (index: number) => void
}

const getUnitById = (id: number) => {
    const units = [
        { id: 0, name: "Pieces", short_name: "pc" },
        { id: 1, name: "Kilogram", short_name: "kg" },
        { id: 2, name: "Pound", short_name: "lb" },
        { id: 3, name: "Square meter", short_name: "sqm" },
        { id: 4, name: "Liter", short_name: "l" },
        { id: 5, name: "Cubic meter", short_name: "m³" },
        { id: 6, name: "Gallon", short_name: "gal" },
    ]

    return units.find((u) => u.id === id) || units[0]
}

const getCurrencySymbol = (currencyId: number) => {
    switch (currencyId) {
        case 1: return '$'
        case 2: return '₸'
        case 3: return '€'
        case 4: return '£'
        default: return '$'
    }
}

export const ProductsTable = ({
    form,
    fields,
    productOptions,
    remove,
    copyProduct,
}: ProductsTableProps) => {
    const { control, watch } = form
    const loads = watch("loads") || []


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
                const index = row.index

                return (
                    <div className="space-y-1 flex items-center justify-center">
                        <FormCombobox
                            placeholder="Tanlang"
                            required
                            options={productOptions}
                            name={`loads.${index}.product`}
                            control={control}
                            valueKey="id"
                            labelKey="name"
                            className="min-w-[120px]"
                            handleItem={(item) => {
                                form.setValue(`loads.${index}`, item)
                                form.setValue(`loads.${index}.product`, item.id)
                            }
                            }
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
                const index = row.index
                const currentUnit = loads[index]?.unit || 0
                const unit = getUnitById(currentUnit)

                return (
                    <span>{unit.name}</span>
                )
            },
            size: 80,
        },
        {
            id: "quantity",
            accessorKey: "quantity",
            header: "Miqdor",
            cell: ({ row }) => {
                const index = row.index
                return (
                    <div className="space-y-1">
                        <FormInput
                            methods={form}
                            name={`loads.${index}.quantity`}
                            placeholder="1"
                            className="w-20"

                        />

                    </div>
                )
            },
            size: 90,
        },
        {
            id: "price",
            accessorKey: "price",
            header: "Narx",
            cell: ({ row }) => {
                const index = row.index
                return (
                    <div className="space-y-1">
                        <FormInput
                            methods={form}
                            name={`loads.${index}.price`}
                            placeholder="0.00"
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
                const index = row.index
                const quantity = useWatch({
                    control,
                    name: `loads.${index}.quantity`,
                    defaultValue: 0
                })

                const price = useWatch({
                    control,
                    name: `loads.${index}.price`,
                    defaultValue: 0
                })

                const currentCurrency = useWatch({
                    control,
                    name: `loads.${index}.currency`,
                    defaultValue: 1
                })

                const quantityNum = parseFloat(quantity?.toString() || "0")
                const priceNum = parseFloat(price?.toString() || "0")
                const total = quantityNum * priceNum
                const currencySymbol = getCurrencySymbol(currentCurrency)

                return (
                    <div className="font-medium text-sm text-center pr-2">
                        {formatMoney(total)} {currencySymbol}
                    </div>
                )
            },
            size: 90,
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <div className="flex justify-between gap-2 items-center">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => copyProduct(row.index)}
                        className={cn("!h-9")}
                        title="Nusxa olish"
                    >
                        <Copy className="h-4" />
                    </Button>
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(row.index)}
                        className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 border-gray-200 border-[1px]"
                        title="O'chirish"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
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

