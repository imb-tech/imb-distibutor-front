import { format } from "date-fns"
const currentMonth = new Date()
export const options = [
    {
        value: "yanvar",
        label: "Yanvar",
        className: "bg-card",
    },
    {
        value: "fevral",
        label: "Fevral",
        className: "bg-card",
    },
    {
        value: "mart",
        label: "Mart",
        className: "bg-card",
    },
    {
        value: "aprel",
        label: "Aprel",
        className: "bg-card",
    },
    {
        value: "may",
        label: "May",
        className: "bg-card",
    },
    {
        value: "iyun",
        label: "Iyun",
        className: "bg-card",
    },
    {
        value: "iyul",
        label: "Iyul",
        className: "bg-card",
    },
    {
        value: "avgust",
        label: "Avgust",
        className: "bg-card",
    },
    {
        value: "sentabr",
        label: "Sentabr",
        className: "bg-card",
    },
    {
        value: "oktabr",
        label: "Oktabr",
        className: "bg-card",
    },
    {
        value: "noyabry",
        label: "Noyabr",
        className: "bg-card",
    },
    {
        value: "dekabr",
        label: "Dekabr",
        className: "bg-card",
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
