import { useMemo } from 'react';


import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import React from 'react';
import {updateMaintenanceRequest} from '../CRUD.jsx'

//example data type
type Maintenance = {
    request_id: number;
    unit_id: number;
    description: string;
    resolution_notes: string;
    resolved_at: string;
    status: string;
    created_at: string;
    user_id: number;

};

const MaintenanceTable = (Maintenance : any) => {

    //should be memoized or stable
    const data: Maintenance[] = Maintenance.data;

    const columns = useMemo<MRT_ColumnDef<Maintenance>[]>(
        () => [
            {
                accessorKey: 'request_id',
                header: 'Request ID',
                size: 10,
                enableEditing: false,
            },
            {
                accessorKey: 'unit_id',
                header: 'Unit ID',
                size: 10,
                enableEditing: false,

            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'priority',
                header: 'Priority',
                size: 50,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 50,
            },
            {
                accessorKey: 'submitted_at',
                header: 'Created At',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'resolved_at',
                header: 'Resolved At',
                size: 50,
            },
            {
                accessorKey: 'resolution_notes',
                header: 'Resolution Notes',
                size: 50,
            },
            {
                accessorKey: 'user_id',
                header: "Requester's ID",
                size: 10,
                enableEditing: false,

            },

        ],
        [],
    );

    const table = useMaterialReactTable({
        enableEditing: true,
        editDisplayMode: 'modal',
        onEditingRowSave: ({ exitEditingMode, row, table, values }) => {
            console.log(values);
            const newValues ={
                request_id: values.request_id,
                priority: values.priority,
                status: values.status,
                resolution_notes: values.resolution_notes,
            }
            updateMaintenanceRequest(newValues);
            exitEditingMode();
        },
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return <MaterialReactTable table={table} />;
};

export default MaintenanceTable;
