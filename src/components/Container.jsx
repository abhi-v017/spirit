import React from 'react'

function Container({ children }) {
    return (
        <div className='flex flex-col justify-center items-center'>
            {children}
        </div>
    )
}

export default Container