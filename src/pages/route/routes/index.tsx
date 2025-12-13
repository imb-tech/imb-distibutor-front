import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import { Card, CardContent } from "@/components/ui/card"
import { CarsTable } from "./table"

const RouteOrderMain = () => {
    return (
        <Card className="h-full w-full">
            <CardContent>
                <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 w-full">
                        <h1 className="text-xl">Marshrutlar</h1>
                        <ParamInput fullWidth />
                    </div>
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
            </CardContent>
        </Card>
    )
}

export default RouteOrderMain
