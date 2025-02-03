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
import { Client } from "@/app/utils/interfaces";
import Image from "next/image";

interface ListingDataTableProps<TData, TValue> {
  data: TData[];
  onAdd: (data: Client) => void;
}

export function ListingDataTable<TData extends Client, TValue>({
  data = [],
  onAdd
}: ListingDataTableProps<TData, TValue>) {
  const [limit, setLimit] = useState(200); // Default limit
  const [tableData, setTableData] = useState<TData[]>(data);
  const [isMounted, setIsMounted] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    logo: false,
    id: true,
    company_name: true,
    description: false,
    full_description: false,
    address: false,
    city: false,
    state: false,
    pincode: false,
    email: false,
    mobile_number: false,
    whatsapp: false,
    gmap: false,
    contact_person: false
  });

  const router = useRouter();

  const columns = useMemo<ColumnDef<Client, unknown>[]>(
    () => [
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <>
            <Button
              variant="ghost"
              onClick={() => onAdd(row.original)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add</span>
            </Button>
          </>
        )
      },
      {
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => (
          <Image
            unoptimized
            src={row.getValue("logo")}
            alt="Logo"
            width={50}
            height={50}
            className="h-12 w-12 rounded-full"
          />
        )
      },

      {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => {
          return <div className="underlined">{row.original.id}</div>;
        }
      },
      { accessorKey: "company_name", header: "Company Name" },
      { accessorKey: "contact_person", header: "Contact Person" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "mobile_number", header: "Mobile" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "pincode", header: "Pin Code" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "gmap", header: "Map Location" }
      
    ],
    [onAdd]
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
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
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

  const onAddClient = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default action if this is part of a form
    event.preventDefault();

    console.log("Add Client Button Clicked");
    const url = "/admin/addClient";
    window.open(url, "_blank"); // Opens the link in a new tab
  };

  return (
    <div className="container px-auto overflow-x-auto ">
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
        {/* Main Filter Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* Column Filter Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Column Filter</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {Object.keys(columnVisibility).map((key) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={columnVisibility[key]}
                    onCheckedChange={(value) =>
                      setColumnVisibility((prev) => ({
                        ...prev,
                        [key]: value
                      }))
                    }
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>

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
