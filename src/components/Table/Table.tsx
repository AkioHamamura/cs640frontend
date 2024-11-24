import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef, MRT_EditActionButtons,
} from 'material-react-table';
import React from 'react';
import {Box, Button, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
// @ts-ignore
import {updateUnit, createUnit, deleteUnit} from "../CRUD.jsx";

type Unit = {
    unit_id: number;
    property_id: number;
    unit_number: string;
    monthly_rent: string;
    bedrooms: number;
    bathrooms: number;
    square_feet: number;
}

const Example = (Units : any) => {
    //should be memoized or stable
    const data = Units.data;
    const columns = useMemo<MRT_ColumnDef<Unit>[]>(
        () => [
            {
                accessorKey: 'unit_id', //access nested data with dot notation
                header: 'Unit ID',
                size: 20,
                enableEditing: false,
            },
            {
                accessorKey: 'property_id', //access nested data with dot notation
                header: 'Property ID',
                size: 20,
            },
            {
                accessorKey: 'unit_number', //access nested data with dot notation
                header: 'Unit Number',
                size: 20,
            },
            {
                accessorKey: 'monthly_rent', //access nested data with dot notation
                header: 'Monthly Rent',
                size: 20,
            },
            {
                accessorKey: 'bedrooms', //access nested data with dot notation
                header: 'Bedrooms',
                size: 20,
            },
            {
                accessorKey: 'bathrooms', //access nested data with dot notation
                header: 'Bathrooms',
                size: 20,
            },
            {
                accessorKey: 'square_feet', //access nested data with dot notation
                header: 'Square Footage',
                size: 20,
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
                    deleteUnit(row.original);
                }}
            >
                Delete
            </IconButton>,
        ],
        onEditingRowSave: ({ exitEditingMode, row, table, values }) => {
            const newValues ={
                unit_id: row.original.unit_id,
                property_id: values.property_id,
                unit_number: values.unit_number,
                monthly_rent: values.monthly_rent,
                bedrooms: values.bedrooms,
                bathrooms: values.bathrooms,
                square_feet: values.square_feet,
            }
            updateUnit(newValues);
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
                }} variant="contained" color="success" >Add Unit</Button>

            </Box>
        ),
        onCreatingRowSave: ({ exitCreatingMode, row, table, values }) => {
            createUnit(values);
            exitCreatingMode();
        }
    });
    return <MaterialReactTable table={table} />
};

export default Example;
