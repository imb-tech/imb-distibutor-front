import { useNavigate, useSearch } from "@tanstack/react-router"
import { format, parse } from "date-fns"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select2"

interface ParamYearPickerProps {
    name?: string
    yearFormat?: string
    className?: string
    paramName?: string
    disabled?: boolean
    minYear?: number
    maxYear?: number
    variant?: "default" | "outline" | "ghost"
    defaultValue?: number
}

const DEFAULT_YEAR_FORMAT = "yyyy"

export default function ParamYearPicker({
    yearFormat = DEFAULT_YEAR_FORMAT,
    paramName = "year",
    disabled,
    minYear = 2000,
    maxYear = new Date().getFullYear() + 10,
    variant,
    className,
    defaultValue,
}: ParamYearPickerProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >

    const [isInitialized, setIsInitialized] = useState(false)

    const yearString = search[paramName]
    const parsedYear: Date | undefined =
        yearString ? parse(yearString, yearFormat, new Date()) : undefined

    const selectedYear =
        parsedYear && !isNaN(parsedYear.getTime()) ?
            parsedYear.getFullYear()
        :   undefined

    useEffect(() => {
        if (!isInitialized && !yearString) {
            const defaultYear = defaultValue || new Date().getFullYear()
            const date = new Date(defaultYear, 0, 1)
            const formattedYear = format(date, yearFormat)

            navigate({
                search: {
                    ...search,
                    [paramName]: formattedYear,
                },
                replace: true,
            })

            setIsInitialized(true)
        }
    }, [
        yearString,
        isInitialized,
        paramName,
        yearFormat,
        navigate,
        search,
        defaultValue,
    ])

    const handleYearSelect = (year: string) => {
        if (!disabled) {
            const date = new Date(parseInt(year), 0, 1)
            const formattedYear = format(date, yearFormat)
            navigate({
                search: {
                    ...search,
                    [paramName]: formattedYear,
                },
            })
        }
    }

    // Generate year range
    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => minYear + i,
    ).reverse()

    return (
        <Select
            value={selectedYear?.toString()}
            onValueChange={handleYearSelect}
            disabled={disabled}
        >
            <SelectTrigger className={className || "w-[120px]"}>
                <SelectValue
                    placeholder={selectedYear?.toString() || "Select year"}
                />
            </SelectTrigger>
            <SelectContent>
                {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
