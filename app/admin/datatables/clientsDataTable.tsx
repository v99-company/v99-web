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


interface ClientDataTableProps<TData, TValue> {
  data: TData[];
  onRemove: (data: Client) => void;
  onEdit: (data: Client) => void;
}

export function ClientDataTable<TData extends Client, TValue>({
  data = [],
  onRemove,
  onEdit,
}: ClientDataTableProps<TData, TValue>) {
  const [limit, setLimit] = useState(200); // Default limit
  const [tableData, setTableData] = useState<TData[]>(data);
  const [isMounted, setIsMounted] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: true,
    email: true,
    company_name: true,
    description: true,
    full_description: false,
    address: true,
    city: true,
    state: true,
    pincode: true,
    mobile_number: true,
    whatsapp: true,
    gmap: false,
    yt_video: true,
    social_media: false,
    logo: true,
    images: true
  });

  const router = useRouter();

  const columns = useMemo<ColumnDef<Client, unknown>[]>(
    () => [
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onRemove(row.original)}>
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </>
         
        )
      },
      {
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => (
          <Image
            src={row.getValue("logo")}
            alt="Logo"
            width={50}
            height={50}
            className="h-12 w-12 rounded-full"
          />
        )
      },
      
      { accessorKey: "id", header: "Id", cell: ({ row }) =>{
        return <div className="underlined">{row.original.id}</div>;
      }},
      { accessorKey: "company_name", header: "Company Name" },
      { accessorKey: "contact_person", header: "Contact Person" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "mobile_number", header: "Mobile" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "pincode", header: "Pin Code" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "gmap", header: "Map Location" },
      // {
      //   accessorKey: "images",
      //   header: "Images",
      //   cell: ({ row }) => (
      //     <span>{row.getValue("images").length} Image(s)</span>
      //   ),
      // },
      // {
      //   accessorKey: "yt_video",
      //   header: "YouTube Videos",
      //   cell: ({ row }) => (
      //     <span>{row.getValue("yt_video").length} Video(s)</span>
      //   ),
      // },
    ],
    [onEdit, onRemove]
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
    console.log('clicked client ID: ', row.original.id);
    const clientId = row.original.id;
    window.open(`/${clientId}`, '_blank'); // Opens the link in a new tab
  };
  
  const onAddClient = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default action if this is part of a form
    event.preventDefault();

    console.log("Add Client Button Clicked");
    const url = "/admin/clients/addClient";
    window.open(url, '_blank'); // Opens the link in a new tab
};

  return (
    <div className="container px-auto overflow-x-auto ">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl text-black font-semibold">All Pages</h2>
        <div className="flex gap-2 items-center">
          {/* Add Client Button */}
          <div>
            <Button
              variant="outline"
              onClick={onAddClient}
              className="px-1.5 py-1.5 flex flex-row items-center space-x-1 text-sm border-none whitespace-nowrap bg-[#2a383f] rounded-md hover:bg-black"
            >
              <Plus size={16} className="text-white" />
              <span className="font-semibold text-zinc-100 pr-4">
                Add Page
              </span>
            </Button>
          </div>

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
        </div>
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
  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
  {row.getVisibleCells().map((cell) => {
    const isSticky = cell.column.columnDef.meta?.isSticky;
    return (
      <TableCell
        key={cell.id}
        className={`truncate max-w-[200px] break-words whitespace-normal ${isSticky ? "sticky right-0 z-10" : ""} bg-[#dce1de] ${
          cell.column.id === 'id' && row.original.id ? "underline cursor-pointer" : ""
        }`} 
        onClick={() => {
          if (cell.column.id === 'id') {
            handleRowClick(row);
          }
        }}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
