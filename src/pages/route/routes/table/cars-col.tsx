import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumnsCarsOrderTable = () => {
    return useMemo<ColumnDef<CarsTypeInOrders>[]>(
        () => [
            {
                header: "№",
            },

            {
                header: "Haydovchi F.I.O",
            },
            {
                header: "Avtomobil rusumi",
            },
            {
                header: "Avtomobil raqami",
            },
            {
                header: "Yol",
            },
            {
                header: "Jarayondagi buyurtmalar",
            },
            {
                header: "Yakunlangan buyurtmalar",
            },
            {
                header: "Buyurtma og'irligi",
            },
            {
                header: "Boshlanish vaqti",
            },
        ],
        [],
    )
}
