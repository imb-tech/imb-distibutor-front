import { useNavigate, useSearch } from "@tanstack/react-router"
import { format } from "date-fns"
import { useEffect } from "react"
import { ButtonProps } from "../ui/button"
import { DatePicker } from "../ui/datepicker"

interface IProps {
    name?: string
    dateFormat?: string
    className?: string
    date?: Date | undefined
    setDate?: (date: Date | undefined) => void
    disabled?: boolean
    paramName?: string
    defaultValue?: Date | string
    addButtonProps?: ButtonProps
    placeholder?: string
}

export default function ParamDatePicker({
    name = "date",
    dateFormat = "yyy-MM-dd",
    className,
    paramName = "date",
    defaultValue,
    disabled,
    addButtonProps,
    placeholder,
    ...props
}: IProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >

    const dateString = search[paramName]
    const parsedDate = dateString ? new Date(dateString) : undefined

    const handleOnChange = (date: Date | undefined) => {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: date ? format(date, dateFormat) : undefined,
                },
            })
        }
    }

    useEffect(() => {
        navigate({ search: { ...search, [paramName]: defaultValue } })
    }, [])

    return (
        <DatePicker
            date={parsedDate}
            setDate={handleOnChange}
            disabled={disabled}
            {...props}
            defaultValue={new Date()}
            addButtonProps={addButtonProps}
            placeholder={placeholder}
            paramName={paramName}
        />
    )
}
