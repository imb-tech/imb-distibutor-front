import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import DownloadAsExcel from "@/components/download-as-excel"
import { Card, CardContent } from "@/components/ui/card"
import { CarsTable } from "./table"

const RouteOrderMain = () => {
    return (
        <Card className="h-full w-full overflow-y-auto ">
            <CardContent>
                <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 w-full">
                        <h1 className="text-xl">Marshrutlar</h1>
                        <ParamInput fullWidth />
                    </div>
                    <div className="flex items-center gap-2">
                        <ParamCombobox
                            label="Doimiy"
                            paramName="type"
                            valueKey="id"
                            options={[
                                { id: "1", name: "Doimiy" },
                                { id: "2", name: "Qo'shimcha" },
                            ]}
                            isSearch={false}
                        />
                    </div>
                    <DownloadAsExcel url="/" name="routes" />
                </div>

                <div className="rounded-md border ">
                    <CarsTable />
                </div>
            </CardContent>
        </Card>
    )
}

export default RouteOrderMain
