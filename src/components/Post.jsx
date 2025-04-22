import React, { useState, useEffect } from 'react'
// import likeService from '../services/likeService';
import postService from '../services/postService';
import { useSelector } from 'react-redux';


function post({ title, description, images, tags, postId, isLiked, likes }) {
    const authStatus = useSelector((state) => state.auth.status)
    // const [liked, setLiked] = useState(isLiked)
    // const [currentLikes, setCurrentLikes] = useState(likes);
    // useEffect(() => {
    //     if (!authStatus) {
    //         setLiked(false); // Reset liked state to false when logged out
    //     }
    // }, [authStatus]);
    // const likePost = async () => {
    //     if (!authStatus) {
    //         alert("You must be logged in to like a post.");
    //         return;
    //     }

    //     try {
    //         const response = await likeService.likePostService(postId);
    //         console.log(response);

    //         const updatedPost = await profileService.getPostById(postId);
    //         console.log(updatedPost)
    //         setLiked(updatedPost.data.isLiked)
    //         setCurrentLikes(updatedPost.data.likes);

    //     } catch (error) {
    //         console.error('Error liking post:', error.message);
    //     }
    // }
    return (
        <div className='w-full text-white border-b-2 border-zinc-900 rounded-lg m-2 p-2 flex justify-center items-start flex-col'>
            {images && images.length > 0 && (
                <img className='w-full border-2 border-zinc-900 rounded-lg hover:shadow-md hover:shadow-zinc-700/40' src={images[0].url} alt="Post" />
            )}
            <p className='py-1 my-1'>{title}</p>
            <p className='py-1 my-1'>{description}</p>

            {tags && tags.length > 0 && (
                <div className="py-1 my-1 text-zinc-500">
                    {tags.map((tag, index) => (
                        <span className="tag">#{tag}</span>
                    ))}
                </div>
            )}
            <div className='flex justify-center items-center gap-2'>
                <button className='cursor-pointer' >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill='red'
                    >
                        <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                            strokeWidth="1.5"
                            strokeLinecap="round" />
                    </svg>
                    <span className='px-2'>1</span>
                </button>
                <button className='cursor-pointer' >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M8 13.5H16M8 8.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className='px-2'>1</span>
                </button>
                <button className='cursor-pointer' >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M11.922 4.79004C16.6963 3.16245 19.0834 2.34866 20.3674 3.63261C21.6513 4.91656 20.8375 7.30371 19.21 12.078L18.1016 15.3292C16.8517 18.9958 16.2267 20.8291 15.1964 20.9808C14.9195 21.0216 14.6328 20.9971 14.3587 20.9091C13.3395 20.5819 12.8007 18.6489 11.7231 14.783C11.4841 13.9255 11.3646 13.4967 11.0924 13.1692C11.0134 13.0742 10.9258 12.9866 10.8308 12.9076C10.5033 12.6354 10.0745 12.5159 9.21705 12.2769C5.35111 11.1993 3.41814 10.6605 3.0909 9.64127C3.00292 9.36724 2.97837 9.08053 3.01916 8.80355C3.17088 7.77332 5.00419 7.14834 8.6708 5.89838L11.922 4.79004Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className='px-2'>1</span>
                </button>
            </div>
        </div>
    );
}

export default post