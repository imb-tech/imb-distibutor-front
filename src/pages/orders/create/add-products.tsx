// components/products-section.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SETTINGS_PRODUCTS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { Plus } from "lucide-react"
import { useCallback } from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { ProductsTable } from "../products-table"

type ProductsType = {
    id: number
    uuid: string
    name: string
    unit: number
    price: string
    description: string
    currency: number
}

type ListResponse<T> = {
    total_pages: number
    count: number
    results: T[]
}

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

type ProductsSectionProps = {
    form: UseFormReturn<any>
}

export const ProductsSection = ({ form }: ProductsSectionProps) => {
    const { getValues, watch, control } = form

    const { fields, append, remove, update, replace } = useFieldArray({
        control,
        name: "loads",
    })

    const { data: productsData } =
        useGet<ListResponse<ProductsType>>(SETTINGS_PRODUCTS)

    const productOptions =
        productsData?.results?.map((product) => ({
            id: product.id,
            name: product.name,
            unit: product.unit,
            price: product.price,
            description: product.description,
            currency: product.currency,
        })) || []

    const loads = watch("loads") || []

    const addLoadRow = useCallback(() => {
        const newLoad: LoadRow = {
            id: `load-${Date.now()}`,
            product: 0,
            quantity: 1,
            price: "0",
            order: fields.length + 1,
            product_name: "",
            description: "",
            unit: 0,
            unit_name: "Dona",
            currency: 1,
            total_amount: 0,
        }
        append(newLoad)
    }, [append, fields])
    

    const handleRemove = useCallback(
        (index: number) => {
            remove(index)
        },
        [remove, loads],
    )



    return (
        <Card className="w-full max-w-full overflow-hidden border shadow-sm">
            <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <CardTitle className="text-base sm:text-lg font-semibold">
                            Mahsulotlar
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Jami: {loads.length}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 py-3 sm:py-4">
                {loads.length === 0 ?
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                        <Button
                            type="button"
                            variant="default"
                            size="lg"
                            onClick={addLoadRow}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Mahsulotni qo'shish
                        </Button>
                    </div>
                :   <>
                        <div className="overflow-x-auto -mx-3 sm:-mx-6">
                            <div className="inline-block min-w-full align-middle">
                                <ProductsTable
                                    form={form}
                                    fields={fields}
                                    productOptions={productOptions}
                                    remove={handleRemove}
                                />
                            </div>
                        </div>
                    </>
                }
            </CardContent>
        </Card>
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
        { id: 4, code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
        {
            id: 5,
            code: "KZT",
            name: "Kazakhstani Tenge",
            symbol: "₸",
            flag: "🇰🇿",
        },
        { id: 6, code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
    ]
    return currencies.find((c) => c.id === id) || currencies[0]
}
