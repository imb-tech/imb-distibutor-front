import { useLocation } from "@tanstack/react-router"
import {
    CalendarDays,
    ClipboardList,
    Route,
    Settings,
    Split,
    TrendingUp,
} from "lucide-react"
import { ReactNode, useMemo } from "react"
import { useUser } from "./useUser"

export interface MenuItem {
    label: string
    icon?: ReactNode
    path: string
    items?: MenuItem[]
}

const filterMenuItems = (
    items: MenuItem[],
    allowedModules: string[],
): MenuItem[] => {
    return items.reduce<MenuItem[]>((acc, item) => {
        const filteredItem: MenuItem = { ...item }

        if (item.items) {
            filteredItem.items = filterMenuItems(item.items, allowedModules)
            if (filteredItem.items.length > 0) {
                filteredItem.path = filteredItem.items[0].path
            }
        }

        // const isAllowed =
        //     (item.allowKey &&
        //         allowedModules.includes(item.allowKey as Action)) ||
        //     (filteredItem.items && filteredItem.items.length > 0)

        // if (isAllowed) {
        // }

        acc.push(filteredItem)
        return acc
    }, [])
}

const findChildPaths = (items: MenuItem[], pathname: string): MenuItem[] => {
    for (const item of items) {
        if (pathname === item.path || pathname.startsWith(item.path + "/")) {
            return item.items ?? []
        }

        if (item.items) {
            const hasMatchingChild = item.items.some(
                (subItem) =>
                    pathname === subItem.path ||
                    pathname.startsWith(subItem.path + "/"),
            )
            if (hasMatchingChild) {
                return item.items
            }

            const found = findChildPaths(item.items, pathname)
            if (found.length > 0) {
                return found
            }
        }
    }

    return []
}

export const usePaths = () => {
    const { pathname } = useLocation()
    const { actions } = useUser()

    const safeActions: string[] = actions ?? []

    const items = useItems()

    const filteredItems = useMemo(
        () => filterMenuItems(items, safeActions),
        [items, safeActions],
    )

    const childPaths = useMemo(
        () => findChildPaths(filteredItems, pathname),
        [filteredItems, pathname],
    )

    return {
        childPaths,
        filteredItems,
    }
}

export const useItems = () =>
    useMemo<MenuItem[]>(
        () => [
            {
                label: "Marshrut",
                icon: <Route width={18} />,
                path: "/route",
            },
            {
                label: "Buyurtmalar",
                icon: <Split width={18} />,
                path: "/orders",
            },
            {
                label: "Ish jadvali",
                icon: <CalendarDays width={18} />,
                path: "/work-schedule",
            },
            {
                label: "Moliya",
                icon: <TrendingUp width={18} />,
                path: "/finance",
            },

            {
                label: "Hisobotlar",
                icon: <ClipboardList width={18} />,
                path: "/reports/cars",
                items: [
                    {
                        label: "Avtomobillar",
                        path: "/reports/cars",
                    },
                    {
                        label: "Haydovchilar",
                        path: "/reports/drivers",
                    },
                    {
                        label: "Ekspeditorlar",
                        path: "/reports/freight-forwarders",
                    },
                    {
                        label: "Agentlar",
                        path: "/reports/agents",
                    },
                    {
                        label: "Logistlar",
                        path: "/reports/logisticians",
                    },
                ],
            },
            {
                label: "Sozlamalar",
                icon: <Settings width={18} />,
                path: "/settings/products",
                items: [
                    {
                        label: "Mahsulotlar",
                        path: "/settings/products",
                    },
                    {
                        label: "Haydovchilar",
                        path: "/settings/drivers",
                    },
                    {
                        label: "Avtomobillar",
                        path: "/settings/cars",
                    },
                    {
                        label: "Ekspeditorlar",
                        path: "/settings/freight-forwarders",
                    },
                    {
                        label: "Ombor",
                        path: "/settings/warehouse",
                    },
                    {
                        label: "Logistlar",
                        path: "/settings/logisticians",
                    },
                    {
                        label: "Mijozlar",
                        path: "/settings/customers",
                    },
                ],
            },
        ],
        [],
    )
