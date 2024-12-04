import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef, MRT_EditActionButtons,
} from 'material-react-table';
import React from 'react';
// @ts-ignore
import {updatePaymentStatus, createPayment} from '../CRUD.jsx'
import {Box, Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";

//example data type
type Payments = {
    amount: number;
    description: string;
    payment_method: string;
    payment_date: string;
    payment_id: number;
    status: string;



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
                enableEditing: row => row.original.description == '',

            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                size: 10,
                enableEditing: row => row.original.amount == 0,


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
                enableEditing: row => row.original.payment_method == '',
                editVariant: 'select',
                editSelectOptions: [{value: 'Credit Card', label: 'Credit Card'},
                    {value: 'ACH', label: 'ACH'},
                    {value: 'Check', label: 'Check'},
                    {value: 'Cash', label: 'Cash'}],



            },
            {
                accessorKey:'status',
                header:'Payment Status',
                size:10,
                editVariant: 'select',
                editSelectOptions: [{value: 'Pending', label: 'Pending'},
                    {value: 'Completed', label: 'Completed'},
                    {value: 'Failed', label: 'Failed'},
                    {value: 'Refunded', label: 'Refunded'}],
            },

        ],
        [],
    );

    const table = useMaterialReactTable({
        enableEditing: true,
        editDisplayMode: 'row',
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
                }} variant="contained" color="success" >Make Payment</Button>

            </Box>
        ),
        onCreatingRowSave: ({ exitCreatingMode, row, table, values }) => {
            createPayment(values);
            exitCreatingMode();
        }
    });

    return <><MaterialReactTable table={table} /> </>;
};

export default PaymentsTable;
