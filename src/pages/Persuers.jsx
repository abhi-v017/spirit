import React, { useEffect, useState } from 'react'
import Persue from '../components/Persue'
import { useParams } from 'react-router-dom'
import persueService from '../services/persueService'
import Container from '../components/Container'

function Persuers() {
    const [persuers, setpersuers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { username } = useParams()

    useEffect(() => {
        const fetchpersuers = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await persueService.persuerListService(username)
                if (response.success) {
                    setpersuers(response.data.persuers)
                } else {
                    setError(response.message || 'Failed to fetch persuers')
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch persuers')
            } finally {
                setLoading(false)
            }
        }

        if (username) {
            fetchpersuers()
        }
    }, [username])

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[89.5vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[89.5vh]">
                    <div className="text-red-500 text-center">
                        <p className="text-xl font-semibold mb-2">Error</p>
                        <p>{error}</p>
                    </div>
                </div>
            </Container>
        )
    }

    if (persuers.length === 0) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[89.5vh]">
                    <div className="text-gray-500 text-center">
                        <p className="text-xl font-semibold">No persuers Yet</p>
                        <p className="text-sm mt-2">When someone persus you, they'll appear here</p>
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="w-full min-h-[89.5vh] p-4 bg-black">
                <h1 className="text-2xl font-bold text-white mb-6">persuers</h1>
                <div className="space-y-4">
                    {persuers.map((persuer) => (
                        <div key={persuer._id} className="w-full">
                            <Persue
                                image={persuer.avtar || "https://via.placeholder.com/150"}
                                username={persuer.username}
                                fullName={persuer.fullName}
                                userId={persuer._id}
                                ispersuing={persuer.ispersuing}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default Persuers