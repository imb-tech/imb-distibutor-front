import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";



export const cols = () => {
  return useMemo<ColumnDef<OrderRow>[]>(
    () => [


      {
        header: "Sana",
        accessorKey: "created_at",
        enableSorting: true,
        meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => {
          const date = getValue<string>();
          return (
            <div className="min-w-[100px] w-[120px] truncate">
              {date ? new Date(date).toLocaleDateString() : ""}
            </div>
          );
        }
      },



      {
        header: "Mijoz",
        accessorKey: "client_data.name", // Access nested field
        enableSorting: false,
        meta: { className: "min-w-[240px] w-[320px]" },
        cell: ({ row }) => (
          <div className="min-w-[140px] w-[220px] truncate">
            {row.original.client_data.name}
          </div>
        ),
      },
      {
        header: "Manzil",
        accessorKey: "client_data.address", // Using client address
        enableSorting: false,
        meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ row }) => (
          <div className="min-w-[200px] w-[220px] truncate">
            {row.original.client_data.address}
          </div>
        ),
      },
      {
        header: "Eslatma",
        accessorKey: "note",
        enableSorting: true,
        meta: { className: "min-w-[220px] w-[300px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[220px] w-[300px] truncate">
            {String(getValue() ?? "")}
          </div>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        enableSorting: true,
        meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => {
          const status = getValue<number>();
          const statusMap: Record<number, string> = {
            0: "Kutilmoqda",
            1: "Jarayonda",
            2: "Yetkazildi",
            3: "Bekor qilindi"
          };
          return (
            <div className="min-w-[100px] w-[140px] truncate">
              {statusMap[status] || "Noma'lum"}
            </div>
          );
        }
      },
      {
        header: "Vaqt",
        accessorKey: "eta", // Using ETA time
        enableSorting: true,
        meta: { className: "min-w-[280px] w-[380px]" },
        cell: ({ getValue }) => {
          const time = getValue<string>();
          return (
            <div className="min-w-[100px] w-[140px] truncate">
              {time ? new Date(time).toLocaleTimeString() : ""}
            </div>
          );
        }
      },

      {
        header: "Rad etish sababi",
        accessorKey: "rejection_reason",
        enableSorting: true
      },
      {
        header: "Ogʼirlik kg",
        accessorKey: "weight",
        enableSorting: true
      },

      {
        header: "Yuk tushirish vaqti",
        accessorKey: "unloading_date",
        enableSorting: true,
        cell: ({ getValue }) => {
          const date = getValue<string>();
          return date ? new Date(date).toLocaleString() : "N/A";
        }
      },



      {
        header: "Toʼlov naqd summasi",
        accessorKey: "cod", // Using COD field
        enableSorting: true
      },
      {
        header: "Hajm m3",
        accessorKey: "volume",
        enableSorting: true
      },
      {
        header: "Yetkazib beruvchi",
        accessorKey: "client_data.company_name", // Using company name
        enableSorting: true,
        meta: { className: "min-w-[200px] w-[260px]" },
        cell: ({ row }) => (
          <div className="min-w-[200px] w-[260px] truncate">
            {row.original.client_data.company_name}
          </div>
        ),
      },

      {
        header: "Ustuvorlik",
        accessorKey: "priority",
        enableSorting: true,
        cell: ({ getValue }) => {
          const priority = getValue<number>();
          const priorityMap: Record<number, string> = {
            1: "Past",
            2: "Oʻrta",
            3: "Yuqori"
          };
          return priorityMap[priority] || "Noma'lum";
        }
      },
      {
        header: "Ombor manzili",
        accessorKey: "depot_name", // Using depot name
        enableSorting: true,
        meta: { className: "min-w-[240px] w-[320px]" },
        cell: ({ getValue }) => (
          <div className="min-w-[240px] w-[320px] truncate">
            {String(getValue() ?? "N/A")}
          </div>
        ),
      },

      {
        header: "Buyurtma yaratilgan",
        accessorKey: "created_at",
        enableSorting: true,
        cell: ({ getValue }) => {
          const date = getValue<string>();
          return date ? new Date(date).toLocaleString() : "N/A";
        }
      },

      {
        header: "Telefon raqami",
        accessorKey: "client_data.phone_number", // Using client phone
        enableSorting: true,
        meta: { className: "min-w-[160px] w-[200px]" },
        cell: ({ row }) => (
          <div className="min-w-[160px] w-[200px] truncate">
            {row.original.client_data.phone_number}
          </div>
        ),
      },
      {
        header: "Elektron pochta",
        accessorKey: "client_data.email", // Using client email
        enableSorting: true,
        meta: { className: "min-w-[220px] w-[300px]" },
        cell: ({ row }) => (
          <div className="min-w-[220px] w-[300px] truncate">
            {row.original.client_data.email}
          </div>
        ),
      },
    ],
    []
  );
};