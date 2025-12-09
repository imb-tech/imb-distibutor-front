type OrderRow = {
  id?: number | string
  flight_code: string
  order_id: string
  warehouse: string
  date: string
  driver: string
  vehicle_number: string
  expediter: string
  customer: string
  address: string
  note: string
  status: string
  order_type: "regular" | "extra"
  time: string
  contact_name: string
  rejection_reason: string
  weight: string
  work_from: string
  work_to: string
  unloading_time: string
  cargo_sender: string
  route_date: string
  preferred_transport?: string
  length: string
  width: string
  route_region: string
  tracking_id: string
  payment_amount: string
  volume: string
  supplier: string
  arrived: string
  priority: string
  warehouse_address: string
  logistic: string
  created_time: string
  tracking_link: string
  phone: string
  departed: string
  cash_received: string
  driver_note: string
  email: string
  eta_time: string
  completion: string
  start: string
  activity: string
  cash_payment:string
  start_time:string
  end_time:string
}
