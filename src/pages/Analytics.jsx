import React from 'react'
import Sidebar from "../components/Sidebar";
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import BubbleChart from '../components/charts/BubbleChart'
import { MultiLine } from '../components/charts/MultiLine';
import ScatterChart from '../components/charts/ScatterChart'
export default function Analytics() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-[80%] flex flex-col p-16">
                <div>
                    <h1 className="outfit-600 text-[28px] mb-2">Analytics</h1>
                    <p className="outfit-300">Unlocking Insights: Your Comprehensive Cannabis Analysis Dashboard.</p>
                </div>
                <div className='flex flex-col mt-4 '>
                    <div className='mt-8 mb-10'>
                        <div>
                            <h1 className='outfit-500 text-[20px]'>Monthly Weed Count Analysis</h1>
                            <p className='outfit-300'>Track the growth and development of your cannabis plants throughout the year with our Monthly Plant Weed Count Analysis, helping you optimize cultivation practices and yield.</p>
                        </div>
                        <div className='mt-4 mx-auto'>
                            <LineChart />
                        </div>

                    </div>


                    <div className='my-8 flex items-center mb-4'>
                        <div className='w-1/3'>
                            <h1 className='outfit-500 text-[20px]'>Weed Type Detection Analysis</h1>
                            <p className='outfit-300'>Gain discreet insights into the variety of cannabis strains present in your inventory with our Weed Type Detection Analysis, empowering data-driven decision-making for your business.</p>
                        </div>
                        <div className='mt-4 w-2/3'>
                            <PieChart />
                        </div>

                    </div>


                    <div className='my-8 flex items-center gap-8 mb-10'>
                        <div className='mt-4 w-2/3'>
                            <BubbleChart />
                        </div>
                        <div className='w-1/3'>
                            <h1 className='outfit-500 text-[20px]'>Humidity vs. Temperature Impact On Weeds</h1>
                            <p className='outfit-300'>Visualize the relationship between humidity and temperature in your cannabis cultivation environment, with the size of bubbles representing weed counts for comprehensive climate analysis.</p>
                        </div>


                    </div>


                    <div className='my-8'>
                        <div className=''>
                            <h1 className='outfit-500 text-[20px]'>Weed Control Impact: Before and After</h1>
                            <p className='outfit-300'>Track the effectiveness of your weed control measures with a multi-line chart, comparing weed counts before and after implementation for data-driven decision-making.</p>
                        </div>
                        <div className='mt-4'>
                            <MultiLine />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}



