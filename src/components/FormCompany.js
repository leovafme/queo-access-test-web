import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useApiService } from "../Store";
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    email: yup.string().required().min(6).max(60),
    website: yup.string().url().optional(),
})

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

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
    logocontainer: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    avatarContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center'
    }
}));

const FormCompany = ({ id }) => {
    const classes = useStyles();
    const [logo, setLogo] = useState();
    const [loading, setLoading] = useState(false);
    const { companyService } = useApiService()
    const { register, handleSubmit, formState: { errors }, setValue, reset, control } = useForm({
        resolver: yupResolver(schema)
    });

    const findRecordById = useCallback(async () => {
        setLoading(true);
        try {
            const response = await companyService.get(id);
            if (!response.success) throw new Error('¡Ups!');

            setValue("name", response.result.name || "");
            setValue("email", response.result.email || "");
            setValue("website", response.result.website || "");
            setLogo(response.result.logo)
        } catch (e) {
            console.log(e)
            alert("Error find record by id D:")
        }
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(id && companyService) findRecordById();
    }, [id, companyService, findRecordById])

    const onSubmit = async data => {
        if (data.logo && data.logo[0]) {
            data.logo = await toBase64(data.logo[0]);
            // only plain tex
            data.logo = data.logo.split(",")[1]
        } else {
            data.logo = undefined;
        }

        try {
            setLoading(true);
            const response = await companyService.createCompany(data);

            if (response.success) {
                reset();
                setLogo(null);
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

    function isGoodImage(event) {
        var _URL = window.URL || window.webkitURL;
        var file = event.target.files[0];
        var image = new Image();

        image.onload = function () {
            // Check if image is bad/invalid
            if (this.width + this.height === 0) {
                alert("invalid img");
                setLogo(null);
                setValue("logo", undefined)
                return;
            }

            // Check the image resolution
            if (this.width >= 100 && this.height >= 100) {
                console.log("ok")
            } else {
                alert("The image resolution is too low.");
                setLogo(null);
                setValue("logo", undefined)
                return;
            }
        };

        image.onerror = function () {
            alert("Invalid image. Please select an image file.");
            setLogo(null);
            setValue("logo", undefined)
            return;
        }

        image.src = _URL.createObjectURL(file);
        setLogo(image.src)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <div className={classes.avatarContainer}>
                <input {...register("logo")} id="icon-button-file" style={{ display: 'none' }} type="file" name="logo" accept="image/png, image/jpeg" onChange={isGoodImage} />
                <div className={classes.logocontainer} ><Avatar src={logo} className={classes.large} /></div>
                <br></br>
                <label htmlFor="icon-button-file">
                    <Button variant="outlined" component="span" color="primary" disableElevation>Upload Logo</Button>
                </label>
            </div>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField
                    {...field}
                    error={errors && errors.name ? true : false}
                    label="Company name"
                    variant="outlined"
                    size="small"
                    helperText={errors && errors.name ? "Invalid Field" : null}
                />}
            />

            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField
                    {...field}
                    error={errors && errors.email ? true : false}
                    label="Company email"
                    variant="outlined"
                    size="small"
                    helperText={errors && errors.email ? "Invalid Field" : null}
                />}
            />

            <Controller
                name="website"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Company website" variant="outlined" size="small" />}
            />

            <br></br>

            <Button variant="contained" color="primary" type="submit" disableElevation disabled={loading}>Save</Button>
            {loading? <CircularProgress /> : null}
        </form>
    );
};

export default FormCompany;