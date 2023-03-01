import React , { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GridViewIcon from '@mui/icons-material/GridView';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAllPosts } from '../redux/actions';

export default function Navbar() {

    const dispatch = useDispatch();
    const [totalPost, setTotalPost] = useState(0);
    const postStore = useSelector((state) => state.PostReducer);

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    useEffect(() => {
        setTotalPost(postStore?.total);
    }, [postStore]);

    return (
        <div className="flex w-auto h-16 shadow-md rounded-md bg-white sticky items-center top-0 cursor-pointer">
            <a className="ml-3" href="/"> <BookIcon/>  </a>
            <a className="ml-3 flex-1 w-64" href="/">Blog</a>
            <a className="m-3 no-underline decoration-black visited:text-black" href="/">Posts <sup> {totalPost} </sup> </a>
            <NotificationsIcon className="m-3 no-underline decoration-black"/>
            <GridViewIcon className="m-3 no-underline decoration-black"/>
            <a className="m-3 no-underline decoration-black visited:text-black" href="/profile"> <AccountCircleIcon/> </a>
        </div>
    )
}