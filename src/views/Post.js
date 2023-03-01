import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addPost, deletePosts, getComments, getPostById, updatePosts } from "../redux/actions";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Post = () => {

    let { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const postStore = useSelector((state) => state.PostReducer);
    const commentsStore = useSelector((state) => state.CommentsReducer);
    const [editingPostData,setEditingPostData] = useState({});
    const [newPostData,setNewPostData] = useState({});
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [showUpdateModal,setShowUpdateModal] = useState(false);
    const [showNewPostModal,setShowNewPostModal] = useState(false);
    const [showAlert,setShowAlert] = useState(false);
    const [commentsData,setCommentsData] = useState();

    useEffect(() => {
        dispatch(getPostById(id));
        dispatch(getComments());
    }, []);

    useEffect(() => {
        setEditingPostData({
            id: postStore?.data?.id,
            title: postStore?.data?.title,
            body: postStore?.data?.body,
        })
    }, [postStore?.data?.id]);

    useEffect(() => {
        setCommentsData(commentsStore?.comments);
    }, [commentsStore]);


    const handleAddPost = () => {
        setNewPostData({})
        setShowNewPostModal(false)
        dispatch(addPost(newPostData))
    };

    const handleDeletePost = () => {
        setShowDeleteModal(false);
        dispatch(deletePosts(editingPostData?.id))
        .then(
            setShowAlert(true)
        )
    };

    const handleUpdatePost = () => {
        setShowUpdateModal(false);
        dispatch(updatePosts(editingPostData))
    };

    const handleBackButton = () => {
        navigate(-1)
    };

    const handleCloseModal = () => {
        setNewPostData({})
        setShowNewPostModal(false)
    };

    return(
        <div className="bg-white mt-4 p-8 rounded-md">
            <div className="mb-6 flex justify-between">
                <button 
                type="button" 
                className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                onClick={handleBackButton}
                >
                    <ArrowBackIcon/>
                </button>
                <button 
                type="button" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setShowNewPostModal(true)}
                >
                    <AddIcon fontSize="small"/>
                    &nbsp; New Post
                </button>
            </div>
            <div className="mb-6">
                <label htmlFor="base-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Title</label>
                <input 
                defaultValue={editingPostData?.title} 
                onChange={(e) =>
                    setEditingPostData({
                      ...editingPostData,
                      title: e.target.value,
                    })
                }
                type="text" 
                id="base-input" 
                placeholder="write something.."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="base-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Detail</label>
                <textarea 
                defaultValue={editingPostData?.body} 
                onChange={(e) =>
                    setEditingPostData({
                      ...editingPostData,
                      body: e.target.value,
                    })
                }
                id="message" 
                rows="4" 
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="write something.."
                />
            </div>
            <div className="mb-6 flex justify-end">
                <button 
                type="button" 
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => setShowDeleteModal(true)}
                >
                    <DeleteIcon fontSize="small"/>
                    &nbsp; Delete
                </button>
                <button 
                type="button" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setShowUpdateModal(true)}
                >
                    <EditIcon fontSize="small"/>
                    &nbsp; Update
                </button>
            </div>

            {showDeleteModal &&
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Are you sure you want to delete this post?
                        </p>
                        </div>
                        <div className="flex items-center justify-end p-6 border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            No
                        </button>
                        <button
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => handleDeletePost()}
                        >
                            Yes, I'm sure
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }

            {showUpdateModal &&
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Are you sure you want to update this post?
                        </p>
                        </div>
                        <div className="flex items-center justify-end p-6 border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowUpdateModal(false)}
                        >
                            No
                        </button>
                        <button
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => handleUpdatePost()}
                        >
                            Yes, I'm sure
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }

            {showNewPostModal &&
                <>
                <div className="fixed inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                    <div className="relative left-1/3 top-14 w-full h-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    New Post
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                            <div className="mb-6">
                                <label htmlFor="base-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Title</label>
                                <input 
                                defaultValue={newPostData?.title} 
                                onChange={(e) =>
                                    setNewPostData({
                                    ...newPostData,
                                    title: e.target.value,
                                    })
                                }
                                type="text" 
                                id="base-input" 
                                placeholder="write something.."
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="base-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Detail</label>
                                <textarea 
                                defaultValue={newPostData?.body} 
                                onChange={(e) =>
                                    setNewPostData({
                                    ...newPostData,
                                    body: e.target.value,
                                    })
                                }
                                id="message" 
                                rows="4" 
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="write something.."
                                />
                            </div>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={handleCloseModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                <button onClick={handleAddPost} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }

            {showAlert &&
                <div id="alert-3" className="flex p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium">
                        Successfully Completed!
                    </div>
                    <button onClick={() => setShowAlert(false)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" aria-label="Close">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            }

        <div className=" mt-4 p-8 rounded-md">
            <p className="flex justify-center mb-10 text-4xl text-gray-900 dark:text-white">You May Also Like</p>
            <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {commentsData?.length > 0 
                && 
                    commentsData?.map((items, index) => (
                        <a href={"/"+items.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={index}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{items.name}</h5>
                            <p className="font-normal text-sm text-gray-700 dark:text-gray-400">{items.body}</p>
                        </a>
                    ))
                }
            </div>
        </div>
        </div>
    )
}

export default Post;