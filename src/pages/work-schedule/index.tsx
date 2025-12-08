import ParamTabs from "@/components/as-params/tabs"
import ParamYearPicker from "@/components/as-params/year-picker"
import DownloadAsExcel from "@/components/download-as-excel"
import { employees, options } from "./constants"
import ScheduleTable from "./schedule-table"
const currentMonth = new Date()
const WorkSchedule = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <ParamTabs options={options} className={"bg-transparent"} />
                <div className="flex items-center gap-5">
                    <ParamYearPicker />
                    <DownloadAsExcel
                        url="working-schedule"
                        name="ish-jadvali"
                    />
                </div>
            </div>
            <ScheduleTable employees={employees} month={currentMonth} />
        </div>
    )
}

export default WorkSchedule
