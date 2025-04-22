import React, { useEffect, useState } from 'react'
import profileService from '../services/postService'
import Container from '../components/Container.jsx'
import Post from '../components/Post.jsx'

function Homepage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        profileService.getAllPosts().then((response) => {
            if (response && response.data.posts) {
                setPosts(response.data.posts);
            }
        })
    }, [])


    return (
        <div className='text-white bg-black p-2 flex justify-center items-center'>
            <Container>
                <div className='border-2 border-zinc-700 rounded-full p-2 flex justify-between items-center'>
                    <input className='w-[80vh] p-1 rounded-full border-black border-2' type="text" placeholder='Your task to be completed!!!' />
                    <span className='p-1'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M11 8H13C15.8284 8 17.2426 8 18.1213 8.87868C19 9.75736 19 11.1716 19 14C19 16.8284 19 18.2426 18.1213 19.1213C17.2426 20 15.8284 20 13 20H12C12 20 11.5 22 8 22C8 22 9 20.9913 9 19.9827C7.44655 19.9359 6.51998 19.7626 5.87868 19.1213C5 18.2426 5 16.8284 5 14C5 11.1716 5 9.75736 5.87868 8.87868C6.75736 8 8.17157 8 11 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M19 11.5H19.5C20.4346 11.5 20.9019 11.5 21.25 11.701C21.478 11.8326 21.6674 12.022 21.799 12.25C22 12.5981 22 13.0654 22 14C22 14.9346 22 15.4019 21.799 15.75C21.6674 15.978 21.478 16.1674 21.25 16.299C20.9019 16.5 20.4346 16.5 19.5 16.5H19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M5 11.5H4.5C3.56538 11.5 3.09808 11.5 2.75 11.701C2.52197 11.8326 2.33261 12.022 2.20096 12.25C2 12.5981 2 13.0654 2 14C2 14.9346 2 15.4019 2.20096 15.75C2.33261 15.978 2.52197 16.1674 2.75 16.299C3.09808 16.5 3.56538 16.5 4.5 16.5H5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M13.5 3.5C13.5 4.32843 12.8284 5 12 5C11.1716 5 10.5 4.32843 10.5 3.5C10.5 2.67157 11.1716 2 12 2C12.8284 2 13.5 2.67157 13.5 3.5Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 12V13M15 12V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 16.5C10 16.5 10.6667 17 12 17C13.3333 17 14 16.5 14 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg></span>
                </div>
                {
                    posts.map((post) => (
                        <div className='p-2 w-1/2 flex-[0 0 auto] max-md:w-[60%]' key={post._id}>
                            <Post title={post.title}
                                description={post.description}
                                images={post.images}
                                tags={post.tags}
                                postId={post._id}
                                isLiked={post.isLiked}
                                likes={post.likes} />
                        </div>
                    ))}
            </Container>
        </div>
    )
}

export default Homepage
