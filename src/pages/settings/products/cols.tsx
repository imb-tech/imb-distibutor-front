import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const currencyMap: Record<number, { label: string }> = {
    1: { label: "🇺🇸 US Dollar" },
    2: { label: "🇪🇺 Euro" },
    3: { label: "🇺🇿 Uzbekistani Som" },
    4: { label: "🇷🇺 Russian Ruble" },
    5: { label: "🇰🇿 Kazakhstani Tenge" },
    6: { label: "🇯🇵 Japanese Yen" },
}

export const useoColumns = () => {
    return useMemo<ColumnDef<ProductsType>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Nomi",
                enableSorting: true,
            },
            {
                accessorKey: "description",
                header: "Eslatma",
                enableSorting: true,
            },
            {
                accessorKey: "unit",
                header: "O'lchov turi",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const val = getValue<number>()

                    const UNIT_OPTIONS = [
                        { value: 0, label: "Pieces" },
                        { value: 1, label: "Kg" },
                        { value: 2, label: "Pound" },
                        { value: 3, label: "Square meter" },
                        { value: 4, label: "Liter" },
                        { value: 5, label: "Cubic meter" },
                        { value: 6, label: "Gallon" },
                    ]

                    const unit = UNIT_OPTIONS.find((opt) => opt.value === val)
                    if (!unit) return "-"

                    return <span>{unit.label}</span>
                },
            },
            {
                accessorKey: "currency",
                header: "Valyuta",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const val = getValue<number>()
                    const currency = currencyMap[val]
                    if (!currency) return "-"

                    return <span>{currency.label}</span>
                },
            },
            {
                accessorKey: "price",
                header: "Narx",
                enableSorting: true,
                cell: ({ row: { original } }) => (
                    <span>{formatMoney(original.price)}</span>
                ),
            },
        ],
        [],
    )
}
