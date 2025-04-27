import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../components/Container'
import postService from '../services/postService'
import persueService from '../services/persueService'
import { Link } from 'react-router-dom'

function Userprofile() {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [profile, setProfile] = useState(null)
    // const [persuing, setPersuing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [posts, setPosts] = useState([])
    const [postsLoading, setPostsLoading] = useState(true)
    const [postsError, setPostsError] = useState('')
    const { username } = useParams()
    console.log(username)
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await postService.getProfileByUsername(username)
                if (response.success) {
                    setProfile(response.data)
                } else {
                    setError(response.message || 'Failed to fetch profile')
                }
                console.log(profile)
            } catch (error) {
                setError(error.message || 'Failed to fetch profile')
            } finally {
                setLoading(false)
            }
        }

        // const fetchUserPosts = async () => {
        //     try {
        //         setPostsLoading(true)
        //         setPostsError('')
        //         const response = await postService.getmyPosts()
        //         if (response.success) {
        //             setPosts(response.data.posts)
        //         } else {
        //             setPostsError(response.message || 'Failed to fetch posts')
        //         }
        //     } catch (error) {
        //         setPostsError(error.message || 'Failed to fetch posts')
        //     } finally {
        //         setPostsLoading(false)
        //     }
        // }

        fetchProfileData()
        // fetchUserPosts()
    }, [authStatus, username])

    // const handlePersue = async (e) => {
    //     e.stopPropagation() // Prevent navigation when clicking the Persu button
    //     if (!authStatus) {
    //         alert("You must be logged in to Persu users.")
    //         return
    //     }

    //     setLoading(true)
    //     try {
    //         const response = await persueService.persueUserService(userId)
    //         if (response.success) {
    //             setPersuing(!Persuing)
    //         }
    //     } catch (error) {
    //         console.error('Error Persuing user:', error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const handlePersuers = () => {
        if (profile?.username) {
            navigate(`/profile/${profile.username}/persuers`)
        }
    }

    const handlePersuing = () => {
        if (profile?.username) {
            navigate(`/profile/${profile.username}/persuings`)
        }
    }

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Container>
        )
    }


    return (
        <div>
            <Container>
                <div className="bg-black text-white min-h-screen w-full p-4">

                    {/* <!-- Cover Image --> */}
                    <div className="max-w-md mx-auto mb-1">
                        <img src={profile.coverImage || 'https://i.pinimg.com/474x/4a/4a/60/4a4a6092d928de8fa481f5280e04efbe.jpg'} alt="Cover Image" class="w-full h-32 object-cover rounded-xl" />
                    </div>

                    {/* <!-- Profile Section --> */}
                    <div className="bg-zinc-900 rounded-xl p-4 space-y-4 max-w-md mx-auto">

                        {/* <!-- Header --> */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <img src={profile.avtar}
                                    alt="Profile Picture"
                                    className="w-20 h-20 rounded-full object-cover" />
                                <div>
                                    <h2 className="text-lg font-semibold">{profile.username}</h2>
                                    <p className="text-sm text-gray-400">{profile.bio}</p>
                                    <div className="text-xs text-gray-400 space-x-2 mt-1">
                                        <span onClick={handlePersuing}>Persuing:{profile.persuingCount}</span>
                                        <span onClick={handlePersuers}>Perseuers: {profile.persuersCount}</span>
                                    </div>
                                </div>
                            </div>
                            <div to={'/update-profile'}>
                                <button
                                    // onClick={handlePersue}
                                    // disabled={loading}
                                    // className={`px-4 py-2 rounded-lg font-medium transition-colors ${Persuing
                                    //     ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                                    //     : 'bg-blue-500 text-white hover:bg-blue-600'
                                    //     } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {/* {loading ? '...' : Persuing ? 'Persuing' : 'Persue'} */}
                                    Peruse</button>
                            </div>
                        </div>

                        {/* <!-- Posts Section --> */}
                        <div className="bg-black rounded-lg p-2">
                            <div className="bg-black">
                                <div className="flex h-full flex-wrap gap-4 justify-center">
                                    <Link to={'/post-details/:id'} className="w-[30%]">
                                        <img className='rounded-2xl' src="https://i.pinimg.com/474x/53/18/39/531839a357ecfc245f60c8bf71539d8b.jpg" alt="" />
                                    </Link>
                                    <Link to={'/post-details/:id'} className="w-[30%]">
                                        <img className='rounded-2xl' src="https://i.pinimg.com/474x/53/18/39/531839a357ecfc245f60c8bf71539d8b.jpg" alt="" />
                                    </Link>
                                    <Link to={'/post-details/:id'} className="w-[30%]">
                                        <img className='rounded-2xl' src="https://i.pinimg.com/474x/53/18/39/531839a357ecfc245f60c8bf71539d8b.jpg" alt="" />
                                    </Link>
                                    <Link to={'/post-details/:id'} className="w-[30%]">
                                        <img className='rounded-2xl' src="https://i.pinimg.com/474x/53/18/39/531839a357ecfc245f60c8bf71539d8b.jpg" alt="" />
                                    </Link>
                                    <Link to={'/post-details/:id'} className="w-[30%]">
                                        <img className='rounded-2xl' src="https://i.pinimg.com/474x/53/18/39/531839a357ecfc245f60c8bf71539d8b.jpg" alt="" />
                                    </Link>

                                </div>
                            </div>
                        </div>

                        {/* <!-- Strategies --> */}


                        {/* <!-- user graph --> */}
                        <div class=" bg-black shadow-md rounded-xl p-4">
                            <button className="bg-violet-600 text-white px-4 py-1 rounded-full">Compare</button>
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
                    </div>

                </div>
            </Container >
        </div >
    )
}

export default Userprofile

