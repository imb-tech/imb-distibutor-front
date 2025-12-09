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
                        name="product_name"
                        label="Nomi"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="note"
                        label="Eslatma"
                        methods={form}
                    />
                    <FormInput
                        required
                        name="measurement_type"
                        label="O'lchov turlari"
                        methods={form}
                    />
                    <FormNumberInput
                        required
                        name="price_uz"
                        label="Narx uzs"
                        control={form.control}
                    />
                    <FormNumberInput
                        required
                        name="quantity"
                        label="Midqor"
                        control={form.control}
                    />
                    <FormNumberInput
                        required
                        name="total_uz"
                        label="Jami uzs"
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
