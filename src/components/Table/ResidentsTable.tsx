import {useEffect, useMemo, useState} from 'react';


import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef, MRT_RowSelectionState, MRT_EditActionButtons,
} from 'material-react-table';
import React from 'react';
import {Box, Button, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {createProperty, deleteProperty, updateProperty} from "@/components/CRUD";

//example data type
/*


 */
type Residents = {
    unit_id: number;
    address: string;
    city: string;
    email: string;
    first_name: string;
    last_name: string;
    monthly_rent: number;
    name: string;
    property_id: number;
    state: string;
    user_phone: string;
    zip: string;
};

const ResidentsTable = (Residents : any) => {

    //should be memoized or stable
    const data: Residents[] = Residents.data;

    const columns = useMemo<MRT_ColumnDef<Residents>[]>(
        () => [
            {
                accessorKey: 'property_id', //access nested data with dot notation
                header: 'Property ID',
                size: 10,
            },
            {
                accessorKey: 'unit_id', //access nested data with dot notation
                header: 'Unit ID',
                size: 50,
                enableEditing: false,
            },
            {
                accessorKey: 'first_name', //access nested data with dot notation
                header: 'First Name',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'last_name', //access nested data with dot notation
                header: 'Last Name',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'email', //access nested data with dot notation
                header: 'Email',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'user_phone', //access nested data with dot notation
                header: 'Phone',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'address', //access nested data with dot notation
                header: 'Address',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'city', //access nested data with dot notation
                header: 'City',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'state', //access nested data with dot notation
                header: 'State',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'zip', //access nested data with dot notation
                header: 'Zip',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'monthly_rent', //access nested data with dot notation
                header: 'Monthly Rent',
                size: 50,
            },

        ],
        [],
    );
    const table = useMaterialReactTable({
        enableEditing: true,
        editDisplayMode: 'row',
        renderRowActionMenuItems: ({ row, table }) => [
            <IconButton
                key="delete"
                onClick={() => {
                    console.log(row.original);
                    //deleteProperty(row.original);
                }}
            >
                Delete
            </IconButton>,
        ],
        onEditingRowSave: ({ exitEditingMode, row, table, values }) => {
            const newValues ={
                address: values.address,
                city: values.city,
                name: values.name,
                phone: values.phone,
                property_id: values.property_id,
                state: values.state,
                zip: values.zip,
            }
            //updateProperty(newValues);
            exitEditingMode();
        },

        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <>
                    <DialogTitle >Add Unit</DialogTitle>
                    <DialogContent
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
                }} variant="contained" color="success" >Add Property</Button>

            </Box>
        ),
        onCreatingRowSave: ({ exitCreatingMode, row, table, values }) => {
            //createProperty(values);
            exitCreatingMode();
        }
    });

    return <MaterialReactTable table={table} />;
};

export default ResidentsTable;
