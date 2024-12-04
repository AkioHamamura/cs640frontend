import { useMemo } from 'react';


import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef, MRT_EditActionButtons,
} from 'material-react-table';
import React from 'react';
// @ts-ignore
import {createMaintenanceRequest, createPayment, updateMaintenanceRequest} from '../CRUD.jsx'
import {Box, Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";

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
                enableEditing: row => row.original.description == '',

            },
            {
                accessorKey: 'priority',
                header: 'Priority',
                size: 50,
                editVariant: 'select',
                editSelectOptions: [{value: 'Low', label: 'Low'},
                    {value: 'Medium', label: 'Medium'},
                    {value: 'High', label: 'High'},
                    {value:'Emergency', label: 'Emergency'},
                    {value:'Normal', label: 'Normal'}],
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 50,
                editVariant: 'select',
                editSelectOptions: [{value: 'Pending', label: 'Pending'},
                    {value: 'In Progress', label: 'In Progress'},
                    {value: 'Resolved', label: 'Resolved'},
                    {value: 'Cancelled', label: 'Cancelled'}],
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
        editDisplayMode: 'row',
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
        renderCreateRowDialogContent: ({ table, row, internalEditComponents,  }) => (
            <>
                <>
                    <DialogTitle >Make payment</DialogTitle>
                    <DialogContent onClick={() => console.log(internalEditComponents)}
                                   sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        {internalEditComponents} {/* or render custom edit components here */}
                    </DialogContent>
                    <DialogActions>
                        <MRT_EditActionButtons variant="text" table={table} row={row} />
                    </DialogActions>
                </>
            </>

        ),
        renderBottomToolbar:({table}) => (
            <Box>
                <Button onClick={()=>{
                    //Open a modal with a form to add a new user
                    table.setCreatingRow(true);
                }} variant="contained" color="success" >Request Maintenance</Button>

            </Box>
        ),
        onCreatingRowSave: ({ exitCreatingMode, row, table, values }) => {
            createMaintenanceRequest(values);
            exitCreatingMode();
        }
    });

    return <MaterialReactTable table={table} />;
};

export default MaintenanceTable;
