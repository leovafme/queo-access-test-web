import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormCompany from '../components/FormCompany';
import TableCompany from '../components/Company/Table';

const Company = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    <FormCompany />
                    <TableCompany />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Company;