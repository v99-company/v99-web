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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { GripVertical, Save, Trash2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import NoTableData from "../common/NoTableData";
import React, { useEffect, useMemo, useState } from "react";
import { Client } from "@/app/utils/interfaces";
import Image from "next/image";

interface PriorityListDataTableProps<TData, TValue> {
  data: TData[];
  onSave: (updatedData: Client[]) => void;
  onRemove: (clientId: number) => void;
}

// Sortable row component
// Sortable row component
const DraggableTableRow = ({ 
  row, 
  children,
  onRemove 
}: { 
  row: any; 
  children: React.ReactNode;
  onRemove: (clientId: number) => void;
}) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: row.original.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className="hover:bg-gray-50">
      {children}
      <TableCell className="flex gap-2">
        <Button
          variant="ghost"
          className="cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-700"
          onClick={() => onRemove(row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export function PriorityListDataTable<TData extends Client, TValue>({
  data = [],
  onSave,
  onRemove
}: PriorityListDataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState<TData[]>(data);
  const [isMounted, setIsMounted] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    logo: false,
    id: true,
    company_name: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setTableData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = () => {
    onSave(tableData);
  };

  const columns = useMemo<ColumnDef<Client, unknown>[]>(
    () => [
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
      {
        id: "drag",
        header: "",
        cell: () => null
      }
    ],
    []
  );

  console.log("PRiority table data: ", tableData);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    rowCount: tableData.length,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: 0, // Always start from the first page
        pageSize: tableData.length // Show all rows
      }
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
    const clientId = row.original.id;
    window.open(`/${clientId}`);
  };

  return (
    <div className="container px-auto overflow-x-auto">
      <div className="flex justify-end mb-4">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
      <div className="mt-4 relative">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <SortableContext
                items={tableData.map(item => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableTableRow
                    key={row.id}
                    row={row}
                    onRemove={onRemove}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`truncate max-w-[200px] break-words whitespace-normal ${
                          cell.column.id === "id" ? "underline cursor-pointer" : ""
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
                    ))}
                  </DraggableTableRow>
                ))}
              </SortableContext>
              {table.getRowModel().rows.length === 0 && (
                <NoTableData colSpan={columns.length} />
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  );
}