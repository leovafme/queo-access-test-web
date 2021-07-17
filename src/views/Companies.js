import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useApiService } from "../Store";
import { Button, Input } from '@material-ui/core';

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

const Company = () => {
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
    
        image.onload = function() {
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

        image.onerror = function() {
            alert("Invalid image. Please select an image file.");
            setLogo(null);
            setValue("logo", undefined)
            return;
        }
    
        image.src = _URL.createObjectURL(file);
        setLogo(image.src)
    }
    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("logo")} type="file" name="logo" accept="image/png, image/jpeg" onChange={isGoodImage} />
            {logo? <img src={logo} width="100"></img>: null }
            {errors.logo && <span>Invalid logo</span>}
            <br></br>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
                placeholder="Company name"
            />
            
            {errors.name && <span>Name is required</span>}
            
            <br></br>

            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
                placeholder="Company email"
            />
            
            {errors.email && <span>Email is required</span>}
            
            <br></br>

            <Controller
                name="website"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
                placeholder="Company website"
            />
            <br></br>
            <Button color="primary" type="submit">Save</Button>
        </form>
    );
};


export default Company;