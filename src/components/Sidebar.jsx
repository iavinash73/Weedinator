import React from 'react'
import dashIcon from '../images/dashboard.png'
import analysisIcon from '../images/analysis.png'
import alertIcon from '../images/alert.png'
import { Link } from 'react-router-dom'
import sideImg from '../images/side_img.png'
export default function Sidebar() {
    return (
        <div className='w-[20%] bg-[#007155] text-white'>
            <div className='my-10 mx-8 h-screen'>
                <div className='mt-8 flex items-center flex-col'>
                    <img src={sideImg} className='w-[80%]' />
                </div>
                <div className='mt-8 outfit-400'>
                    <Link to="/" className='flex'>
                        <img src={dashIcon} className='w-6' />
                        <div className='ml-4'>Dashboard</div>
                    </Link>
                    <Link to="/livefeed" className='flex mt-8'>
                        <img src={alertIcon} className='w-6' />
                        <div className='ml-4'>LiveFeed</div>
                    </Link>

                    <Link to="/analytics" className='flex mt-8'>
                        <img src={analysisIcon} className='w-6' />
                        <div className='ml-4'>Analytics</div>
                    </Link>
                </div>
                <hr className='mt-8'></hr>
                <div className='text-[#FFEA2E] outfit-600 text-[24px] text-center mt-4'>WEEDINATOR</div>
            </div>
        </div>
    )
}
