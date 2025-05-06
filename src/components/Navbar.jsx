import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService from '../services/authService'
import { logout } from '../store/authSlice'

function Navbar() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [profile, setProfile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await authService.getUserService()
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

        fetchProfile()
    }, [authStatus])

    const handleLogout = async () => {
        try {
            await authService.logoutService()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    const navItems = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M8.9995 22L8.74887 18.4911C8.61412 16.6046 10.1082 15 11.9995 15C13.8908 15 15.3849 16.6046 15.2501 18.4911L14.9995 22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>),
            name: "Home",
            slug: '/',
            active: true
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M17 17L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>),
            name: "Search",
            slug: '/search',
            active: authStatus
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M13.5 7H10.5C8.61438 7 7.67157 7 7.08579 7.58579C6.5 8.17157 6.5 9.11438 6.5 11V11.5C6.5 13.3856 6.5 14.3284 7.08579 14.9142C7.67157 15.5 8.61438 15.5 10.5 15.5H13.5C15.3856 15.5 16.3284 15.5 16.9142 14.9142C17.5 14.3284 17.5 13.3856 17.5 11.5V11C17.5 9.11438 17.5 8.17157 16.9142 7.58579C16.3284 7 15.3856 7 13.5 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 7V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.5 19L10.5 22M10.5 19L13.5 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 19L18 22M18 19L21 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 19L3 22M3 19L6 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>),
            name: "Login/Register",
            slug: '/login',
            active: !authStatus
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M8.5 14.5H15.5M8.5 9.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>),
            name: "Messages",
            slug: '/messages',
            active: authStatus
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M12 8V16M16 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            </svg>),
            name: "Add Post",
            slug: '/add-post',
            active: authStatus
        },
    ]
    return (
        <div className='w-1/5 h-screen bg-black text-white border-r-2 border-zinc-700 fixed left-0 top-0 z-50'>
            <nav className='bg-zinc-900 p-4 rounded-2xl h-[calc(100%-0.5rem)] mx-2 my-1 flex flex-col justify-between'>
                <div className='flex justify-center items-center'>
                    <span className='flex justify-center items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M11.6686 5.21225C11.8066 4.92946 12.1934 4.92947 12.3314 5.21225L13.1449 6.87978C13.1989 6.99046 13.3003 7.06749 13.4178 7.08703L15.1862 7.38122C15.4859 7.43108 15.6054 7.81473 15.391 8.0392L14.125 9.36513C14.0412 9.45297 14.0025 9.57736 14.021 9.69991L14.3 11.5504C14.3473 11.8638 14.0345 12.101 13.7638 11.957L12.1688 11.1083C12.0628 11.0518 11.9372 11.0518 11.8312 11.1083L10.2362 11.957C9.96554 12.101 9.65271 11.8638 9.69996 11.5504L9.979 9.69991C9.99748 9.57736 9.95882 9.45297 9.87495 9.36513L8.60896 8.0392C8.39464 7.81473 8.51408 7.43108 8.8138 7.38122L10.5822 7.08703C10.6997 7.06749 10.8011 6.99046 10.8551 6.87978L11.6686 5.21225Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 16.3424L14.6264 20.6513C14.9541 21.5195 15.118 21.9536 15.403 22C15.6887 21.9578 16.0387 21.4804 16.3808 20.6172C16.6258 19.9991 16.7482 19.6901 17.0005 19.5235C17.0779 19.4724 17.1625 19.432 17.252 19.4035C17.5436 19.3108 17.879 19.4015 18.5497 19.5828C19.2669 19.7767 19.7651 19.7226 19.9618 19.5828C20.0197 19.5417 19.9618 19.5797 19.9618 19.5797C20.0776 19.3743 19.9213 19.0539 19.6088 18.4131L17.4561 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 16.3421L9.3736 20.6503C9.0459 21.5183 8.72171 21.9536 8.43671 22C8.15097 21.9578 7.97992 21.5263 7.63781 20.6632C7.39287 20.0453 7.25175 19.6893 6.99948 19.5226C6.92213 19.4715 6.83745 19.4312 6.74803 19.4027C6.45638 19.31 6.12101 19.4007 5.45027 19.582C4.73308 19.7758 4.2349 19.7186 4.03815 19.5788C3.92237 19.3735 4.07866 19.0531 4.39123 18.4124L6.54387 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Level:- 1</span>
                    </span>
                </div>

                <ul className='flex flex-col items-center space-y-4'>
                    {navItems.map((item, index) => item.active ? (
                        <li
                            onClick={() => navigate(item.slug)}
                            className='flex items-center gap-2 cursor-pointer hover:bg-zinc-200 hover:text-black rounded-2xl px-4 py-2 w-full group'
                            key={index}
                        >
                            <div className="group-hover:text-black text-white">
                                {item.icon}
                            </div>
                            <span>{item.name}</span>
                        </li>
                    ) : null
                    )}
                    {authStatus && (<li onClick={handleLogout} className='flex items-center gap-2 cursor-pointer hover:bg-zinc-200 hover:text-black rounded-2xl px-4 py-2 w-full group'>
                        <div className="group-hover:text-black text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                <path d="M12 8V16M16 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <span>Logout</span>
                    </li>)}
                    
                </ul>
                {authStatus && (<Link to={'/my-profile'} className='flex gap-2 justify-center items-center cursor-pointer hover:bg-zinc-200 hover:text-black rounded-2xl px-4 py-2'>
                    <img className='rounded-full h-10 w-10 object-cover' src={profile.avtar} alt="" />
                    <span>{profile.username}</span>
                </Link>)}
            </nav>
        </div>
    )
}

export default Navbar
