import React from 'react';
import { Route, Switch, useRouteMatch, useHistory, useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import FormCompany from '../components/FormCompany';
import TableCompany from '../components/Company/Table';
import { Link as RouterLink } from 'react-router-dom';

const CompanyPreview = () => {
    let { path } = useRouteMatch();
    let history = useHistory();

    const onEdit = id => {
        history.push(`${path}/edit/${id}`);
    }

    return <>
        <Button component={RouterLink} to={`${path}/new`} variant="contained" size="small" color="primary">
            New Company
        </Button>
        <br></br><br></br>
        <TableCompany style={{ with: '100%' }} onEdit={onEdit} />
    </>
}

const CompanyEditor = () => {
    let history = useHistory();
    let { id } = useParams();

    return <>
        <IconButton color="primary" onClick={() => history.goBack()}>
          <ArrowBackIosIcon />
        </IconButton>
        <br></br><br></br>
        <FormCompany id={id} />
    </>
}

const Company = () => {
    let { path } = useRouteMatch();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    <div style={{ padding: '1%' }}>
                        <Switch>
                            <Route exact path={path} component={CompanyPreview} />
                            <Route path={`${path}/new`} component={CompanyEditor} />
                            <Route path={`${path}/edit/:id`} component={CompanyEditor} />
                        </Switch>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Company;