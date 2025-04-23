import React, { useState } from 'react'
import Container from '../components/Container'
import postService from '../services/postService';


function Search() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const searchProfile = async (username) => {
        setError('')
        setLoading(true);
        try {
            const response = await postService.getProfileByUsername(username)
            if (response.success) {
                setProfile(response.data)
            } else {
                setError(response.message || 'Failed to fetch profile')
            }
            console.log(profile)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const username = e.target.elements.username.value;
        console.log(username) // Get the username from the input
        searchProfile(username); // Call the searchProfile function
    };

    return (
        <div>
            <Container>
                <div className="bg-black h-screen w-full flex p-2 justify-center">
                    <div className="bg-zinc-900 rounded-xl w-full p-4 space-y-4">
                        {/* <!-- Search Input --> */}
                        <form onSubmit={handleSearchSubmit} className='flex items-center gap-2 justify-center'>
                            <input name='username' className='bg-black text-white border-2 border-zinc-700 rounded-lg px-2 py-1' type="text" placeholder='Search...' />
                            <button type='submit'>
                                <svg className='cursor-pointer hover:text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#525b56" fill="none">
                                    <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>

                        {/* <!-- Searched User --> */}
                        {profile && (<div className="flex items-center justify-between bg-black rounded-lg p-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl">
                                    <img className='w-10 h-10 rounded-full object-cover' src={profile.avtar} alt="" />
                                </div>
                                <span className="text-white font-semibold">{profile.username}</span>
                            </div>
                            <button className="bg-zinc-600 text-white px-4 py-1 rounded-full">Persue</button>
                        </div>)}
                    </div>

                    {/* <!-- For person icon support --> */}
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                </div>
            </Container>

        </div>
    )
}

export default Search
