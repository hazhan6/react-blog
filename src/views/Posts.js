import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/actions";

const Posts = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState();
    const postStore = useSelector((state) => state.PostReducer);

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    useEffect(() => {
        setData(postStore?.data);
    }, [postStore]);

    return (
        <div className="mt-4 p-8 flex justify-evenly bg-white rounded-md">
            <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {data?.length > 0 
                ? 
                    data?.map((items, index) => (
                        <a href={"/"+items.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={index}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{items.title}</h5>
                            <p className="font-normal text-sm text-gray-700 dark:text-gray-400">{items.body}</p>
                        </a>
                    ))
                : data?.userId ?
                    <a href={"/"+data?.id } className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
                        <p className="font-normal text-sm text-gray-700 dark:text-gray-400">{data.body}</p>
                    </a>
                :
                <h5>Not Found</h5>
                }
            </div>
        </div>
    )
}

export default Posts;