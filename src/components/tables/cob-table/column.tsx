'use client'

import { Switch } from '@/components/ui/switch'
import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Cob = {
  id: string
  job: string
  type: 'daily' | 'weekly'
  api: string
  apiFunc: string
  connection: string
}

export const columns: ColumnDef<Cob>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-left pl-5">ID</div>,
    cell: ({ row }) => {
      return <div className="text-left pl-5">{row.getValue('id')}</div>
    },
  },
  {
    accessorKey: 'job',
    header: () => <div className="text-left pl-5">Job</div>,
    cell: ({ row }) => {
      return <div className="text-left pl-5">{row.getValue('job')}</div>
    },
  },
  {
    accessorKey: 'type',
    header: () => <div className="text-center pl-5">Job</div>,
    cell: ({ row }) => {
      return <div className="text-center pl-5">{row.getValue('type')}</div>
    },
  },
  {
    accessorKey: 'api',
    header: () => <div className="text-center pl-5">API</div>,
    cell: ({ row }) => {
      return <div className="text-center pl-5">{row.getValue('api')}</div>
    },
  },
  {
    accessorKey: 'apiFunc',
    header: () => <div className="text-left pl-5">API Function</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left pl-5">
          {(row.getValue('apiFunc') as string).replace(/ /g, '_')}
        </div>
      )
    },
  },
  {
    accessorKey: 'connection',
    header: 'Connection',
  },
  {
    accessorKey: 'actions',
    header: ({ table }) => {
      return (
        <Switch
          className='data-[state=checked]:bg-green-500'
          checked={
            table.getIsAllPageRowsSelected() 
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Enable all rows"
        />
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex">
          <Switch
            className='data-[state=checked]:bg-green-500'
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Enable row"
          />
        </div>
      )
    },
  },
]
