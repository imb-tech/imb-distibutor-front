import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { DataTable } from "@/components/ui/datatable"
import { SETTINGS_CARS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useGlobalStore } from "@/store/global-store"
import TableHeader from "../table-header"
import { useColumnsCarsTable } from "./cars-cols"
import AddCarsModal from "./add-cars"

const Cars = () => {
    const { data } = useGet<DriversType>(SETTINGS_CARS)
    const { getData, setData } = useGlobalStore()
    const item = getData<ProductsType>(SETTINGS_CARS)

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal: openCreateModal } = useModal(`create`)
    const columns = useColumnsCarsTable()

    const handleDelete = (row: { original: CarsType }) => {
        setData(SETTINGS_CARS, row.original)
        openDeleteModal()
    }
    const handleEdit = (item: CarsType) => {
        setData(SETTINGS_CARS, item)
        openCreateModal()
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={carsData}
                numeration={true}
                onDelete={handleDelete}
                onEdit={({ original }) => handleEdit(original)}
                head={
                    <TableHeader
                        fileName="Avtomobillar"
                        url="excel"
                        storeKey={SETTINGS_CARS}
                    />
                }
            />
            <DeleteModal path={SETTINGS_CARS} id={item?.id} />
            <Modal
                size="max-w-2xl"
                title={item?.id ? "Tahrirlash" : "Qo'shish"}
                modalKey="create"
            >
              <AddCarsModal/>
            </Modal>
        </>
    )
}

export default Cars

const carsData: CarsType[] = [
    {
        id: 1,
        path: "Toshkent → Samarqand",
        car_model: "Isuzu NPR",
        car_number: "01 A123AA",
        driver: "Aliyev Shavkat Karimovich",
        license_type: "C",
        forwarder: "Karimov Dilshod",
        series_number: "NPR75L-001",
        year: "2019",
        fuel_type: "Dizel",
        load_capacity: "5 tonna",
        warehouse: "Toshkent markaziy ombori",
    },
    {
        id: 2,
        path: "Toshkent → Farg‘ona",
        car_model: "GAZel Next",
        car_number: "10 B456BB",
        driver: "Tursunov Javlon Mirzayevich",
        license_type: "B, C",
        forwarder: "Sattorov Alisher",
        series_number: "GNEXT-204",
        year: "2020",
        fuel_type: "Benzin / Gaz",
        load_capacity: "3 tonna",
        warehouse: "Farg‘ona filiali ombori",
    },
    {
        id: 3,
        path: "Samarqand → Buxoro",
        car_model: "MAN TGS",
        car_number: "30 C789CC",
        driver: "Rahmonov Doston Shuxratovich",
        license_type: "C, E",
        forwarder: "Yoqubov Sherzod",
        series_number: "TGS18-400-089",
        year: "2018",
        fuel_type: "Dizel",
        load_capacity: "20 tonna",
        warehouse: "Samarqand markaziy ombori",
    },
    {
        id: 4,
        path: "Toshkent → Nukus",
        car_model: "DAF XF",
        car_number: "90 D111DD",
        driver: "Xudoyberdiyev Dilshod Akramovich",
        license_type: "C, E",
        forwarder: "Sodiqov Umar",
        series_number: "XF480-552",
        year: "2021",
        fuel_type: "Dizel",
        load_capacity: "22 tonna",
        warehouse: "Toshkent eksport ombori",
    },
    {
        id: 5,
        path: "Andijon → Toshkent",
        car_model: "Hyundai HD78",
        car_number: "60 E222EE",
        driver: "Qodirova Mahliyo Saidovna",
        license_type: "C",
        forwarder: "Karimova Nilufar",
        series_number: "HD78-331",
        year: "2017",
        fuel_type: "Dizel",
        load_capacity: "4 tonna",
        warehouse: "Andijon ombori",
    },
    {
        id: 6,
        path: "Buxoro → Qarshi",
        car_model: "KamAZ 65117",
        car_number: "70 F333FF",
        driver: "Sattorov Alisher Bekzodovich",
        license_type: "C, E",
        forwarder: "Tursunov Aziz",
        series_number: "65117-744",
        year: "2016",
        fuel_type: "Dizel",
        load_capacity: "15 tonna",
        warehouse: "Buxoro ombori",
    },
    {
        id: 7,
        path: "Toshkent shahar ichki yetkazib berish",
        car_model: "Chevrolet Labo",
        car_number: "01 G444GG",
        driver: "Ortiqova Madina Farhodovna",
        license_type: "B",
        forwarder: "Akramova Mohira",
        series_number: "LABO-119",
        year: "2022",
        fuel_type: "Benzin / Gaz",
        load_capacity: "0.8 tonna",
        warehouse: "Toshkent shahardagi mini-ombor",
    },
    {
        id: 8,
        path: "Qarshi → Termiz",
        car_model: "Isuzu NQR",
        car_number: "25 H555HH",
        driver: "Yoqubov Sherzod Murodovich",
        license_type: "C",
        forwarder: "Rahimov Islombek",
        series_number: "NQR90-228",
        year: "2019",
        fuel_type: "Dizel",
        load_capacity: "6 tonna",
        warehouse: "Qarshi filiali ombori",
    },
    {
        id: 9,
        path: "Toshkent → Xorazm",
        car_model: "Volvo FH",
        car_number: "85 J666JJ",
        driver: "Sodiqov Umar Rustamovich",
        license_type: "C, E",
        forwarder: "Normatov Ibrohim",
        series_number: "FH500-904",
        year: "2020",
        fuel_type: "Dizel",
        load_capacity: "24 tonna",
        warehouse: "Toshkent markaziy ombori",
    },
    {
        id: 10,
        path: "Nukus → Urganch",
        car_model: "GAZon Next",
        car_number: "95 K777KK",
        driver: "Karimova Nilufar Ulug‘bek qizi",
        license_type: "C",
        forwarder: "Teshaboyev Sardor",
        series_number: "GAZON-612",
        year: "2018",
        fuel_type: "Dizel",
        load_capacity: "5 tonna",
        warehouse: "Nukus ombori",
    },
]
