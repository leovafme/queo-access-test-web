import React, { useMemo } from 'react';
import { useApiService } from "../../Store";
import TableFactory from "../Table";
import Button from '@material-ui/core/Button';

function TableCompany() {
    const { companyService } = useApiService();

    const deleteRecord = async id => {
        const confirmationDelete = window.confirm("Do you really delete record?");

        if (!confirmationDelete) return;
        await companyService.delete(id);
    }

    const columns = useMemo(
        () => [
            {
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
                        <Button variant="contained" size="small" color="primary">
                            Edit
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="contained" size="small" color="secondary" onClick={() => {
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
        []
    )

    return <TableFactory columns={columns} serviceCall={companyService} />
}

export default TableCompany;