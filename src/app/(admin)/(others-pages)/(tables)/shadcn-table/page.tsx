import { Cob, columns } from "@/components/tables/cob-table/column"
import { DataTable } from "@/components/tables/cob-table/data-table"
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"


async function getData(): Promise<Cob[]> {
  // Fetch data from your API here.
  return [
    {
      id: "COB001",
      job: "Schedule Job 1",
      type: "daily",
      api: "POST",
      apiFunc: "COB_POST_BAKONG",
      connection: "SQL_Server",
    },
    {
      id: "COB002",
      job: "Schedule Job 2",
      type: "weekly",
      api: "",
      apiFunc: "",
      connection: "Oracle",
    },
    {
      id: "COB003",
      job: "Schedule Job 3",
      type: "daily",
      api: "POST",
      apiFunc: "",
      connection: "SQL_Server",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
