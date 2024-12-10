import {useEffect, useMemo, useState} from 'react';


import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef, MRT_RowSelectionState, MRT_EditActionButtons,
} from 'material-react-table';
import React from 'react';
import {Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem} from "@mui/material";
// @ts-ignore
import {createUser, updateUser, getUnits} from '../CRUD.jsx';

type Residents = {
    email: string;
    _hash: string;
    first_name: string;
    last_name: string;
    user_phone: string;
    unit_id: number;
    address: string;
    city: string;
    monthly_rent: number;
    name: string;
    property_id: number;
    state: string;
    zip: string;
};



const ResidentsTable = (Residents : any, UnitId: any) => {

    //should be memoized or stable
    const data: Residents[] = Residents.data[0];
    const units: number[] = Residents.data[1];
    const unitArray = units.map((units: any) => units.unit_id);


    const columns = useMemo<MRT_ColumnDef<Residents>[]>(
        () => [
            {
                accessorKey: 'email', //access nested data with dot notation
                header: 'Email',
                size: 50,
            },
            {
                accessorKey: 'password_hash',
                header: 'Password',
                size: 50,
            },
            {
                accessorKey: 'first_name', //access nested data with dot notation
                header: 'First Name',
                size: 50,
            },
            {
                accessorKey: 'last_name', //access nested data with dot notation
                header: 'Last Name',
                size: 50,
            },
            {
                accessorKey: 'phone', //access nested data with dot notation
                header: 'Phone',
                size: 50,
            },
            {
                accessorKey: 'unit_id',
                header: 'Unit ID',
                size: 50,
                editVariant: 'select',
                editSelectOptions: unitArray.map((unit: number) => ({ value: unit, label: unit.toString() })),

            },
            {
                accessorKey: 'monthly_rent', //access nested data with dot notation
                header: 'Monthly Rent',
                size: 50,
                enableEditing: false,

            },
            {
                accessorKey: 'property_id', //access nested data with dot notation
                header: 'Property ID',
                size: 10,
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

        ],
        [unitArray],
    );
    const table = useMaterialReactTable({
        enableEditing: true,
        editDisplayMode: 'row',
        initialState:{columnVisibility: {password_hash: false}},
        renderRowActionMenuItems: ({ row, table }) => [
            <IconButton
                key="delete"
                onClick={() => {
                    console.log(row.original);
                }}
            >
                Delete
            </IconButton>,
        ],
        onEditingRowSave: ({ exitEditingMode, row, table, values }) => {
            const newValues ={
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                phone: values.phone,
                unit_id: values.unit_id,
            }
            updateUser(newValues);
            exitEditingMode();
        },

        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <>
                    <DialogTitle >Create User</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {internalEditComponents}{/* required */}
                    </DialogContent>
                    <DialogActions>
                        <MRT_EditActionButtons variant="text" table={table} row={row}/>
                    </DialogActions>
                </>
            </>

        ),
        renderBottomToolbar:({table}) => (
            <Box>
                <Button onClick={()=>{
                    table.setCreatingRow(true);
                }} variant="contained" color="success" >Create User</Button>

            </Box>
        ),
        onCreatingRowSave: ({ exitCreatingMode, row, table, values }) => {
            console.log(createUser(values));
            createUser(values);
            exitCreatingMode();
        }
    });

    return <MaterialReactTable table={table} />;
};

export default ResidentsTable;
