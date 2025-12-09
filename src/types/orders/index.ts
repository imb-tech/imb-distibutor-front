type OrderRow = {
  id?: number | string

  // Basic
  order_type: "regular" | "extra"
  supplier: string
  order_id: string
  date: string
  address: string
  // Customer details
  customer: string
  loading_address: string
  unloading_address: string
  phone: string
  note: string
  preferred_transport?: string
  payment_type: string
  payment_amount: string

  // Cargo details
  weight: string
  cargo_type: string
  volume: string

  // Legacy or backend fields
  flight_code: string
  warehouse: string
  driver: string
  vehicle_number: string
  expediter: string
  status: string
  time: string
  contact_name: string
  rejection_reason: string
  work_from: string
  work_to: string
  unloading_time: string
  cargo_sender: string
  route_date: string
  length: string
  width: string
  route_region: string
  tracking_id: string
  arrived: string
  priority: string
  warehouse_address: string
  logistic: string
  created_time: string
  tracking_link: string
  departed: string
  cash_received: string
  driver_note: string
  email: string
  eta_time: string
  completion: string
  start: string
  activity: string
  cash_payment: string
  start_time: string
  end_time: string

  // Optional future field
  product_count?: number
}
