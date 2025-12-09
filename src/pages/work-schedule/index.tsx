import { ParamCombobox } from "@/components/as-params/combobox"
import ParamTabs from "@/components/as-params/tabs"
import DownloadAsExcel from "@/components/download-as-excel"
import { employees, options,years } from "./constants"
import ScheduleTable from "./schedule-table"
const currentMonth = new Date()
const WorkSchedule = () => {
    return (
        <div>
            <div className="flex  justify-between ">
                <ParamTabs options={options} className={"bg-transparent"} />
                <div className="flex items-center gap-3">
                    <ParamCombobox paramName="year" options={years} label="Yil"  addButtonProps={{size:"sm"}} />
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
