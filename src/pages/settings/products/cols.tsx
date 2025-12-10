import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const currencyMap: Record<number, { label: string; flag: string }> = {
  1: { label: "US Dollar", flag: "🇺🇸" },
  2: { label: "Euro", flag: "🇪🇺" },
  3: { label: "Uzbekistani Som", flag: "🇺🇿" },
  4: { label: "Russian Ruble", flag: "🇷🇺" },
  5: { label: "Kazakhstani Tenge", flag: "🇰🇿" },
  6: { label: "Japanese Yen", flag: "🇯🇵" },
};

export const useoColumns = () => {
  return useMemo<ColumnDef<ProductsType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nomi",
        enableSorting: true,
      },
      {
        accessorKey: "description",
        header: "Eslatma",
        enableSorting: true,
      },
      {
        accessorKey: "unit",
        header: "O'lchov turi",
        enableSorting: true,
      },
      {
        accessorKey: "currency",
        header: "Valyuta",
        enableSorting: true,
        cell: ({ getValue }) => {
          const val = getValue<number>();
          const currency = currencyMap[val];
          if (!currency) return "-";

          return (
            <div className="flex items-center gap-2">
              <span>{currency.flag}</span>
              <span>{currency.label}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Narx",
        enableSorting: true,
      },
    ],
    []
  );
};
