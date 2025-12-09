type Profile = {
    id: number
    profile: {
        phone_number: string
        phone_number2: string
    }
    username: string
    full_name: string
    face: string
    paid_until: string
    excuses?: number
    actions: string[]
    role: string
    balance: number
    employees_count: number
    office_id?: number
    password: string
}

type ProductsType = {
    id: number
    product_name:string
    eslatma: string
    measurement_type: string
    miqdor: string
    narx_uz: string
    jami_uz: string
}
