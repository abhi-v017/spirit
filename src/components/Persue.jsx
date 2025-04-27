import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import persueService from '../services/persueService'

function Persue({ image, username, fullName, userId, ispersuing }) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [persuing, setpersuing] = useState(ispersuing)
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        navigate(`/profile/${username}`)
    }

    const handlepersu = async (e) => {
        e.stopPropagation() // Prevent navigation when clicking the persu button
        if (!authStatus) {
            alert("You must be logged in to persue users.")
            return
        }

        setLoading(true)
        try {
            const response = await persueService.persueUserService(userId)
            if (response.success) {
                setpersuing(!persuing)
            }
        } catch (error) {
            console.error('Error persuing user:', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div 
            onClick={handleClick}
            className='flex items-center gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer'
        >
            <img 
                className='w-12 h-12 rounded-full object-cover border-2 border-blue-500' 
                src={image} 
                alt={username} 
            />
            <div className="flex-1">
                <h3 className="text-white font-semibold">{fullName || username}</h3>
                <p className="text-gray-400 text-sm">@{username}</p>
            </div>
            {authStatus && (
                <button
                    onClick={handlepersu}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        persuing 
                            ? 'bg-zinc-700 text-white hover:bg-zinc-600' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {loading ? '...' : persuing ? 'persuing' : 'persue'}
                </button>
            )}
        </div>
    )
}

export default Persue