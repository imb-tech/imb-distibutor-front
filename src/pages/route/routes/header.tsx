import { ParamCombobox } from "@/components/as-params/combobox"
import ParamDatePicker from "@/components/as-params/date-picker"
import ParamInput from "@/components/as-params/input"
import DownloadAsExcel from "@/components/download-as-excel"
import { Button } from "@/components/ui/button"
import { ORDERS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import { format } from "date-fns"
import { CirclePlus, Route } from "lucide-react"

const HeaderRoute = () => {
    const { openModal: createOrder } = useModal(ORDERS)
    const { clearKey } = useGlobalStore()
    const handleCreate = () => {
        clearKey(ORDERS)
        createOrder()
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center gap-3">
                <h1 className="md:text-xl ">Rejalashtirilmagan buyurtmalar </h1>
                <div className="flex items-center gap-3">
                    <ParamDatePicker
                        placeholder="Bugun"
                        className={"max-w-20 min-w-40"}
                        defaultValue={format(String(new Date()), "yyyy-MM-dd")}
                    />
                    <Button
                        onClick={handleCreate}
                        type="button"
                        icon={<CirclePlus size={18} />}
                        className="bg-primary text-white"
                    >
                        Buyurtma qo'shish
                    </Button>
                    <Button
                        className="bg-green-500 text-white"
                        type="button"
                        icon={<Route size={18} />}
                    >
                        Marshrutlash
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <p className="border border-primary rounded-md w-max px-3 py-0.5 text-primary">
                    90 141 kg O'g'irlik
                </p>
                <p className="border border-primary rounded-md w-max px-3 py-0.5 text-primary">
                    500 Buyurtmalar soni
                </p>
            </div>

            <div className="flex items-center gap-3">
                <ParamInput fullWidth />
                <div className="flex items-center gap-3">
                    <ParamCombobox
                        label="Doimiy"
                        paramName="type"
                        options={[
                            { id: "constant", name: "Doimiy" },
                            { id: "addition", name: "Qo'shimcha" },
                        ]}
                    />
                    <DownloadAsExcel
                        addButtonProps={{ variant: "outline" }}
                        name="Yuklab olish"
                        url="/excel"
                    />
                </div>
            </div>
        </div>
    )
}

export default HeaderRoute
