import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface InformationTableProps {
    info: OrderRow["client_data"]
}

const formatCoordinates = (coords: [number, number]) => {
    if (!coords || coords.length < 2) return "Mavjud emas"
    return `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`
}

const InfoTable = ({ info }: InformationTableProps) => {
    if (!info) {
        return (
            <h1 className="text-center text-primary">
                Mijoz ma'lumotlari mavjud emas
            </h1>
        )
    }

    const dataMap = [
        { key: "uuid", label: "Mijoz ID" },
        { key: "name", label: "Mijoz nomi" },
        { key: "company_name", label: "Tashkilot" },
        { key: "address", label: "Manzil" },
        { key: "address_zone", label: "Manzil zonasi" },
        { key: "phone_number", label: "Telefon raqami" },
        { key: "email", label: "Email" },
        { key: "note", label: "Izoh" },
        {
            key: "is_active",
            label: "Faol",
            format: (val: boolean) => (val ? "Ha" : "Yo'q"),
        },
    ]

    const coordinatesItem = {
        label: "Koordinatalar",
        value:
            info.coordinates ?
                formatCoordinates(info.coordinates)
            :   "Mavjud emas",
    }

    return (
        <Table>
            <TableBody>
                {dataMap.map((item, idx) => {
                    const value = info[item.key as keyof typeof info]
                    const displayValue =
                        item.format ?
                            item.format(value as never)
                        :   value || "Mavjud emas"

                    return (
                        <TableRow key={idx} className="bg-background">
                            <TableCell className="font-medium text-muted-foreground border-[1.5px]">
                                {item.label}
                            </TableCell>
                            <TableCell className="border-[1.5px]">
                                {displayValue}
                            </TableCell>
                        </TableRow>
                    )
                })}

                <TableRow className="bg-background">
                    <TableCell className="font-medium text-muted-foreground border-[1.5px]">
                        {coordinatesItem.label}
                    </TableCell>
                    <TableCell className="border-[1.5px]">
                        {coordinatesItem.value}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default InfoTable
