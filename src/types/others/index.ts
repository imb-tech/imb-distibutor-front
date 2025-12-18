type LoadRow = {
    id: string
    product: number
    quantity: number
    price: string
    order: number
    product_name?: string
    description?: string
    unit?: number
    unit_name?: string
    currency?: number
    total_amount?: number
}

type ProductsTableProps = {
    form: any
    fields: LoadRow[]
    productOptions: Array<{
        id: number
        name: string
        unit: number
        price: string
        currency: number
    }>
    remove: (index: number) => void
    copyProduct: (index: number) => void
}

type ProductsType = {
    id: number
    uuid: string
    name: string
    unit: number
    price: string
    description: string
    currency: number
}



type PaginationProps = {
    totalPages?: number | undefined
    paramName?: string
    disabled?: boolean
    page_sizes?: number[]
    pageSizeParamName?: string
    changePageSize?: boolean
    PageSize?: number
}

type User = {
    uuid: string
    full_name: string
    phone: string | null
    actions: unknown | null
    username: string
}


type MonthCalProps = {
    selectedMonth?: Date
    onMonthSelect?: (date: Date) => void
    onYearForward?: () => void
    onYearBackward?: () => void
    callbacks?: {
        yearLabel?: (year: number) => string
        monthLabel?: (month: Month) => string
    }
    variant?: {
        calendar?: {
            main?: ButtonVariant
            selected?: ButtonVariant
        }
        chevrons?: ButtonVariant
    }
    minDate?: Date
    maxDate?: Date
    disabledDates?: Date[]
    disabled?: boolean
}

type ButtonVariant =
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary"
    | null
    | undefined
type Month = {
    number: number
    name: string
}



type NotificationItem = {
    id: number
    title: string
    description: string
    image?: string
    file?: string
    creator?: {
        id: number
        first_name: string
        last_name: string
        profile_photo: string
    }
    date: string
    is_read: boolean
    created_at: string
}


type ListResponse<T> = {
    total_pages: number
    count: number
    results: T[]
}



type Employee = {
    id: string
    employeeId: string
    fullName: string
    role: string
    schedule: Record<string, boolean>
}

type ScheduleTableProps = {
    employees: Employee[]
    month: Date
    onScheduleChange?: (employeeId: string, date: string, isWorking: boolean) => void
    readonly?: boolean
}

type DayInfo = {
    date: Date
    dayNumber: number
    dayName: string
    isWeekend: boolean
    dateString: string
}