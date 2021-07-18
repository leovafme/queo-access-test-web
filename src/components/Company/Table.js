import React, { useMemo, useState, useCallback } from 'react';
import { useApiService } from "../../Store";
import TableFactory from "../Table";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

function TableCompany({ onEdit }) {
    const { companyService } = useApiService();
    const [forceUpdate, setForceUpdate] = useState();
    const [inAction, setInAction] = useState(false);

    const deleteRecord = useCallback(async id => {
        const confirmationDelete = window.confirm("Do you really delete record?");

        if (!confirmationDelete) return;
        setInAction(true);
        
        try {
            await companyService.delete(id);
            alert("ok delete");
        } catch(e) {
            console.log(e);
            alert("error delete record!");
        }

        setInAction(false)
        setForceUpdate(Math.random());
    },[companyService])

    const editRecord = useCallback(async id => {
        // possible other logic implmentation
        onEdit(id)
    }, [onEdit])

    const columns = useMemo(
        () => [
            {
                Cell: props => (
                    <Avatar src={props.value} />
                ),
                Header: 'Logo',
                accessor: 'logo',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Web Site',
                accessor: 'website',
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
                Header: "Actions",
                accessor: "id",
            }
        ],
        [deleteRecord, editRecord, inAction]
    )

    return <TableFactory columns={columns} serviceCall={companyService} forceUpdate={forceUpdate} />
}

TableCompany.defaultProps = {
    onEdit: id => console.log(id)
}

export default TableCompany;