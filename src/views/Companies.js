import React from 'react';
import { useForm } from "react-hook-form";

const Company = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name",
                {
                    required: true, minLength: 3, maxLength: 50
                })
            } placeholder="Company name" />
            {errors.name && <span>Name is required</span>}
            
            <br></br>
            
            <input type="email" {...register("email", 
                {
                    required: true, pattern: /^\S+@\S+$/i, minLength: 6, maxLength: 60 
                })
            } placeholder="Company email" />
            {errors.email && <span>Email is required</span>}
            
            <br></br>
            <input {...register("website")} placeholder="Company website" />
            <br></br>

            <input type="submit" />
        </form>
    );
};


export default Company;