import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface InformationTableProps {
    info: CarsTypeInOrders["info"]
}

const InfoTable = ({ info }: InformationTableProps) => {
    return (
        <Table >
            <TableBody>
                {info?.map((item) => {
                    const rows = [
                        ["Buyurtma ID", item.order_id],
                        ["Tashkilot", item.organization],
                        ["Yetkazib berish manzili", item.location],
                        ["Vazn", item.weight],
                        ["Hajm", item.density],
                        ["Ish vaqti (Boshlanishi)", item.working_start],
                        ["Ish vaqti (Tugashi)", item.working_end],
                        ["Narxi", `${item.price.toLocaleString("uz-UZ")} so'm`],
                        ["Telefon raqami", item.phone_number],
                    ]

                    return rows.map(([label, value], rowIdx) => (
                        <TableRow key={rowIdx} className="bg-background">
                            <TableCell className="font-medium text-muted-foreground border-[1.5px] ">
                                {label}
                            </TableCell>
                            <TableCell className="border-[1.5px] ">{value}</TableCell>
                        </TableRow>
                    ))
                })}
            </TableBody>
        </Table>
    )
}

export default InfoTable
