import { useMemo } from 'react';
import {updateProperty} from '../CRUD.jsx'

import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import React from 'react';

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
        enableRowSelection: true,
        enableMultiRowSelection: false,
        enableEditing: true,
        editDisplayMode: 'modal',
        //onEditingRowSave: ({ exitEditingMode, row, table, values}) => Promise<void> | void
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
    });

    return <MaterialReactTable table={table} />;
};

export default PropertyTable;
