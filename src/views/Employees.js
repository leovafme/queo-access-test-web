import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const EmployeePreview = () => {
    return <>preview</>
}

const EmployeeEditor = () => {
    return <>editor</>
}

const Employee = () => {
    let { path } = useRouteMatch();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    <div style={{ padding: '1%' }}>
                        <Switch>
                            <Route exact path={path} component={EmployeePreview} />
                            <Route path={`${path}/new`} component={EmployeeEditor} />
                            <Route path={`${path}/edit/:id`} component={EmployeeEditor} />
                        </Switch>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Employee;