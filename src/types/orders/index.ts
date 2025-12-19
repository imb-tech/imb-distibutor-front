type OrderRow = {
  end_time: string;
  shipper: string;
  vehicle_number: string;
  orderId: any;
  id: any;
  // Required fields from API
  client_data: {
    coordinates: [number, number];
    uuid: string;
    is_active: boolean;
    name: string;
    company_name: string;
    address: string;
    address_zone: string | null;
    phone_number: string;
    email: string;
    note: string;
  };

  loads: Array<{
    id?: number;
    product_name:string
    quantity: number;
    price: string;
    order: number;
    product?: number;
    is_active:boolean
  }>;
  
  driver_name: string | null;
  vehicle_name: string | null;
  depot_name: string;
  uuid: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  time_to_drop:string
  code: string | null;
  type: number;
  priority: number;
  cod: string;
  unloading_date: string;
  weight: number;
  product_count: number;
  volume: number;
  status: number;
  eta: string;
  delivered_time: string | null;
  in_progress_time: string | null;
  service_time: string | null;
  rejection_reason: string | null;
  e_pod: string | null;
  recipient_name: string | null;
  recipient_amount: string | null;
  recipient_image: string | null;
  note: string;
  depot: number;
  priority_vehicle: number;
  client: number;
};

type  DeliveryLoad = {
  is_active: boolean;
  quantity: number;
  price: string;
  order: number;
  product: number;
}

type Delivery = {
  uuid: any;
  is_active: boolean;
  code: string;
  type: 1 | 2 | number; // Assuming type can be other numbers too
  scheduled_delivery_date: string; // ISO 8601 date string
  priority: number;
  cod: string;
  loading_coordinates: string; // Missing in your type
  weight: number;
  product_count: number;
  volume: number;
  status: number;
  service_time: number; // Changed from string to number (from JSON)
  note: string;
  depot: number;
  shipper: number;
  priority_vehicle: number;
  client: number;
  payment_type: number; // Missing in your type
  order_type?:"extra"|"regular"; // Optional since not in JSON
  loads?: DeliveryLoad[]; 
  phone_number:number|string
};


