import React, { useState, useEffect } from 'react'
import Bot from '../ChatBot/Bot'
import todoService from '../services/todoService';
import { useSelector } from 'react-redux'

function Sidebar() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchTodos = async () => {
            if (!userData) return;
            setLoading(true);
            setError(null);
            try {
                const todoResponse = await todoService.getMyTodo(userData.username);
                setTodos(todoResponse?.data || []);
            } catch (err) {
                console.error("Error fetching todos:", err);
                setError(err.message || "Failed to fetch todos.");
                setTodos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [userData, authStatus]);

    return (
        <div className="w-1/4 h-screen bg-black text-white p-4 border-l-2 border-zinc-700 fixed right-0 flex flex-col justify-between">

            <div class=" bg-black shadow-md rounded-xl p-4">
                <svg viewBox="0 0 400 250" class="w-full">
                    <path d="M 20 200
                Q 80 100, 140 160
                Q 200 220, 260 80
                Q 320 60, 380 120"
                        class="fill-none stroke-blue-500 stroke-[3]" />

                    <circle cx="20" cy="200" r="5" class="fill-blue-500 stroke-white stroke-2" />
                    <circle cx="140" cy="160" r="5" class="fill-blue-500 stroke-white stroke-2" />
                    <circle cx="260" cy="80" r="5" class="fill-blue-500 stroke-white stroke-2" />
                    <circle cx="380" cy="120" r="5" class="fill-blue-500 stroke-white stroke-2" />
                </svg>
            </div>
            {authStatus && (<div className='bg-zinc-900 m-2 rounded-2xl p-2'>
                <h1 className='text-center'>Don't forget your goals!!!</h1>
                <div className='flex flex-col gap-2 p-2 '>
                    {loading && <p>Loading todos...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!loading && !error && todos.length === 0 && <p>No tasks yet. Add one!</p>}
                    {!loading && !error && todos.length > 0 && (
                        todos.map((todo) => (
                            <span key={todo._id} className='border-b-2 border-zinc-700'>
                                {todo.content}
                            </span>
                        ))
                    )}
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
            </div>)
            }
            <Bot />
        </div>
    )
}

export default Sidebar
