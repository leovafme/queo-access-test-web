import React, { useEffect, useState, useCallback } from 'react';
import { useTable } from 'react-table';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Table({columns, serviceCall, forceUpdate}) {
    const [data, setData] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleToggle = useCallback(() => {
        setOpen(!open);
    },[open]);

    const findAll = useCallback(async () => {
        try {
            handleToggle();
            const response = await serviceCall.getCompanies();
            if (response.success) setData(response.result);
        } catch (e) {
            console.log(e, serviceCall)
            alert("Error listen all records!")
        }

        handleClose();
    }, [handleToggle, serviceCall, handleClose]);

    useEffect(() => {
        if (serviceCall) findAll();
        // eslint-disable-next-line
    }, [serviceCall])

    useEffect(() => {
        if (forceUpdate) findAll();
        // eslint-disable-next-line
    }, [forceUpdate])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return <>
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}

                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
}

export default Table;