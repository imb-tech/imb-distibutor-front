import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface ProductsTableProps {
    products: CarsTypeInOrders["products"]
}

export const ProductTable = ({ products }: ProductsTableProps) => {
    return (
        <Table>
            <TableBody>
                {products?.map((product) => {
                    const cols = [
                        product.name,
                        product.quantity,
                        product.total_price,
                    ]

                    return (
                        <TableRow key={product.id} className="bg-background">
                            {cols.map((col, idx) => (
                                <TableCell
                                    key={idx}
                                    className="border-[1.5px] "
                                >
                                    {col}
                                </TableCell>
                            ))}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
