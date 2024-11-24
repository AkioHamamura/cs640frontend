import { useMemo } from 'react';
// @ts-ignore
import {updateProperty, createProperty, deleteProperty} from '../CRUD.jsx'

import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef, MRT_EditActionButtons,
} from 'material-react-table';
import React from 'react';
import {Box, Button, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";

//example data type
type Property = {
    address: string;
    city: string;
    name: string,
    phone: string,
    property_id: number,
    state: string;
    zip: string;
};

const PropertyTable = (Properties : any) => {
    //should be memoized or stable
    const data: Property[] = Properties.data;

    const columns = useMemo<MRT_ColumnDef<Property>[]>(
        () => [
            {
                accessorKey: 'property_id', //access nested data with dot notation
                header: 'Property ID',
                size: 150,
                enableEditing: false,
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
                size: 200,
            },
            {
                accessorKey: 'city',
                header: 'City',
                size: 150,
            },
            {
                accessorKey: 'state',
                header: 'State',
                size: 150,
            },
            {
                accessorKey: 'zip',
                header: 'Zip',
                size: 150,
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
                size: 150,
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
                    deleteProperty(row.original);
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
            updateProperty(newValues);
            exitEditingMode();
        },

        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle >Add Property</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
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
            createProperty(values);
            exitCreatingMode();
        }
    });

    return <MaterialReactTable table={table} />;
};

export default PropertyTable;
