import React, { useMemo, useState, useCallback } from 'react';
import { useApiService } from "../../Store";
import TableFactory from "../Table";
import Button from '@material-ui/core/Button';

function TableEmployee({ onEdit }) {
    const { employeeService } = useApiService();
    const [forceUpdate, setForceUpdate] = useState();
    const [inAction, setInAction] = useState(false);

    const deleteRecord = useCallback(async id => {
        const confirmationDelete = window.confirm("Do you really delete record?");

        if (!confirmationDelete) return;
        setInAction(true);
        
        try {
            await employeeService.delete(id);
            alert("ok delete");
        } catch(e) {
            console.log(e);
            alert("error delete record!");
        }

        setInAction(false)
        setForceUpdate(Math.random());
    }, [employeeService])

    const editRecord = useCallback(async id => {
        // possible other logic implmentation
        onEdit(id)
    }, [onEdit])

    const columns = useMemo(
        () => [
            {
                Header: 'First name',
                accessor: 'first_name',
            },
            {
                Header: 'Last name',
                accessor: 'last_name',
            },
            {
                Header: 'Company',
                accessor: 'company',
                Cell: props => props.value.name,
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Cell: props => (
                    <div style={{display: 'flex', alignContent: 'center'}}>
                        <Button disabled={inAction} variant="contained" size="small" color="primary" onClick={() => {
                            editRecord(props.value)
                        }}>
                            Edit
                        </Button>
                        &nbsp;&nbsp;
                        <Button disabled={inAction} variant="contained" size="small" color="secondary" onClick={() => {
                            deleteRecord(props.value)
                        }}>
                            Delete
                        </Button>
                    </div>
                ),
                Header: "Acciones",
                accessor: "id",
            }
        ],
        [deleteRecord, editRecord, inAction]
    )

    return <TableFactory columns={columns} serviceCall={employeeService} forceUpdate={forceUpdate} />
}

TableEmployee.defaultProps = {
    onEdit: id => console.log(id)
}

export default TableEmployee;