// components/schedule-table.tsx
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
    format,
    getDay,
    getDaysInMonth,
    isWeekend,
    startOfMonth,
} from "date-fns"
import { CheckCircle, XCircle } from "lucide-react"
import React, { useMemo, useState } from "react"

export default function ScheduleTable({
    employees,
    month: initialMonth,
    onScheduleChange,
    readonly = false,
}: ScheduleTableProps) {
    const [currentMonth, setCurrentMonth] = useState<Date>(initialMonth)

    const daysInMonth = useMemo(() => {
        const days = getDaysInMonth(currentMonth)
        const firstDay = startOfMonth(currentMonth)
        const startDay = getDay(firstDay)

        const daysArray: DayInfo[] = []

        for (let i = 1; i <= days; i++) {
            const date = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                i,
            )
            const dateString = format(date, "yyyy-MM-dd")

            daysArray.push({
                date,
                dayNumber: i,
                dayName: format(date, "EEE"),
                isWeekend: isWeekend(date),
                dateString,
            })
        }

        return daysArray
    }, [currentMonth])

    const employeeTotals = useMemo(() => {
        return employees.map((employee: { schedule: { [x: string]: any } }) => {
            let total = 0
            daysInMonth.forEach((day) => {
                if (employee.schedule[day.dateString]) {
                    total++
                }
            })
            return total
        })
    }, [employees, daysInMonth])

    const handleScheduleToggle = (
        employeeId: string,
        dateString: string,
        currentValue: boolean,
    ) => {
        if (!readonly && onScheduleChange) {
            onScheduleChange(employeeId, dateString, !currentValue)
        }
    }

    return (
        <Card className="w-full mt-3">
            <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                    <CardTitle>Ish Jadvali</CardTitle>
                    <div className="flex items-center gap-2"></div>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border  ">
                    <div className="min-w-[800px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="sticky left-0 bg-background z-10 border-r min-w-[60px]">
                                        №
                                    </TableHead>
                                    <TableHead className="sticky left-[60px] bg-background z-10 border-r min-w-[180px]">
                                        F.I.O
                                    </TableHead>
                                    <TableHead className="sticky left-[240px] bg-background z-10 border-r min-w-[120px]">
                                        Lavozimi
                                    </TableHead>

                                    {daysInMonth.map((day) => (
                                        <TableHead
                                            key={day.dateString}
                                            className={cn(
                                                "text-center min-w-[50px] max-w-[50px] bg-background border-r",
                                            )}
                                        >
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-semibold">
                                                    {day.dayNumber}
                                                </span>
                                            </div>
                                        </TableHead>
                                    ))}

                                    <TableHead className="sticky right-0 bg-background z-10 border-l min-w-[80px] text-center">
                                        Ish kuni
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map(
                                    (
                                        employee: {
                                            id: any
                                            fullName:
                                                | string
                                                | number
                                                | boolean
                                                | React.ReactElement<
                                                      any,
                                                      | string
                                                      | React.JSXElementConstructor<any>
                                                  >
                                                | Iterable<React.ReactNode>
                                                | React.ReactPortal
                                                | null
                                                | undefined
                                            employeeId:
                                                | string
                                                | number
                                                | boolean
                                                | React.ReactElement<
                                                      any,
                                                      | string
                                                      | React.JSXElementConstructor<any>
                                                  >
                                                | Iterable<React.ReactNode>
                                                | React.ReactPortal
                                                | null
                                                | undefined
                                            role:
                                                | string
                                                | number
                                                | boolean
                                                | React.ReactElement<
                                                      any,
                                                      | string
                                                      | React.JSXElementConstructor<any>
                                                  >
                                                | Iterable<React.ReactNode>
                                                | React.ReactPortal
                                                | null
                                                | undefined
                                            schedule: { [x: string]: boolean }
                                        },
                                        index: number,
                                    ) => (
                                        <TableRow
                                            key={employee.id}
                                            className="hover:bg-muted/50"
                                        >
                                            <TableCell className="sticky left-0 bg-background border-r font-medium">
                                                {index + 1}
                                            </TableCell>

                                            <TableCell className="sticky left-[60px] bg-background border-r font-medium">
                                                <div className="space-y-1">
                                                    <div className="font-medium">
                                                        {employee.fullName}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="sticky left-[240px] bg-background border-r">
                                                {employee.role}
                                            </TableCell>

                                            {daysInMonth.map((day) => {
                                                const isWorking =
                                                    employee.schedule[
                                                        day.dateString
                                                    ] || false
                                                return (
                                                    <TableCell
                                                        key={`${employee.id}-${day.dateString}`}
                                                        className={cn(
                                                            "text-center p-1 cursor-pointer border",
                                                            day.isWeekend &&
                                                                "bg-muted/30",
                                                            !readonly &&
                                                                "hover:bg-muted",
                                                        )}
                                                        onClick={() =>
                                                            handleScheduleToggle(
                                                                employee.id,
                                                                day.dateString,
                                                                isWorking,
                                                            )
                                                        }
                                                    >
                                                        {isWorking ?
                                                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                                        :   <XCircle className="h-5 w-5 text-red-400 mx-auto" />
                                                        }
                                                    </TableCell>
                                                )
                                            })}

                                            <TableCell className="sticky right-0 bg-background border-l text-center font-bold">
                                                <Badge className="bg-primary hover:bg-primary/90 text-white">
                                                    {employeeTotals[index]}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )}

                                {employees.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4 + daysInMonth.length + 1}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            No employees found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <ScrollBar orientation="horizontal" className="h-0" />
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
