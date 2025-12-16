import { Card, CardContent } from "@/components/ui/card"
import { ROUTE_VEHICLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { Loader2, MapPin, Navigation } from "lucide-react"
import { useEffect, useState } from "react"

export const LeftSideCars = () => {
    const navigate = useNavigate()
    const search = useSearch({ from: "/_main/route/" })
    const { route_id, order_id } = search
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
    const { data: routeData, isLoading } = useGet<any>(
        `${ROUTE_VEHICLES}/${route_id}`,
        {
            enabled: !!route_id,
        },
    )

    const orderRoutes = routeData?.order_routes || []
    const activeOrderIndex = orderRoutes.findIndex(
        (route: any) => route.order_uuid === order_id,
    )

    useEffect(() => {
        if (route_id && typeof window !== "undefined") {
            const stored = localStorage.getItem(`route_${route_id}_completed`)
            if (stored) {
                setCompletedSteps(new Set(JSON.parse(stored)))
            } else {
                setCompletedSteps(new Set())
            }
        }
    }, [route_id])

    useEffect(() => {
        if (route_id && activeOrderIndex >= 0) {
            const newCompletedSteps = new Set<number>()
            for (let i = 0; i < activeOrderIndex; i++) {
                newCompletedSteps.add(i)
            }

            setCompletedSteps(newCompletedSteps)
            localStorage.setItem(
                `route_${route_id}_completed`,
                JSON.stringify(Array.from(newCompletedSteps)),
            )
        }
    }, [route_id, activeOrderIndex])

    const handleStepClick = (index: number, orderUuid: string) => {
        navigate({
            to: "/route",
            search: {
                ...search,
                order_id: orderUuid,
            },
        })
    }

    if (!route_id) {
        return (
            <Card>
                <CardContent className="p-4">
                    <div className="text-center py-6">
                        <MapPin className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                        <h3 className="text-sm font-semibold mb-1">
                            Yo'l tanlanmagan
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Yo'l bosqichlarini ko'rish uchun ro'yxatdan yo'l
                            tanlang
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-center py-6">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="h-full">
            <CardContent className="p-4 h-full flex flex-col">
                <div className="space-y-4 mb-4">
                    <div className="flex items-center justify-between"></div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1">
                    {orderRoutes.map((route: any, index: number) => {
                        const isActive = index === activeOrderIndex
                        const isCompleted = completedSteps.has(index)

                        return (
                            <div
                                key={route.order_uuid}
                                className={cn(
                                    "relative flex items-start gap-3 pb-5 cursor-pointer hover:bg-accent/30 p-2 rounded-lg transition-all",
                                    isActive && "bg-accent/20",
                                )}
                                onClick={() =>
                                    handleStepClick(index, route.order_uuid)
                                }
                            >
                                {index < orderRoutes.length - 1 && (
                                    <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-border">
                                        <div
                                            className={cn(
                                                "absolute top-0 left-0 w-full transition-all duration-300",
                                                isCompleted ? " h-full" : (
                                                    "bg-border h-0"
                                                ),
                                            )}
                                        />
                                    </div>
                                )}

                                <div className="relative z-10 mt-1">
                                    <div
                                        className={cn(
                                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                                            isActive ?
                                                "border-primary bg-primary text-primary-foreground shadow-md"
                                            : isCompleted ?
                                                "border-primary  text-primary-foreground"
                                            :   "border-border bg-background",
                                        )}
                                    >
                                        {isActive ?
                                            <Navigation className="h-4 w-4" />
                                        :   <span className="font-semibold text-xs">
                                                {index + 1}
                                            </span>
                                        }
                                    </div>
                                    {isActive && (
                                        <div className="absolute -inset-1 rounded-full bg-primary/10 animate-pulse" />
                                    )}
                                </div>

                                <div className="pt-0.5 flex-1 min-w-0">
                                    <h3
                                        className={cn(
                                            "font-medium text-sm leading-tight line-clamp-2",
                                            isActive ?
                                                "text-primary font-semibold"
                                            :   "text-foreground",
                                        )}
                                    >
                                        {route.client_address}
                                    </h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
