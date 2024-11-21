import {useEffect, useMemo, useState} from 'react';


import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef, MRT_RowSelectionState,
} from 'material-react-table';
import React from 'react';

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
                accessorKey: 'email', //access nested data with dot notation
                header: 'Email',
                size: 50,
            },
            {
                accessorKey: 'user_phone', //access nested data with dot notation
                header: 'Phone',
                size: 50,
            },
            {
                accessorKey: 'address', //access nested data with dot notation
                header: 'Address',
                size: 50,
            },
            {
                accessorKey: 'city', //access nested data with dot notation
                header: 'City',
                size: 50,
            },
            {
                accessorKey: 'state', //access nested data with dot notation
                header: 'State',
                size: 50,
            },
            {
                accessorKey: 'zip', //access nested data with dot notation
                header: 'Zip',
                size: 50,
            },
            {
                accessorKey: 'monthly_rent', //access nested data with dot notation
                header: 'Monthly Rent',
                size: 50,
            },

        ],
        [],
    );
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const table = useMaterialReactTable({
        enableRowSelection: true,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        enableEditing: true,
        editDisplayMode: 'modal',
        //onEditingRowSave: ({ exitEditingMode, row, table, values}) => Promise<void> | void
        onEditingRowSave: ({ exitEditingMode, row, table, values }) => {
            console.log(values);
            exitEditingMode();
        },
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });
    useEffect(() => {
        //fetch data based on row selection state or something
        console.log(rowSelection);
    }, [table.getState().rowSelection]);
    return <MaterialReactTable table={table} />;
};

export default ResidentsTable;
