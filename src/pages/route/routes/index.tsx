import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { useColumnsCarsOrderTable } from "./cars-col"
import { CarTableRow } from "./car-row"



const RouteOrderMain = () => {
  const columns = useColumnsCarsOrderTable()
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) 
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    )
  }

 

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between gap-2 py-4">
        <ParamInput />
        <div className="flex items-center gap-2">
          <ParamCombobox
            paramName="doimiy"
            label="doimiy"
            options={[]}
          />
          <ParamCombobox
            paramName="excel"
            label="excel"
            options={[]}
          />
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column: any, index) => (
                <TableHead key={index}>{column.header}</TableHead>
              ))}
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carsInOrders.map((car, index) => (
              <CarTableRow
                key={car.id}
                car={car}
                index={index}
                isExpanded={expandedRows.includes(car.id)}
                onToggle={toggleRow}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default RouteOrderMain



const carsInOrders: CarsTypeInOrders[] = [
    {
        id: 1,
        path: "Chilonzor → Sergeli",
        car_model: "Damas",
        car_number: "01 A123AA",
        driver: "Ali Karimov",
        forwarder: "Javlon Sattorov",
        load_capacity: "1.5 tonna",
        shop: ["Chilonzor mebel do‘koni"],
        info: [
            {
                order_id: 1001,
                location: "Toshkent shahri, Chilonzor-5",
                organization: "“Chilonzor Mebel” MCHJ",
                weight: 850,
                density: 0.75,
                working_start: "09:00",
                working_end: "19:00",
                price: 1200000,
                phone_number: "+998901000001",
            },
        ],
        products: [
            { id: 1, name: "Burchak divan", quantity: 2, total_price: 600000 },
            {
                id: 2,
                name: "Choyxonacha stol-stul to‘plami",
                quantity: 1,
                total_price: 300000,
            },
        ],
    },
    {
        id: 2,
        path: "Yunusobod → Chilonzor",
        car_model: "Isuzu NQR",
        car_number: "01 B234BB",
        driver: "Sardor Tursunov",
        forwarder: "Bekzod Normurodov",
        load_capacity: "5 tonna",
        shop: ["Yunusobod mebel markazi"],
        info: [
            {
                order_id: 1002,
                location: "Toshkent shahri, Yunusobod-12",
                organization: "“Yunusobod Furniture” XK",
                weight: 2100,
                density: 0.8,
                working_start: "08:30",
                working_end: "18:00",
                price: 3500000,
                phone_number: "+998901000002",
            },
        ],
        products: [
            {
                id: 1,
                name: "Yotoqxona garnituri",
                quantity: 1,
                total_price: 1900000,
            },
            { id: 2, name: "Shkaf-kupe", quantity: 2, total_price: 1600000 },
        ],
    },
    {
        id: 3,
        path: "Sergeli → Bektemir",
        car_model: "GAZel Next",
        car_number: "01 C345CC",
        driver: "Jamshid Raxmatov",
        forwarder: "Odil Saidov",
        load_capacity: "3 tonna",
        shop: ["Sergeli mebel bozor", "Bektemir salon"],
        info: [
            {
                order_id: 1003,
                location: "Sergeli tumani, 7-mavze",
                organization: "“Sergeli Mebel Zavodi”",
                weight: 1650,
                density: 0.7,
                working_start: "09:00",
                working_end: "20:00",
                price: 2800000,
                phone_number: "+998901000003",
            },
        ],
        products: [
            { id: 1, name: "Ofis stoli", quantity: 4, total_price: 1200000 },
            { id: 2, name: "Ofis kreslosi", quantity: 4, total_price: 1000000 },
        ],
    },
    {
        id: 4,
        path: "Olmazor → Yunusobod",
        car_model: "MAN yuk mashinasi",
        car_number: "01 D456DD",
        driver: "Botir Soliyev",
        forwarder: "Farhod Mamatqulov",
        load_capacity: "10 tonna",
        shop: ["Olmazor mebel savdo uyi"],
        info: [
            {
                order_id: 1004,
                location: "Olmazor tumani, Beruniy ko‘chasi",
                organization: "“Olmazor Lux Mebel”",
                weight: 5200,
                density: 0.85,
                working_start: "08:00",
                working_end: "17:00",
                price: 7200000,
                phone_number: "+998901000004",
            },
        ],
        products: [
            {
                id: 1,
                name: "Zal uchun yumshoq garnitur",
                quantity: 3,
                total_price: 5400000,
            },
            { id: 2, name: "TV tumba", quantity: 4, total_price: 1800000 },
        ],
    },
    {
        id: 5,
        path: "Mirzo Ulug‘bek → Chilonzor",
        car_model: "Damas",
        car_number: "01 E567EE",
        driver: "Murod Xolmurodov",
        forwarder: "Saidamin Qodirov",
        load_capacity: "1.2 tonna",
        shop: ["Mirzo Ulug‘bek ofis mebellari"],
        info: [
            {
                order_id: 1005,
                location: "Mirzo Ulug‘bek tumani, Buyuk Ipak Yo‘li ko‘chasi",
                organization: "“Office Line Mebel”",
                weight: 600,
                density: 0.65,
                working_start: "10:00",
                working_end: "19:30",
                price: 1400000,
                phone_number: "+998901000005",
            },
        ],
        products: [
            { id: 1, name: "Direktor stoli", quantity: 1, total_price: 800000 },
            {
                id: 2,
                name: "Direktor kreslosi",
                quantity: 2,
                total_price: 600000,
            },
        ],
    },
    {
        id: 6,
        path: "Chilonzor → Qoraqamish",
        car_model: "Isuzu NPR",
        car_number: "01 F678FF",
        driver: "Sherzod Abdullayev",
        forwarder: "Laziz Yusupov",
        load_capacity: "4 tonna",
        shop: ["Chilonzor burchak mebel saloni"],
        info: [
            {
                order_id: 1006,
                location: "Chilonzor tumani, Bunyodkor shoh ko‘chasi",
                organization: "“Burchak Mebel Group”",
                weight: 1900,
                density: 0.78,
                working_start: "09:30",
                working_end: "18:30",
                price: 3100000,
                phone_number: "+998901000006",
            },
        ],
        products: [
            { id: 1, name: "Burchak stol", quantity: 3, total_price: 1500000 },
            {
                id: 2,
                name: "Stul to‘plami (4 dona)",
                quantity: 2,
                total_price: 1600000,
            },
        ],
    },
    {
        id: 7,
        path: "Sergeli → Yangihayot",
        car_model: "GAZel biznes",
        car_number: "01 G789GG",
        driver: "Diyorbek Ergashev",
        forwarder: "Oybek Sharipov",
        load_capacity: "2.5 tonna",
        shop: ["Sergeli yumshoq mebel do‘koni"],
        info: [
            {
                order_id: 1007,
                location: "Sergeli tumani, Avtosanoat hududi",
                organization: "“Soft Line Mebel”",
                weight: 1350,
                density: 0.72,
                working_start: "09:00",
                working_end: "20:00",
                price: 2600000,
                phone_number: "+998901000007",
            },
        ],
        products: [
            {
                id: 1,
                name: "Kreslo (yolg‘on kreslo)",
                quantity: 4,
                total_price: 1800000,
            },
            { id: 2, name: "Pufik", quantity: 4, total_price: 800000 },
        ],
    },
    {
        id: 8,
        path: "Yashnobod → Yunusobod",
        car_model: "Hyundai HD-65",
        car_number: "01 H890HH",
        driver: "Abdulaziz Nazarov",
        forwarder: "Baxtiyor G‘aniyev",
        load_capacity: "3.5 tonna",
        shop: ["Yashnobod mebel ombori"],
        info: [
            {
                order_id: 1008,
                location: "Yashnobod tumani, Parkent ko‘chasi",
                organization: "“Yashnobod Mebel Ombori”",
                weight: 2400,
                density: 0.8,
                working_start: "08:30",
                working_end: "18:00",
                price: 3900000,
                phone_number: "+998901000008",
            },
        ],
        products: [
            {
                id: 1,
                name: "Bolalar krovatlari",
                quantity: 5,
                total_price: 2250000,
            },
            { id: 2, name: "Kitob javoni", quantity: 3, total_price: 1650000 },
        ],
    },
    {
        id: 9,
        path: "Bektemir → Sergeli",
        car_model: "FAW yuk mashinasi",
        car_number: "01 J901JJ",
        driver: "Islomjon Eshonqulov",
        forwarder: "Rustam Muhammadiyev",
        load_capacity: "8 tonna",
        shop: ["Bektemir mebel sexi"],
        info: [
            {
                order_id: 1009,
                location: "Bektemir tumani, sanoat zonasi",
                organization: "“Bektemir Mebel Sexi”",
                weight: 4600,
                density: 0.83,
                working_start: "08:00",
                working_end: "17:30",
                price: 6800000,
                phone_number: "+998901000009",
            },
        ],
        products: [
            {
                id: 1,
                name: "Oshxona garnituri",
                quantity: 2,
                total_price: 3600000,
            },
            {
                id: 2,
                name: "Stol-stul komplekti",
                quantity: 3,
                total_price: 3200000,
            },
        ],
    },
    {
        id: 10,
        path: "Chilonzor → Mirzo Ulug‘bek",
        car_model: "Damas",
        car_number: "01 K012KK",
        driver: "Dilshod Mamatov",
        forwarder: "Hasanboy Usmonov",
        load_capacity: "1 tonna",
        shop: ["Chilonzor ofis mebellari saloni"],
        info: [
            {
                order_id: 1010,
                location: "Chilonzor tumani, Qatortol ko‘chasi",
                organization: "“Modern Office Mebel”",
                weight: 520,
                density: 0.68,
                working_start: "10:00",
                working_end: "19:00",
                price: 1300000,
                phone_number: "+998901000010",
            },
        ],
        products: [
            {
                id: 1,
                name: "Ofis stul (xodimlar uchun)",
                quantity: 6,
                total_price: 900000,
            },
            { id: 2, name: "Metal stelling", quantity: 2, total_price: 450000 },
        ],
    },
]
