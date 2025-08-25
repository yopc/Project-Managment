import { CircleCheck, ShieldCheck } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const VerificationSuccessfullPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='h-96 w-96 border border-gray-300 rounded-lg flex items-center justify-center flex-col gap-10'>
            <ShieldCheck size={150}  color='lightgreen' className=' rounded-lg shadow-2xl'/>
            <p className="flex items-center text-green-600 gap-2">
                Email verified successfully <CircleCheck />
            </p>

            <Link to="/login" className="text-primary hover:underline">
             Login
            </Link>

        </div>
    </div>
  )
}

export default VerificationSuccessfullPage