// components/products-section.tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { SETTINGS_PRODUCTS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { Plus } from "lucide-react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { ProductsTable } from "../products-table"

type ProductsSectionProps = {
    form: UseFormReturn
}

export const ProductsSection = ({ form }: ProductsSectionProps) => {
    const { watch, control } = form

    const { fields, append, remove, update, replace, insert } = useFieldArray({
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

    const copyProduct = (index: number) => {
        const containerToCopy = form.getValues(`loads.${index}`)
        const { obj_id, ...res } = containerToCopy
        insert(index + 1, res)
    }

    const addLoadRow = () => {
        append({
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
        })
    }

    const handleRemove = (index: number) => {
        remove(index)
    }

    return (
        <Card className="w-full max-w-full overflow-hidden ">
            <CardHeader className="p-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <CardTitle className="text-base sm:text-lg font-semibold">
                            Mahsulotlar
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Jami: {loads.length}
                        </p>
                    </div>
                    <Button
                        type="button"
                        onClick={addLoadRow}
                        className="w-full sm:w-auto "
                    >
                        <Plus className="h-4 w-4 " />
                        <span className="hidden sm:inline">
                            Mahsulot qo'shish
                        </span>
                        <span className="sm:hidden">Qo'shish</span>
                    </Button>
                </div>
            </CardHeader>
            {!!fields?.length && (
                <ProductsTable
                    form={form}
                    fields={fields}
                    productOptions={productOptions}
                    remove={handleRemove}
                    copyProduct={copyProduct}
                />
            )}
        </Card>
    )
}
