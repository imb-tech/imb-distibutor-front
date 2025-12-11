import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import { CarsTable } from "./table"

const RouteOrderMain = () => {
    return (
        <div className="h-full w-full">
            <div className="flex items-center justify-between gap-2 py-4">
                <ParamInput />
                <div className="flex items-center gap-2">
                    <ParamCombobox
                        paramName="doimiy"
                        label="doimiy"
                        options={[]}
                    />
                    <ParamCombobox
                        paramName="excel"
                        label="excel"
                        options={[]}
                    />
                </div>
            </div>

            <div className="rounded-md border overflow-hidden">
                <CarsTable />
            </div>
        </div>
    )
}

export default RouteOrderMain
