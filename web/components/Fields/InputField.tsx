
import React from 'react'
import { FieldProps } from 'formik';
type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputField = ({ field ,form : _ ,...props }: FieldProps & InputProps) => {
    return (
        <div>
            <input {...field}{...props}/>
        </div>
    )
}