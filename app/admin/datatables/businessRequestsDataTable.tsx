"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Plus, Search, MoreHorizontal, Menu } from "lucide-react";

import { useRouter } from "next/navigation";
import NoTableData from "../common/NoTableData";
import React, { useEffect, useMemo, useState } from "react";
import { BusinessRequest } from "@/app/utils/interfaces";
import { Switch } from "@/components/ui/switch";

interface BusinessRequestsDataTableProps<TData, TValue> {
  data: TData[];
  onRemove: (data: BusinessRequest) => void;
  handleStatusChange: (data: BusinessRequest, status: BusinessRequest["status"]) => void;
}

export function BusinessRequestsDataTable<TData extends BusinessRequest, TValue>({
  data = [],
  onRemove,
  handleStatusChange,
}: BusinessRequestsDataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState<TData[]>(data);
    const [isMounted, setIsMounted] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const statusOptions: BusinessRequest["status"][] = [
    "pending",
    "contacted",
    "approved",
    "rejected",
    "payment_received",
  ];

  const columns = useMemo<ColumnDef<BusinessRequest, unknown>[]>(
    () => [
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRemove(row.original)}>Remove</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
      { accessorKey: "id", header: "ID" },
      { accessorKey: "business_name", header: "Business Name" },
      { accessorKey: "contact_person", header: "Contact Person" },
      { accessorKey: "contact_number", header: "Contact Number" },
      { accessorKey: "whatsapp_number", header: "WhatsApp" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "created_at", header: "Created" },
      { accessorKey: "deleted_at", header: "Deleted At" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <select
            className="border p-2 rounded-md"
            value={row.original.status}
            onChange={(e) => handleStatusChange(row.original, e.target.value as BusinessRequest["status"])}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        ),
      },
    ],
    [onRemove, handleStatusChange]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    }
  });

  useEffect(() => {
    setTableData(data);
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }

  const handleRowClick = (row: any) => {
    console.log("clicked client ID: ", row.original.id);
    const clientId = row.original.id;
    window.open(`/${clientId}`); // Opens the link in a new tab
  };

  return (
    <div className="container px-auto overflow-x-auto ">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl text-black font-semibold">Add Business Page Requests</h2>
      </div>

      <div className="mt-4 relative">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSticky = header.column.columnDef.meta?.isSticky;
                  return (
                    <TableHead
                      key={header.id}
                      className={`${
                        isSticky ? "sticky right-0 z-10 bg-white" : ""
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-auto">
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const isSticky = cell.column.columnDef.meta?.isSticky;
                  return (
                    <TableCell
                      key={cell.id}
                      className={`truncate max-w-[200px] break-words whitespace-normal ${
                        isSticky ? "sticky right-0 z-10" : ""
                      } bg-[#dce1de] ${
                        cell.column.id === "id" && row.original.id
                          ? "underline cursor-pointer"
                          : ""
                      }`}
                      onClick={() => {
                        if (cell.column.id === "id") {
                          handleRowClick(row);
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <NoTableData colSpan={columns.length} />
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
