import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useApiService } from "../../Store";
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from "react-select";

const schema = yup.object().shape({
    first_name: yup.string().required().min(3).max(60),
    last_name: yup.string().required().min(3).max(60),
    email: yup.string().email().required().min(3).max(60),
    phone: yup.string().optional().max(60),
    company_id: yup.object().shape({
        value: yup.number().required().positive().integer(),
        label: yup.string(),
    }),
})

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        margin: theme.spacing(1),
    },
}));

const FormEmployee = ({ id }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [companyId, setCompanyId] = useState("");
    const { companyService, employeeService } = useApiService();
    const [listCompanies, setListCompanies] = useState([])
    const { handleSubmit, formState: { errors }, setValue, reset, control } = useForm({
        resolver: yupResolver(schema)
    });

    const listCompaniesForSelect = async () => {
        try {
            const response = await companyService.all();
            const parselistCompanies = response.result.map((company) => {
                return {value: company.id , label: company.name };
            })
            
            setListCompanies(parselistCompanies)
        } catch (e) {
            console.log(e)
        }
    }

    const findRecordById = useCallback(async () => {
        setLoading(true);
        try {
            const response = await employeeService.get(id);
            if (!response.success) throw new Error('¡Ups!');
            setValue("first_name", response.result.first_name || "");
            setValue("last_name", response.result.last_name || "");
            setValue("email", response.result.email || "");
            setValue("phone", response.result.phone || "");
            setCompanyId(response.result.company_id);
        } catch (e) {
            console.log(e)
            alert("Error find record by id D:")
        }
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(id && employeeService) findRecordById();
    }, [id, employeeService, findRecordById])

    // only first load component
    useEffect(() => {
        listCompaniesForSelect()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(companyId && listCompanies && listCompanies.length > 0)
            setValue("company_id", listCompanies.find(company => company.value === companyId));
    }, [companyId, listCompanies, setValue])

    const onSubmit = async data => {
        // set company_id
        data.company_id = data.company_id.value;

        setLoading(true);
        try {
            let response; 
            if (id) {
                response = await employeeService.edit(id, data);
            } else {
                response = await employeeService.create(data);
            }
            
            if (response.success) {
                // if not is edit clear form
                if (!id) clearForm();
                alert("ok save record :D")
            } else {
                alert("error exeption")
                alert(JSON.stringify(response.message))
            }

        } catch (error) {
            alert(error)
        }

        setLoading(false);
    };

    const clearForm = () => {
        reset({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            company_id: ""
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <Controller
                name="first_name"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField
                    {...field}
                    error={errors && errors.first_name ? true : false}
                    label="First name"
                    variant="outlined"
                    size="small"
                    helperText={errors && errors.first_name ? "Invalid Field" : null}
                />}
            />

            <Controller
                name="last_name"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField
                    {...field}
                    error={errors && errors.last_name ? true : false}
                    label="Last name"
                    variant="outlined"
                    size="small"
                    helperText={errors && errors.last_name ? "Invalid Field" : null}
                />}
            />

            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField
                    {...field}
                    error={errors && errors.email ? true : false}
                    label="Email"
                    variant="outlined"
                    size="small"
                    helperText={errors && errors.email ? "Invalid Field" : null}
                />}
            />

            <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Phone" variant="outlined" size="small" />}
            />

            
            <Controller
                name="company_id"
                control={control}
                setValue={setValue}
                render={({ field }) => <Select {...field} options={listCompanies} />}
            />
            {errors && errors.company_id ? "Invalid Company" : null}

            <br></br>

            <Button variant="contained" color="primary" type="submit" disableElevation disabled={loading}>Save</Button>
            {loading? <CircularProgress /> : null}
        </form>
    );
};

export default FormEmployee;