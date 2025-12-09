import { format } from "date-fns"
import { CalendarDays, X } from "lucide-react"

import { Button, ButtonProps } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { ClassNameValue } from "tailwind-merge"

export function DatePicker({
    date,
    setDate,
    placeholder,
    fullWidth,
    disabled,
    calendarProps,
    defaultValue,
    addButtonProps,
    className,
    isError,
    paramName = "date",
}: {
    date: Date | any
    setDate: any
    placeholder?: string
    fullWidth?: boolean
    disabled?: boolean
    calendarProps?: CalendarProps | undefined
    defaultValue?: Date
    addButtonProps?: ButtonProps
    className?: ClassNameValue
    isError?: boolean
    paramName?: string
}) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >

    const dateString = search[paramName]
    const parsedDate = dateString ? new Date(dateString) : undefined

    function reset() {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: undefined,
                },
            })
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        fullWidth && "w-full",
                        isError && "border border-destructive text-destructive",
                        className,
                    )}
                    disabled={disabled}
                    {...addButtonProps}
                >
                    {date ?
                        format(date, "dd/MM/yyyy")
                    :   <span>{placeholder || "Kunni tanlang"}</span>}

                    <CalendarDays className="ml-2 h-4 w-4 text-primary" />

                    {parsedDate && !disabled && (
                        <X
                            onClick={reset}
                            size={16}
                            className="text-destructive  ml-2 cursor-pointer"
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    {...calendarProps}
                    mode="single"
                    selected={new Date(date || (defaultValue as Date))}
                    onSelect={(newDate) => {
                        if (newDate) {
                            setDate(
                                format(new Date(newDate as Date), "yyyy-MM-dd"),
                            )
                        }
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}
