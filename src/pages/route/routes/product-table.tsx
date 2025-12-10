import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface ProductsTableProps {
    products: CarsTypeInOrders["products"]
}

export const ProductTable = ({ products }: ProductsTableProps) => {
    return (
        <>
            <div className="space-y-6">
                <div className="rounded-md border">
                    <Table>
                        <TableBody className="border">
                            {products?.map((product) => (
                                <TableRow key={product.id} className="border">
                                    <TableCell className="border">{product.name}</TableCell>
                                    <TableCell className="border">{product.quantity}</TableCell>
                                    <TableCell className="border">{product.total_price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}
