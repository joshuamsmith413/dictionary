import React, { HTMLAttributes } from 'react';
import { TError } from './types';

interface IProps extends HTMLAttributes<HTMLElement> {
    error: TError;
}

export default function Error({error}: IProps) {
    const { title, message, resolution } = error;
    return (
        <div className="error">
            <strong>{title}</strong>
            <p>{message}</p>
            <p>{resolution}</p>
        </div>
    )
}