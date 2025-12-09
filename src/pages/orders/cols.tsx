import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const cols = () => {
  return useMemo<ColumnDef<any>[]>(
    () => [
      { header: "Reys kodi", accessorKey: "flight_code", enableSorting: true },
      { header: "ID buyurtma", accessorKey: "order_id", enableSorting: true },
      { header: "Sana", accessorKey: "date", enableSorting: true },
      { header: "Haydovchi", accessorKey: "driver", enableSorting: true },
      { header: "Avtomobil raqami", accessorKey: "vehicle_number", enableSorting: true },
      { header: "Ekspeditor", accessorKey: "expediter", enableSorting: true },
      { header: "Mijoz", accessorKey: "customer", enableSorting: false ,minSize:200 },
      { header: "Manzil", accessorKey: "address", enableSorting:false,minSize:200 },
      { header: "Eslatma", accessorKey: "note", enableSorting: true },
      { header: "Status", accessorKey: "status", enableSorting: true },
      { header: "Vaqt", accessorKey: "time", enableSorting: true },
      { header: "Kontakt nomi", accessorKey: "contact_name", enableSorting: true },
      { header: "Rad etish sababi", accessorKey: "rejection_reason", enableSorting: true },
      { header: "Ogʼirlik kg", accessorKey: "weight", enableSorting: true },
      { header: "Ish vaqti: dan", accessorKey: "work_from", enableSorting: true },
      { header: "Ish vaqti: gacha", accessorKey: "work_to", enableSorting: true },
      { header: "Yuk tushirish vaqti", accessorKey: "unloading_time", enableSorting: true },
      { header: "Yuk jo'natuvchi", accessorKey: "cargo_sender", enableSorting: true },
      { header: "Sana marshrut", accessorKey: "route_date", enableSorting: true },
      { header: "Uzunlik", accessorKey: "length", enableSorting: true },
      { header: "Kenglik", accessorKey: "width", enableSorting: true },
      { header: "Reys hududi", accessorKey: "route_region", enableSorting: true },
      { header: "Kuzatuv ID", accessorKey: "tracking_id", enableSorting: true },
      { header: "Toʼlov naqd summasi", accessorKey: "payment_amount", enableSorting: true },
      { header: "Hajm m3", accessorKey: "volume", enableSorting: true },
      { header: "Yetkazib beruvchi", accessorKey: "supplier", enableSorting: true },
      { header: "Yetib keldi", accessorKey: "arrived", enableSorting: true },
      { header: "Ustuvorlik", accessorKey: "priority", enableSorting: true },
      { header: "Ombor manzili", accessorKey: "warehouse_address", enableSorting: true },
      { header: "Logist", accessorKey: "logistic", enableSorting: true },
      { header: "Buyurtma yaratilgan", accessorKey: "created_time", enableSorting: true },
      { header: "Kuzatuv link", accessorKey: "tracking_link", enableSorting: true },
      { header: "Telefon raqami", accessorKey: "phone", enableSorting: true },
      { header: "Ketdi", accessorKey: "departed", enableSorting: true },
      { header: "Qabul qilingan toʼlov", accessorKey: "cash_received", enableSorting: true },
      { header: "Haydovchi eslatmasi", accessorKey: "driver_note", enableSorting: true },
      { header: "Elektron pochta", accessorKey: "email", enableSorting: true },
      { header: "ETA vaqti", accessorKey: "eta_time", enableSorting: true },
      { header: "Buyurtma tugallanish", accessorKey: "completion", enableSorting: true },
      { header: "Buyurtma boshlash", accessorKey: "start", enableSorting: true },
      { header: "Faoliyat", accessorKey: "activity", enableSorting: true }
    ],
    []
  );
};
