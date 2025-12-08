import ParamTabs from "@/components/as-params/tabs"
import { settingsTabs } from "./constants"

const Settings=()=>{
    return (
        <>
        <div className="">
            <ParamTabs options={settingsTabs} className={"bg-transparent"}/>




        </div>
        
        
        </>
    )

}

export default Settings