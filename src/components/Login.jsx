import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../services/authService'
import { login } from '../store/authSlice'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const loginHandler = async (data) => {
        setError('')
        setLoading(true);
        try {
            const response = await authService.loginService(data.email, data.password)
            if (response?.data?.accessToken) {
                const currentUser = await authService.getUserService()
                dispatch(login(currentUser.data));
                navigate('/')
            } else {
                setError('Invalid response from server')
            }
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className='bg-zinc-950 text-white p-4 w-full h-[88.1vh] flex justify-center items-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
            </div>
        )
    }


    return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-white mb-1">Email:</label>
                        <input
                            {...register("email", {
                                required: "email is required"
                            })}
                            type="em"
                            id="email"
                            name='email'
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-white mb-1">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-center text-base text-zinc-400">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/register"
                            className="font-medium text-white hover:text-zinc-300 transition-colors"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
