// components/product-data-table.tsx
import { ColumnDef } from "@tanstack/react-table"
import { useState, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {  Plus, Trash2 } from "lucide-react"
import { FormNumberInput } from "../form/number-input"
import { DataTable } from "../ui/datatable"
import FormInput from "../form/input"


// Mahsulot qatori uchun interface
export interface ProductRow {
    id: number
    product_id: string | number
    product_name: string
    measurement_type: string
    brand: string
    price: number
    note: string
    quantity: number
    total: number
}

interface ProductDataTableProps {
    form: UseFormReturn<any>
    products: ProductRow[]
    onProductsChange: (products: ProductRow[]) => void
    allProducts: any[] // Barcha mavjud mahsulotlar ro'yxati
}

export function ProductDataTable({ 
    form, 
    products, 
    onProductsChange, 
    allProducts 
}: ProductDataTableProps) {
    const [selectedRows, setSelectedRows] = useState<ProductRow[]>([])

    // Yangi mahsulot qatorini qo'shish
    const addProductRow = () => {
        const newRow: ProductRow = {
            id: Date.now(),
            product_id: "",
            product_name: "",
            measurement_type: "",
            brand: "",
            price: 0,
            note: "-",
            quantity: 1,
            total: 0,
        }
        onProductsChange([...products, newRow])
    }

    // Tanlangan qatorlarni o'chirish
    const deleteSelectedRows = () => {
        const selectedIds = selectedRows.map(row => row.id)
        const newProducts = products.filter(row => !selectedIds.includes(row.id))
        
        if (newProducts.length === 0) {
            // Agar barcha qatorlar o'chirilsa, bitta bo'sh qator qoldiramiz
            newProducts.push({
                id: Date.now(),
                product_id: "",
                product_name: "",
                measurement_type: "",
                brand: "",
                price: 0,
                note: "-",
                quantity: 1,
                total: 0,
            })
        }
        
        onProductsChange(newProducts)
        setSelectedRows([])
    }

    // Mahsulot tanlanganda
    const handleProductSelect = (product: any, rowId: number) => {
        const updatedProducts = products.map((row) =>
            row.id === rowId ?
                {
                    ...row,
                    product_id: product.id,
                    product_name: product.name,
                    measurement_type: product.measurement_type || "Dona",
                    brand: product.brand || "",
                    price: product.price || 0,
                    note: product.note || "-",
                    total: (product.price || 0) * row.quantity,
                }
            :   row
        )
        onProductsChange(updatedProducts)
    }

    // Miqdor o'zgarganida
    const handleQuantityChange = (value: number, rowId: number) => {
        const updatedProducts = products.map((row) => {
            if (row.id === rowId) {
                const quantity = value || 1
                const total = row.price * quantity
                return {
                    ...row,
                    quantity,
                    total,
                }
            }
            return row
        })
        onProductsChange(updatedProducts)
    }

    // Narx o'zgarganida
    const handlePriceChange = (value: number, rowId: number) => {
        const updatedProducts = products.map((row) => {
            if (row.id === rowId) {
                const price = value || 0
                const total = price * row.quantity
                return {
                    ...row,
                    price,
                    total,
                }
            }
            return row
        })
        onProductsChange(updatedProducts)
    }

    // Eslatma o'zgarganida
    const handleNoteChange = (value: string, rowId: number) => {
        const updatedProducts = products.map((row) =>
            row.id === rowId ?
                { ...row, note: value }
            :   row
        )
        onProductsChange(updatedProducts)
    }

    // Jami summani hisoblash
    const calculateTotal = () => {
        return products.reduce((sum, row) => sum + row.total, 0)
    }

    // Column definitions for DataTable
    const columns: ColumnDef<ProductRow>[] = [
        {
            header: "№",
            cell: ({ row }) => row.index + 1,
            size: 50,
        },
        {
            header: "Nomi",
            accessorKey: "product_name",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <div className="min-w-[200px]">
                        <ProductSelectField
                            methods={form}
                            name={`products[${row.index}].product_id`}
                            label=""
                            required
                            products={allProducts}
                            measurementField={`products[${row.index}].measurement_type`}
                            priceField={`products[${row.index}].price`}
                            brandField={`products[${row.index}].brand`}
                            noteField={`products[${row.index}].note`}
                            onProductSelect={(selectedProduct) => 
                                handleProductSelect(selectedProduct, product.id)
                            }
                            wrapperClassName="w-full"
                            showError={false}
                        />
                    </div>
                )
            },
        },
        {
            header: "Eslatma",
            accessorKey: "note",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <FormInput
                        methods={form}
                        name={`products[${row.index}].note`}
                        placeholder="-"
                        value={product.note}
                        onChange={(e) => 
                            handleNoteChange(e.target.value, product.id)
                        }
                        className="w-full min-w-[150px]"
                    />
                )
            },
        },
        {
            header: "O'lchov turi",
            accessorKey: "measurement_type",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <FormInput
                        methods={form}
                        name={`products[${row.index}].measurement_type`}
                        placeholder="O'lchov turi"
                        value={product.measurement_type}
                        disabled
                        className="w-full min-w-[100px]"
                    />
                )
            },
        },
        {
            header: "Miodor",
            accessorKey: "brand",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <FormInput
                        methods={form}
                        name={`products[${row.index}].brand`}
                        placeholder="Miodor"
                        value={product.brand}
                        disabled
                        className="w-full min-w-[100px]"
                    />
                )
            },
        },
        {
            header: "Narx (UZS)",
            accessorKey: "price",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <FormNumberInput
                        thousandSeparator=" "
                        control={form.control}
                        name={`products[${row.index}].price`}
                        placeholder="Narx"
                        value={product.price}
                        onChange={(value) => 
                            handlePriceChange(value || 0, product.id)
                        }
                        className="w-full min-w-[120px]"
                    />
                )
            },
        },
        {
            header: "Miqdor",
            accessorKey: "quantity",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <FormNumberInput
                        thousandSeparator=" "
                        control={form.control}
                        name={`products[${row.index}].quantity`}
                        placeholder="Miqdor"
                        value={product.quantity}
                        onChange={(value) => 
                            handleQuantityChange(value || 1, product.id)
                        }
                        className="w-full min-w-[100px]"
                    />
                )
            },
        },
        {
            header: "Jami (UZS)",
            accessorKey: "total",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <FormNumberInput
                        thousandSeparator=" "
                        control={form.control}
                        name={`products[${row.index}].total`}
                        placeholder="Jami"
                        value={product.total}
                        disabled
                        className="w-full min-w-[120px] bg-muted"
                    />
                )
            },
        },
    ]

    // Formaga mahsulotlarni saqlash
    useEffect(() => {
        form.setValue("products", products)
        form.setValue("total_amount", calculateTotal())
        form.setValue("product_count", products.reduce((sum, row) => sum + row.quantity, 0))
    }, [products, form])

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Mahsulotlar</h2>
                <div className="flex gap-2">
                    {selectedRows.length > 0 && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={deleteSelectedRows}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Tanlanganlarni o'chirish ({selectedRows.length})
                        </Button>
                    )}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addProductRow}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Yangi qator
                    </Button>
                </div>
            </div>

            <DataTable
                data={products}
                columns={columns}
                selecteds_row={true}
                onSelectedRowsChange={setSelectedRows}
                numeration={false} // Biz allaqachon № column qo'shdik
                className="border rounded-md"
                viewAll={true}
                clearSelectionTrigger={selectedRows.length === 0}
            />

            {/* Umumiy summa */}
            <div className="flex justify-end items-center gap-4 border-t pt-4">
                <div className="text-lg font-semibold">
                    Umumiy mahsulotlar soni: {products.reduce((sum, row) => sum + row.quantity, 0)} dona
                </div>
                <div className="text-lg font-semibold">
                    Umumiy summa: {calculateTotal().toLocaleString('uz-UZ')} UZS
                </div>
            </div>
        </div>
    )
}