import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid  gap-5'>
        <Link href={'/dashboard/create-interview'} className=' flex items-center gap-4 bg-white border broder-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-lg transition-all duration-200'>
            <Video className=' p-3 text-primary bg-blue-50 rounded-lg '  size={40}/>
            <h2 className='font-bold'>Create New InterView</h2>
            <p className='text-gray-500'>Create Ai Interwiew And Schedule With Candidate</p>
        </Link>
{/*         
        <div className='bg-white border broder-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-lg transition-all duration-200'>
            <Phone className=' p-3 text-primary bg-blue-50 rounded-lg '  size={40}/>
            <h2 className='font-bold'>Create Phone Screening Call</h2>
            <p className='text-gray-500'>Create Phone Screening And Schedule With Candidate</p>
        </div> */}
        
    </div>
  )
}

export default CreateOptions