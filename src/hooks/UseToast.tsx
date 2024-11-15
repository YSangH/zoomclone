import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setToasts } from '../app/slices/MeetingSlice';

function UseToast() {
    const toasts = useAppSelector((zoom) => zoom.meeting.toasts);
    const dispatch = useAppDispatch();
    const createToast = ({ title, type }: {
        title: string,
        type: any,
    }) => { 
        dispatch(setToasts(toasts.concat({
            id: new Date().toISOString(),
            title,
            color: type,
        })))
    };
    return [createToast];
}

export default UseToast