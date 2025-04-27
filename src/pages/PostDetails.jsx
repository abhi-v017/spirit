import React from 'react'
import Container from '../components/Container'

function PostDetails() {
    return (
        <div>
            <Container>
                <div className='bg-black w-full min-h-screen flex flex-col justify-center items-center'>
                    <div className='w-1/2'>
                        <img className='rounded-sm ' src="https://i.pinimg.com/474x/53/18/39/531839a357ecfc245f60c8bf71539d8b.jpg" alt="" />
                    </div>
                    <div className='flex gap-4 p-2'>
                        <span className='text-white flex items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#d0021b" fill="none">
                                <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            1
                        </span>
                        <span className='text-white flex items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path d="M8 13.5H16M8 8.5H12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path>
                            </svg>
                            1
                        </span>
                    </div>
                    <div className='text-white flex flex-col gap-2 p-2'>
                        <span>Title</span>
                        <span>Description</span>
                        <span>Tags</span>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default PostDetails
