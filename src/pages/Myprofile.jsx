import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import postService from '../services/postService'
import { Link } from 'react-router-dom'

function Myprofile() {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [posts, setPosts] = useState([])
    const [postsLoading, setPostsLoading] = useState(true)
    const [postsError, setPostsError] = useState('')

    useEffect(() => {
        if (!authStatus) {
            navigate('/login')
            return
        }

        const fetchProfileData = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await postService.getProfileService()
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

        const fetchUserPosts = async () => {
            try {
                setPostsLoading(true)
                setPostsError('')
                const response = await postService.getmyPosts()
                if (response.success) {
                    setPosts(response.data.posts)
                } else {
                    setPostsError(response.message || 'Failed to fetch posts')
                }
            } catch (error) {
                setPostsError(error.message || 'Failed to fetch posts')
            } finally {
                setPostsLoading(false)
            }
        }

        fetchProfileData()
        fetchUserPosts()
    }, [authStatus, navigate])

    const handleFollowers = () => {
        if (profile?.username) {
            navigate(`/profile/${profile.username}/followers`)
        }
    }

    const handleFollowing = () => {
        if (profile?.username) {
            navigate(`/profile/${profile.username}/followings`)
        }
    }

    const handleUpdateProfile = () => {
        navigate('/update-profile')
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
                                        <span>Persuing:{profile.persuingCount}</span>
                                        <span>Perseuers: {profile.persuersCount}</span>
                                    </div>
                                </div>
                            </div>
                            <Link to={'/update-profile'}>
                                <button className="bg-violet-600 text-white px-4 py-1 rounded-full">Edit Profile</button>
                            </Link>
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
                        <div className="bg-black rounded-lg p-4 space-y-2">
                            <h3 className="font-semibold">Strategies (Roadmap)</h3>
                            <p className="text-white">strategies made using AI analysis (personalized)</p>
                        </div>

                        {/* <!-- Suggestions --> */}
                        <div className="bg-black rounded-lg p-4 space-y-1">
                            <h3 className="font-semibold text-gray-300">Suggestions (For Daily task)</h3>
                            <p className="text-sm text-gray-500">Such as complete this target for today's growth and update it on the app</p>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default Myprofile
