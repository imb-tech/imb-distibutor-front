import { useDownloadAsExcel } from "@/hooks/useDownloadAsExcel"
import type { ReactNode } from "react"
import { Button, ButtonProps } from "../ui/button"

type Props = {
    url: string
    name: string
    children?: ReactNode
    icon?: ReactNode
    variant?: ButtonVariant
    className?: string
    fileType?: string
    addButtonProps?: ButtonProps
}

const DownloadAsExcel = ({
    url,
    name,
    variant = "outline",
    className,
    fileType,
    addButtonProps,
}: Props) => {
    const { trigger, isFetching } = useDownloadAsExcel({ url, name, fileType })
    return (
        <Button
            variant={variant}
            loading={isFetching}
            onClick={trigger}
            className={className}
            {...addButtonProps}
        >
            <div>
                <img src="/excel.png" className="min-w-7 h-7" />
            </div>
        </Button>
    )
}

export default DownloadAsExcel
