import React from 'react'

function Sidebar() {
    return (
        <div className="w-1/4 h-screen bg-black text-white p-4 border-l-2 border-zinc-700 fixed right-0 flex flex-col justify-between">

            <div class=" bg-black shadow-md rounded-xl p-4">
                <svg viewBox="0 0 400 250" class="w-full">
                    {/* <!-- Line path --> */}
                    <path d="M 20 200
                Q 80 100, 140 160
                Q 200 220, 260 80
                Q 320 60, 380 120"
                        class="fill-none stroke-blue-500 stroke-[3]" />

                    {/* <!-- Data points --> */}
                    <circle cx="20" cy="200" r="5" class="fill-blue-500 stroke-white stroke-2" />
                    <circle cx="140" cy="160" r="5" class="fill-blue-500 stroke-white stroke-2" />
                    <circle cx="260" cy="80" r="5" class="fill-blue-500 stroke-white stroke-2" />
                    <circle cx="380" cy="120" r="5" class="fill-blue-500 stroke-white stroke-2" />
                </svg>
            </div>
            <div className='bg-zinc-900 m-2 rounded-2xl p-2'>
                <h1 className='text-center'>Don't forget your goals!!!</h1>
                <div className='flex flex-col gap-2 p-2 '>
                    <span className='border-b-2 border-zinc-700'>task: 1</span>
                    <span className='border-b-2 border-zinc-700'>task: 2</span>
                    <span className='border-b-2 border-zinc-700'>task: 3</span>
                    <span className='border-b-2 border-zinc-700'>task: 4</span>
                    <span className='border-b-2 border-zinc-700'>task: 5</span>
                </div>
                <form className='flex items-center justify-center gap-2'>
                    <input className='rounded-2xl p-2 focus:outline-none focus:border-none' type="text" placeholder='Add Tasks!!!' />
                    <button className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </form>
            </div>
            <div className='border-2 border-zinc-700 rounded-full p-2 flex justify-between items-center'>
                <input className='focus:outline-none focus:border-none' type="text" placeholder='chat with the bot: ' />
                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M9.49811 15L16.9981 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.00634 7.67888L15.327 4.21881C18.3688 2.78111 19.8897 2.06226 20.8598 2.78341C21.8299 3.50455 21.5527 5.14799 20.9984 8.43486L20.0435 14.0968C19.6811 16.246 19.4998 17.3205 18.6989 17.7891C17.8979 18.2577 16.8574 17.8978 14.7765 17.178L8.41077 14.9762C4.51917 13.6301 2.57337 12.9571 2.50019 11.6365C2.427 10.3159 4.28678 9.43692 8.00634 7.67888Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.49811 15.5V17.7274C9.49811 20.101 9.49811 21.2878 10.2083 21.4771C10.9185 21.6663 11.6664 20.6789 13.1622 18.7039L13.9981 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg></span>
            </div>
        </div>
    )
}

export default Sidebar
