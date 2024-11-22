import { useMemo } from 'react';


import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import React from 'react';
import {updatePaymentStatus} from '../CRUD.jsx'

//example data type
type Payments = {


};

const PaymentsTable = (Payments : any) => {

    //should be memoized or stable
    const data: Payments[] = Payments.data;

    const columns = useMemo<MRT_ColumnDef<Payments>[]>(
        () => [
            {
                accessorKey: 'payment_id',
                header: 'Payment ID',
                size: 10,
                enableEditing: false,

            },
            {
                accessorKey: 'user_id',
                header: 'User ID',
                size: 10,
                enableEditing: false,

            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 10,
                enableEditing: false,

            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                size: 10,
                enableEditing: false,

            },
            {
                accessorKey:'payment_date',
                header:'Payment Date',
                size:10,
                enableEditing: false,

            },
            {
                accessorKey:'payment_method',
                header:'Payment Method',
                size:10,
                enableEditing: false,
            },
            {
                accessorKey:'status',
                header:'Payment Status',
                size:10,
            },

        ],
        [],
    );

    const table = useMaterialReactTable({
        enableEditing: true,
        editDisplayMode: 'modal',
        onEditingRowSave: ({ exitEditingMode, row, table, values }) => {
            const newValues ={
                payment_id: values.payment_id,
                status: values.status,
            }
            updatePaymentStatus(newValues);
            exitEditingMode();
        },
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return <MaterialReactTable table={table} />;
};

export default PaymentsTable;
