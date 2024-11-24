import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef, MRT_EditActionButtons,
} from 'material-react-table';
import React from 'react';
import {Box, Button, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";

//example data type
type Person = {
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
    city: string;
    state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: {
            firstName: 'Jane',
            lastName: 'Doe',
        },
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Joe',
            lastName: 'Doe',
        },
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Omaha',
        state: 'Nebraska',
    },
];

const Example = (data : any) => {
    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'name.firstName', //access nested data with dot notation
                header: 'First Name',
                size: 150,
            },
            {
                accessorKey: 'name.lastName',
                header: 'Last Name',
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
                }} variant="contained" color="success" >Add Unit</Button>

            </Box>
        ),
        onCreatingRowSave: ({ exitCreatingMode, row, table, values }) => {
            //createProperty(values);
            exitCreatingMode();
        }
    });
    return <MaterialReactTable table={table} />
};

export default Example;
