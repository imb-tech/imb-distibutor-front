import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const cols = () => {
  return useMemo<ColumnDef<any>[]>(
    () => [
      { header: "Reys kodi", accessorKey: "flight_code", enableSorting: true },
      { header: "ID buyurtma", accessorKey: "order_id", enableSorting: true },
      { header: "Sana", accessorKey: "date", enableSorting: true, meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[100px] w-[120px] truncate">{String(getValue() ?? "")}</div>
        ), },
      { header: "Haydovchi", accessorKey: "driver", enableSorting: true, meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[140px] w-[180px] truncate">{String(getValue() ?? "")}</div>
        ), },
      { header: "Avtomobil raqami", accessorKey: "vehicle_number", enableSorting: true },
      { header: "Ekspeditor", accessorKey: "expediter", enableSorting: true, meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[180px] w-[200px] truncate">{String(getValue() ?? "")}</div>
        ), },

      // Long text columns: customer / address / note / tracking_link / tracking_id / warehouse_address / supplier / route_region / logistic / email
      {
        header: "Mijoz",
        accessorKey: "customer",
        enableSorting: false,
        meta: { className: "min-w-[240px] w-[320px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[140px] w-[220px] truncate">{String(getValue() ?? "")}</div>
        ),
      },

      {
        header: "Manzil",
        accessorKey: "loading_address", // keep your final key (loading_address / unloading_address)
        enableSorting: false,
        meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[200px] w-[220px] truncate">{String(getValue() ?? "")}</div>
        ),
      },

      {
        header: "Eslatma",
        accessorKey: "note",
        enableSorting: true,
        meta: { className: "min-w-[220px] w-[300px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[220px] w-[300px] truncate">{String(getValue() ?? "")}</div>
        ),
      },

      { header: "Status", accessorKey: "status", enableSorting: true, meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[100px] w-[140px] truncate">{String(getValue() ?? "")}</div>
        ), },
      { header: "Vaqt", accessorKey: "time", enableSorting: true,
         meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[100px] w-[140px] truncate">{String(getValue() ?? "")}</div>
        ),
       },
      { header: "Kontakt nomi", accessorKey: "contact_name", enableSorting: true },
      { header: "Rad etish sababi", accessorKey: "rejection_reason", enableSorting: true },
      { header: "Ogʼirlik kg", accessorKey: "weight", enableSorting: true },
      { header: "Ish vaqti: dan", accessorKey: "work_from", enableSorting: true },
      { header: "Ish vaqti: gacha", accessorKey: "work_to", enableSorting: true },
      { header: "Yuk tushirish vaqti", accessorKey: "unloading_time", enableSorting: true },
      { header: "Yuk jo'natuvchi", accessorKey: "cargo_sender", enableSorting: true },
      { header: "Sana marshrut", accessorKey: "route_date", enableSorting: true },

      {
        header: "Reys hududi",
        accessorKey: "route_region",
        enableSorting: true,
        meta: { className: "min-w-[120px] w-[200px]" },
        cell: ({ getValue }) => <div className="min-w-[120px] w-[140px] truncate">{String(getValue() ?? "")}</div>,
      },
      {
        header: "Kuzatuv ID",
        accessorKey: "tracking_id",
        enableSorting: true,
        meta: { className: "min-w-[220px] w-[300px]" },
        cell: ({ getValue }) => <div className="min-w-[220px] w-[300px] truncate">{String(getValue() ?? "")}</div>,
      },

      { header: "Uzunlik", accessorKey: "length", enableSorting: true },
      { header: "Kenglik", accessorKey: "width", enableSorting: true },

      { header: "Toʼlov naqd summasi", accessorKey: "payment_amount", enableSorting: true },
      { header: "Hajm m3", accessorKey: "volume", enableSorting: true },

      {
        header: "Yetkazib beruvchi",
        accessorKey: "supplier",
        enableSorting: true,
        meta: { className: "min-w-[200px] w-[260px]" },
        cell: ({ getValue }) => <div className="min-w-[200px] w-[260px] truncate">{String(getValue() ?? "")}</div>,
      },

      {
        header: "Yetib keldi",
        accessorKey: "arrived",
        enableSorting: true,
        meta: { className: "min-w-[180px] w-[220px]" },
        cell: ({ getValue }) => <div className="min-w-[180px] w-[220px] truncate">{String(getValue() ?? "")}</div>,
      },

      { header: "Ustuvorlik", accessorKey: "priority", enableSorting: true },

      {
        header: "Ombor manzili",
        accessorKey: "warehouse_address",
        enableSorting: true,
        meta: { className: "min-w-[240px] w-[320px]" },
        cell: ({ getValue }) => <div className="min-w-[240px] w-[320px] truncate">{String(getValue() ?? "")}</div>,
      },

      {
        header: "Logist",
        accessorKey: "logistic",
        enableSorting: true,
        meta: { className: "min-w-[200px] w-[260px]" },
        cell: ({ getValue }) => <div className="min-w-[200px] w-[260px] truncate">{String(getValue() ?? "")}</div>,
      },

      { header: "Buyurtma yaratilgan", accessorKey: "created_time", enableSorting: true },

      {
        header: "Kuzatuv link",
        accessorKey: "tracking_link",
        enableSorting: true,
        meta: { className: "min-w-[300px] w-[420px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[300px] w-[420px] truncate">
            {String(getValue() ?? "")}
          </div>
        ),
      },

      {
        header: "Telefon raqami",
        accessorKey: "phone",
        enableSorting: true,
        meta: { className: "min-w-[160px] w-[200px]" },
        cell: ({ getValue }) => <div className="min-w-[160px] w-[200px] truncate">{String(getValue() ?? "")}</div>,
      },

      { header: "Ketdi", accessorKey: "departed", enableSorting: true },

      { header: "Qabul qilingan toʼlov", accessorKey: "cash_received", enableSorting: true },

      {
        header: "Haydovchi eslatmasi",
        accessorKey: "driver_note",
        enableSorting: true,
        meta: { className: "min-w-[220px] w-[300px]" },
        cell: ({ getValue }) => <div className="min-w-[220px] w-[300px] truncate">{String(getValue() ?? "")}</div>,
      },

      {
        header: "Elektron pochta",
        accessorKey: "email",
        enableSorting: true,
        meta: { className: "min-w-[220px] w-[300px]" },
        cell: ({ getValue }) => <div className="min-w-[220px] w-[300px] truncate">{String(getValue() ?? "")}</div>,
      },

      { header: "ETA vaqti", accessorKey: "eta_time", enableSorting: true },
      { header: "Buyurtma tugallanish", accessorKey: "completion", enableSorting: true },
      { header: "Buyurtma boshlash", accessorKey: "start", enableSorting: true },
      { header: "Faoliyat", accessorKey: "activity", enableSorting: true }
    ],
    []
  );
};
