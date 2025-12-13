// components/products-section.tsx
import { useCallback, useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGet } from "@/hooks/useGet"
import { SETTINGS_PRODUCTS } from "@/constants/api-endpoints"
import { ProductsTable } from "../products-table"
import { toast } from "sonner"

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
    const [hasEmptyProduct, setHasEmptyProduct] = useState(false)

    const productOptions = productsData?.results?.map(product => ({
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        description: product.description,
        currency: product.currency
    })) || []

    const loads = watch("loads") || []

    // Bo'sh mahsulot borligini tekshirish
    useEffect(() => {
        const emptyProductExists = loads.some((load: LoadRow) => 
            !load.product || load.product === 0
        )
        setHasEmptyProduct(emptyProductExists)
    }, [loads])

    useEffect(() => {
        const updatedLoads = loads.map((load: LoadRow, index: number) => {
            const order = index + 1
            if (load.order !== order) {
                return { ...load, order }
            }
            return load
        })

        const needsUpdate = updatedLoads.some((load: { order: any }, index: string | number) => load.order !== loads[index]?.order)
        if (needsUpdate) {
            setValue("loads", updatedLoads)
        }
    }, [loads, setValue])

    useEffect(() => {
        loads.forEach((load: { product: any }, index: any) => {
            const productId = load.product
            if (productId && productId !== 0) {
                const selectedProduct = productOptions.find(p => p.id === productId)
                if (selectedProduct) {
                    const currentLoad = getValues(`loads.${index}`)
                    const unit = getUnitById(selectedProduct.unit)
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

    const totalProductCount = loads.reduce((sum: any, load: { quantity: any }) => sum + (load.quantity || 0), 0)

    useEffect(() => {
        setValue("product_count", totalProductCount)
    }, [totalProductCount, setValue])

    const addLoadRow = useCallback(() => {
        if (hasEmptyProduct) {
            toast.warning("Avval tanlangan mahsulotni to'ldiring", {
                description: "Yangi mahsulot qo'shish uchun mavjud mahsulotlarni tanlang",
                duration: 3000,
            })
            return
        }

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
        
        toast.info("Yangi mahsulot qator qo'shildi", {
            description: "Endi mahsulotni tanlang va miqdorini kiriting",
            duration: 2000,
        })
    }, [append, fields.length, hasEmptyProduct])

    // Mahsulot o'chirilganda toast ko'rsatish
    const handleRemove = useCallback((index: number) => {
        const productName = loads[index]?.product_name || "Mahsulot"
        remove(index)
        
        toast.info(`${productName} o'chirildi`, {
            description: "Mahsulot ro'yxatdan olib tashlandi",
            duration: 2000,
        })
    }, [remove, loads])

    return (
        <Card className="w-full max-w-full overflow-hidden border shadow-sm">
            <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <CardTitle className="text-base sm:text-lg font-semibold">
                            Mahsulotlar
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Jami: {loads.length} ta mahsulot • {totalProductCount} dona
                        </p>
                    </div>
                  
                </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 py-3 sm:py-4">
                {loads.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground mb-4">Hali mahsulot qo'shilmagan</p>
                        <Button
                            type="button"
                            variant="default"
                            size="sm"
                            onClick={addLoadRow}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Birinchi mahsulotni qo'shish
                        </Button>
                    </div>
                ) : (
                    <>
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
                        
                        {/* Bo'sh mahsulot borligini eslatish */}
                        {hasEmptyProduct && (
                            <div className="mt-4 text-center">
                                <p className="text-sm text-amber-600">
                                    ⚠️ Iltimos, barcha mahsulotlarni tanlang. 
                                    Yangi mahsulot qo'shish uchun avval mavjud mahsulotlarni to'ldiring.
                                </p>
                            </div>
                        )}
                    </>
                )}
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