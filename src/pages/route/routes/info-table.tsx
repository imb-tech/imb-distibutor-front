import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface InformationTableProps {
    info: CarsTypeInOrders["info"]
}

const InfoTable = ({ info }: InformationTableProps) => {
    return (
        <> <div className="space-y-6">
            <div className="rounded-md border">
                <Table>
                    <TableBody>
                        {info?.map((item) => (
                             <>
                                <TableRow className="border">
                                    <TableCell className="font-medium flex items-center gap-2 border">
                                        Buyurtma ID
                                    </TableCell>
                                    <TableCell className="border">
                                        <span className="font-mono  ">
                                            {item.order_id}
                                        </span>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2 border">
                                        Tashkilot
                                    </TableCell>
                                    <TableCell className="border">{item.organization}</TableCell>
                                </TableRow>

                                <TableRow className="border">
                                    <TableCell className="font-medium flex items-center gap-2 border">
                                        Yetkazib berish manzili
                                    </TableCell>
                                    <TableCell className="border">{item.location}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2 border">
                                        Vazn
                                    </TableCell>
                                    <TableCell className="border">{item.weight}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2 border">
                                        Hajm
                                    </TableCell>
                                    <TableCell className="border">{item.density}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        Ish vaqti (Boshlanishi)
                                    </TableCell>
                                    <TableCell>{item.working_start}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        Ish vaqti (Tugashi)
                                    </TableCell>
                                    <TableCell>{item.working_end}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        Narxi
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-semibol">
                                            {item.price.toLocaleString("uz-UZ")}{" "}
                                            so'm
                                        </span>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        Telefon raqami
                                    </TableCell>
                                    <TableCell>{item.phone_number}</TableCell>
                                </TableRow>
                           </>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </div>
        </>
    )
}

export default InfoTable
