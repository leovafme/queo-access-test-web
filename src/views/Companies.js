import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useApiService } from "../Store";
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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

const Company = () => {
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors }, setValue, reset, control } = useForm({
        resolver: yupResolver(schema)
    });

    const { companyService } = useApiService()

    const onSubmit = async data => {
        if (data.logo && data.logo[0]) {
            data.logo = await toBase64(data.logo[0]);
            // only plain tex
            data.logo = data.logo.split(",")[1]
        } else {
            data.logo = undefined;
        }

        try {
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
    };

    const [logo, setLogo] = useState();

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
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                        <div className={classes.avatarContainer}>
                            <input {...register("logo")} id="icon-button-file" style={{display: 'none'}} type="file" name="logo" accept="image/png, image/jpeg" onChange={isGoodImage} />
                            <div className={classes.logocontainer} ><Avatar src={logo} className={classes.large} /></div>
                            <br></br>
                            <label htmlFor="icon-button-file">
                                <Button variant="outlined"  component="span" color="primary" disableElevation>Upload Logo</Button>
                            </label>
                        </div>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField 
                                {...field}
                                error={errors && errors.name? true : false}
                                label="Company name"
                                variant="outlined"
                                size="small"
                                helperText={errors && errors.name? "Invalid Field" : null}
                            />}
                        />

                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField
                                {...field}
                                error={errors && errors.email? true : false}
                                label="Company email"
                                variant="outlined"
                                size="small"
                                helperText={errors && errors.email? "Invalid Field" : null}
                            />}
                        />

                        <Controller
                            name="website"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} label="Company website" variant="outlined" size="small" />}
                        />

                        <br></br>
                        
                        <Button variant="contained" color="primary" type="submit" disableElevation>Save</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>

    );
};


export default Company;