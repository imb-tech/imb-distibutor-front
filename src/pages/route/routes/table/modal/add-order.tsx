import { FormMultiCombobox } from "@/components/form/multi-combobox"
import { useForm } from "react-hook-form"

const AddOrderList = () => {
    const form = useForm({})
    const { handleSubmit, reset } = form

    return (
        <>
            <div className="w-full max-w-4xl mx-auto p-1">
                <form>
                    <FormMultiCombobox
                        name="order-list"
                        options={[]}
                        label="Buyurtmalar"
                        control={form.control}
                    />
                </form>
            </div>
        </>
    )
}

export default AddOrderList
