import { format } from "date-fns"
const currentMonth = new Date()

export const options = [
    {
        value: "yanvar",
        label: "Yanvar",
        className: "bg-card min-w-12",
    },
    {
        value: "fevral",
        label: "Fevral",
        className: "bg-card min-w-12",
    },
    {
        value: "mart",
        label: "Mart",
        className: "bg-card min-w-12",
    },
    {
        value: "aprel",
        label: "Aprel",
        className: "bg-card min-w-12",
    },
    {
        value: "may",
        label: "May",
        className: "bg-card min-w-12",
    },
    {
        value: "iyun",
        label: "Iyun",
        className: "bg-card min-w-12",
    },
    {
        value: "iyul",
        label: "Iyul",
        className: "bg-card min-w-12",
    },
    {
        value: "avgust",
        label: "Avgust",
        className: "bg-card min-w-12",
    },
    {
        value: "sentabr",
        label: "Sentabr",
        className: "bg-card min-w-12",
    },
    {
        value: "oktabr",
        label: "Oktabr",
        className: "bg-card min-w-12",
    },
    {
        value: "noyabry",
        label: "Noyabr",
        className: "bg-card min-w-12",
    },
    {
        value: "dekabr",
        label: "Dekabr",
        className: "bg-card min-w-12",
    },
]

export const years = [
    {
        id: "1",
        name: "2020",
    },
    {
        id: "2",
        name: "2021",
    },
    {
        id: "3",
        name: "2022",
    },
    {
        id: "4",
        name: "2023",
    },
    {
        id: "5",
        name: "2024",
    },
    {
        id: "6",
        name: "2025",
    },
    {
        id: "7",
        name: "2026",
    },
]

export const employees = [
    {
        id: "1",
        employeeId: "EMP001",
        fullName: "John Doe",
        role: "Software Engineer",
        schedule: generateScheduleForMonth(currentMonth, 20),
    },
    {
        id: "2",
        employeeId: "EMP002",
        fullName: "Jane Smith",
        role: "Project Manager",
        schedule: generateScheduleForMonth(currentMonth, 18),
    },
    {
        id: "3",
        employeeId: "EMP003",
        fullName: "Bob Johnson",
        role: "Designer",
        schedule: generateScheduleForMonth(currentMonth, 22),
    },
]

function generateScheduleForMonth(
    month: Date,
    workingDaysCount: number,
): Record<string, boolean> {
    const schedule: Record<string, boolean> = {}
    const year = month.getFullYear()
    const monthNum = month.getMonth()
    const daysInMonth = new Date(year, monthNum + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = format(new Date(year, monthNum, day), "yyyy-MM-dd")
        schedule[dateString] = false
    }

    let workingDaysSet = 0
    while (workingDaysSet < workingDaysCount) {
        const randomDay = Math.floor(Math.random() * daysInMonth) + 1
        const dateString = format(
            new Date(year, monthNum, randomDay),
            "yyyy-MM-dd",
        )

        if (!schedule[dateString]) {
            schedule[dateString] = true
            workingDaysSet++
        }
    }

    return schedule
}
