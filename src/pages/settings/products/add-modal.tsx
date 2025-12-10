import { FormCombobox } from "@/components/form/combobox"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { SETTINGS_PRODUCTS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useGlobalStore } from "@/store/global-store"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AddProductModal = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create")
    const { getData, clearKey } = useGlobalStore()

    const currentProduct = getData<ProductsType>(SETTINGS_PRODUCTS)
    const form = useForm<ProductsType>({
        defaultValues: currentProduct,
    })

    const CURRENCY_OPTIONS = [
        { label: "US Dollar (USD)", value: 1 },
        { label: "Euro (EUR)", value: 2 },
        { label: "Uzbekistani Som (UZS)", value: 3 },
        { label: "Russian Ruble (RUB)", value: 4 },
        { label: "Kazakhstani Tenge (KZT)", value: 5 },
        { label: "Japanese Yen (JPY)", value: 6 },
    ];

    const { handleSubmit, reset } = form

    const onSuccess = () => {
        toast.success(
            `Mahsulot muvaffaqiyatli ${currentProduct?.id ? "tahrirlandi!" : "qo'shildi"} `,
        )

        reset()
        clearKey(SETTINGS_PRODUCTS)
        closeModal()
        queryClient.refetchQueries({ queryKey: [SETTINGS_PRODUCTS] })
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const isPending = isPendingCreate || isPendingUpdate

    const onSubmit = (values: ProductsType) => {
        if (currentProduct?.id) {
            updateMutate(`${SETTINGS_PRODUCTS}/${currentProduct.id}`, values)
        } else {
            postMutate(SETTINGS_PRODUCTS, values)
        }
    }

    return (
        <>
            <div className="w-full max-w-4xl mx-auto p-1">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid md:grid-cols-2 gap-4"
                >
                    <FormInput
                        required
                        name="name"
                        label="Nomi"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="description"
                        label="Eslatma"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="unit"
                        label="O'lchov turlari"
                        methods={form}
                    />
                    <FormCombobox
                        name="currency"
                        control={form.control}
                        placeholder="Valyuta"
                        options={CURRENCY_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
                        className="w-full"
                        labelKey="label"
                        valueKey="value"
                    />
                    <FormNumberInput
                        required
                        name="price"
                        label="Narxi"
                        control={form.control}
                    />


                    <div className="flex items-center justify-end gap-2 md:col-span-2">
                        <Button
                            variant={"default2"}
                            className="min-w-36 w-full md:w-max"
                            type="submit"
                            loading={isPending}
                        >
                            {"Saqlash"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProductModal
