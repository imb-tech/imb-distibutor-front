import { FormCheckbox } from "@/components/form/checkbox"
import { FormFormatNumberInput } from "@/components/form/format-number-input"
import FormInput from "@/components/form/input"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { SETTINGS_CUSTOMERS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { Clock } from "lucide-react"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { MapSearch } from "../map/map-search"

const AddCustomersModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()

    const currentCustomer = getData<CustomersType>(SETTINGS_CUSTOMERS)

    const getDefaultValues = (): CustomerFormType => {
        if (currentCustomer) {
            const coordinates = currentCustomer.coordinates?.map(
                (c) => c?.toString() || "",
            ) || ["", ""]
            const loadingCoordinates = currentCustomer.loading_coordinates?.map(
                (c) => c?.toString() || "",
            ) || ["", ""]

            const schedules: ScheduleFormType[] = []

            for (let i = 0; i < 7; i++) {
                const existingSchedule = currentCustomer.schedules?.find(
                    (s) => s.day_of_week === i,
                )

                if (existingSchedule) {
                    schedules.push({
                        day_of_week: i,
                        start_time: existingSchedule.start_time.substring(0, 5),
                        end_time: existingSchedule.end_time.substring(0, 5),
                        enabled: true,
                    })
                } else {
                    schedules.push({
                        day_of_week: i,
                        start_time: "09:00",
                        end_time: "18:00",
                        enabled: false,
                    })
                }
            }

            return {
                name: currentCustomer.name || "",
                company_name: currentCustomer.company_name || "",
                address: currentCustomer.address || "",
                loading_coordinates: loadingCoordinates,
                coordinates: coordinates,
                phone_number: currentCustomer.phone_number || "",
                email: currentCustomer.email || "",
                note: currentCustomer.note || "",
                schedules,
            }
        }

        return {
            name: "",
            company_name: "",
            address: "",
            loading_coordinates: ["", ""],
            coordinates: ["", ""],
            phone_number: "",
            email: "",
            note: "",
            schedules: Array(7)
                .fill(null)
                .map((_, index) => ({
                    day_of_week: index,
                    start_time: "09:00",
                    end_time: "18:00",
                    enabled: false,
                })),
        }
    }

    const form = useForm<CustomerFormType>({
        defaultValues: getDefaultValues(),
    })

    const { handleSubmit, control, watch, setValue } = form

    const onSuccess = () => {
        toast.success(
            `Mijoz muvaffaqiyatli ${currentCustomer?.id ? "tahrirlandi!" : "qo'shildi"} `,
        )

        clearKey(SETTINGS_CUSTOMERS)
        closeModal()
        queryClient.invalidateQueries({ queryKey: [SETTINGS_CUSTOMERS] })
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const isPending = isPendingCreate || isPendingUpdate
    const handleAddressFilled = useCallback(
        (address: string) => {
            setValue("address", address)
        },
        [setValue],
    )
    const handleCoordinatesChange = useCallback(
        (coords: [string, string]) => {
            setValue("coordinates.0", coords[0])
            setValue("coordinates.1", coords[1])
        },
        [setValue],
    )

    const handleLoadingCoordinatesChange = useCallback(
        (coords: [string, string]) => {
            setValue("loading_coordinates.0", coords[0])
            setValue("loading_coordinates.1", coords[1])
        },
        [setValue],
    )

    const onSubmit = (values: CustomerFormType) => {
        const enabledSchedules = values.schedules
            .filter((schedule) => schedule.enabled)
            .map((schedule) => ({
                day_of_week: schedule.day_of_week,
                start_time: `${schedule.start_time}:00`,
                end_time: `${schedule.end_time}:00`,
            }))

        const coordinates = [
            parseFloat(values.coordinates[0]) || 0,
            parseFloat(values.coordinates[1]) || 0,
        ]

        const loading_coordinates =
            values.loading_coordinates[0] && values.loading_coordinates[1] ?
                [
                    parseFloat(values.loading_coordinates[0]) || 0,
                    parseFloat(values.loading_coordinates[1]) || 0,
                ]
            :   null

        const formattedValues = {
            name: values.name,
            company_name: values.company_name,
            address: values.address,
            coordinates: coordinates,
            loading_coordinates: loading_coordinates,
            phone_number: values.phone_number,
            email: values.email,
            note: values.note,
            schedules: enabledSchedules,
        }

        if (currentCustomer?.id) {
            updateMutate(
                `${SETTINGS_CUSTOMERS}/${currentCustomer.uuid}`,
                formattedValues,
            )
        } else {
            postMutate(SETTINGS_CUSTOMERS, formattedValues)
        }
    }

    return (
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar-x p-1">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
                <div className="space-y-4">
                    <FormInput
                        required
                        name="name"
                        label="F.I.O"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="company_name"
                        label="Tashkilot nomi"
                        methods={form}
                    />
                    <div className="space-y-2">
                        <MapSearch
                            onCoordinatesChange={handleCoordinatesChange}
                            onAddressFilled={handleAddressFilled}
                            initialCoordinates={[
                                watch("coordinates.0") || "",
                                watch("coordinates.1") || "",
                            ]}
                            initialAddress={watch("address") || ""}
                        />
                    </div>

                    <FormFormatNumberInput
                        control={form.control}
                        format="+998 ## ### ## ##"
                        required
                        label={"Telefon"}
                        name={"phone_number"}
                    />
                    <FormInput
                        required
                        name="email"
                        label="Email"
                        type="email"
                        methods={form}
                    />
                    <div className="space-y-2 border p-3 rounded-md">
                        <label className="text-sm font-medium leading-none">
                            Yuk olish manzili (ixtiyoriy)
                        </label>

                        <MapSearch
                            onCoordinatesChange={handleLoadingCoordinatesChange}
                            onAddressFilled={(address) => {}}
                            initialCoordinates={[
                                watch("loading_coordinates.0") || "",
                                watch("loading_coordinates.1") || "",
                            ]}
                        />
                    </div>
                </div>

                <div>
                    <div className="text-sm font-medium mb-1.5">
                        Ish jadvali
                    </div>

                    <div className="space-y-3 max-h-[400px] pr-2">
                        {weekDays.map((day, index) => {
                            return (
                                <div
                                    key={day.id}
                                    className="flex items-start gap-3 p-3 border rounded-lg"
                                >
                                    <div className="min-w-[100px] pt-2">
                                        <FormCheckbox
                                            control={control}
                                            name={`schedules.${index}.enabled`}
                                            label={day.label}
                                        />
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <FormInput
                                                prefixIcon={
                                                    <Clock className="h-4 w-4" />
                                                }
                                                methods={form}
                                                name={`schedules.${index}.start_time`}
                                                type="time"
                                                disabled={
                                                    !watch(
                                                        `schedules.${index}.enabled`,
                                                    )
                                                }
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <FormInput
                                                prefixIcon={
                                                    <Clock className="h-4 w-4" />
                                                }
                                                methods={form}
                                                name={`schedules.${index}.end_time`}
                                                type="time"
                                                disabled={
                                                    !watch(
                                                        `schedules.${index}.enabled`,
                                                    )
                                                }
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <FormTextarea
                    wrapperClassName={"lg:col-span-2"}
                    name="note"
                    label="Izoh"
                    methods={form}
                />

                <div className="flex items-center justify-end lg:col-span-2 ">
                    <Button
                        variant={"default2"}
                        className="min-w-36"
                        type="submit"
                        loading={isPending}
                    >
                        Saqlash
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddCustomersModal

const weekDays = [
    { id: 0, label: "Yakshanba" },
    { id: 1, label: "Dushanba" },
    { id: 2, label: "Seshanba" },
    { id: 3, label: "Chorshanba" },
    { id: 4, label: "Payshanba" },
    { id: 5, label: "Juma" },
    { id: 6, label: "Shanba" },
]
