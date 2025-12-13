// components/products-section.tsx
import { useCallback, useEffect } from "react"
import {UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGet } from "@/hooks/useGet"
import { SETTINGS_PRODUCTS } from "@/constants/api-endpoints"
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
    total_pages: number;
    count: number;
    results: T[];
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
    fields: any[]
    append: any
    remove: any
    update: any
}

export const ProductsSection = ({ 
    form, 
    fields, 
    append, 
    remove, 
    update 
}: ProductsSectionProps) => {
    const { getValues, setValue, watch } = form
    const { data: productsData } = useGet<ListResponse<ProductsType>>(SETTINGS_PRODUCTS)
    
    // Mahsulotlar ro'yxatini formatlash
    const productOptions = productsData?.results?.map(product => ({
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        description: product.description,
        currency: product.currency
    })) || []

    // Yuklar qiymatlarini kuzatish
    const loads = watch("loads") || []

    // Yangi mahsulot qo'shilganda yoki o'chirilganda order raqamlarini yangilash
    useEffect(() => {
        const updatedLoads = loads.map((load: LoadRow, index: number) => {
            const order = index + 1
            if (load.order !== order) {
                return { ...load, order }
            }
            return load
        })

        // Agar order raqamlari o'zgarsa, formni yangilash
        const needsUpdate = updatedLoads.some((load: { order: any }, index: string | number) => load.order !== loads[index]?.order)
        if (needsUpdate) {
            setValue("loads", updatedLoads)
        }
    }, [loads, setValue])

    // Mahsulot tanlanganda avtomatik to'ldirish
    useEffect(() => {
        loads.forEach((load: { product: any }, index: any) => {
            const productId = load.product
            if (productId && productId !== 0) {
                const selectedProduct = productOptions.find(p => p.id === productId)
                if (selectedProduct) {
                    const currentLoad = getValues(`loads.${index}`)
                    const unit = getUnitById(selectedProduct.unit)
                    const currency = getCurrencyById(selectedProduct.currency)

                    // Faqat zarur field'lar yangilansa update qilish
                    if (
                        currentLoad.product_name !== selectedProduct.name ||
                        currentLoad.description !== selectedProduct.description ||
                        currentLoad.unit !== selectedProduct.unit ||
                        currentLoad.currency !== selectedProduct.currency ||
                        currentLoad.price !== selectedProduct.price
                    ) {
                        const priceNum = parseFloat(selectedProduct.price)
                        const quantity = currentLoad.quantity || 1

                        update(index, {
                            ...currentLoad,
                            product_name: selectedProduct.name,
                            description: selectedProduct.description,
                            unit: selectedProduct.unit,
                            unit_name: unit.name,
                            currency: selectedProduct.currency,
                            price: selectedProduct.price,
                            total_amount: priceNum * quantity
                        })
                    }
                }
            }
        })
    }, [loads, productOptions, update, getValues])

    // Miqdor yoki narx o'zgarganda total amount ni hisoblash
    useEffect(() => {
        loads.forEach((load: { price: string; quantity: number }, index: any) => {
            const price = typeof load.price === 'string' ? parseFloat(load.price) : load.price || 0
            const quantity = load.quantity || 0
            const total_amount = price * quantity

            const currentLoad = getValues(`loads.${index}`)
            if (currentLoad.total_amount !== total_amount) {
                update(index, { ...currentLoad, total_amount })
            }
        })
    }, [loads, update, getValues])

    // Umumiy summani hisoblash
    const totalAmount = loads.reduce((sum: number, load: { price: string; quantity: number }) => {
        const price = typeof load.price === 'string' ? parseFloat(load.price) : load.price || 0
        const quantity = load.quantity || 0
        return sum + (price * quantity)
    }, 0)

    // Mahsulot sonini hisoblash
    const totalProductCount = loads.reduce((sum: any, load: { quantity: any }) => sum + (load.quantity || 0), 0)

    // Mahsulot sonini formga yozish
    useEffect(() => {
        setValue("product_count", totalProductCount)
    }, [totalProductCount, setValue])

    // Yangi yuk qo'shish
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
    }, [append, fields.length])

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                        Mahsulotlar (Loads)
                    </CardTitle>
                    <div className="flex gap-2 items-center">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addLoadRow}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Mahsulot qo'shish
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Jadval */}
                <ProductsTable
                    form={form}
                    fields={fields}
                    productOptions={productOptions}
                    remove={remove}
                />
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