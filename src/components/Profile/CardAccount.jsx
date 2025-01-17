import React from 'react'
import YourProfile from './YourProfile'
import PaymentInformation from './PaymentInformation'


const CardAccount = () => {
    return (
        <div className=''>

            <div className='p-8 flex flex-col md:flex-row gap-[50px] items-start'>
                <div className='relative card w-full md:w-[400px] h-[400px] bg-[#ffff] drop-shadow-xl p-2 ms-2'>
                    <div className='grid grid-rows-3 grid-flow-col p-2'>
                        <div className='col-span-11 p-1 m-1 text-base font-bold font-montserrat text-black'>
                            <h1 className='p-6 text-xl'>Your Profile</h1>
                            <YourProfile />
                        </div>
                    </div>
                </div>

                <div className='card w-full md:w-[600px] h-[400px] bg-[#ffff] drop-shadow-xl p-2 ms-2'>
                    <div className='grid grid-rows-3 grid-flow-col p-2'>
                        <div className='col-span-11 p-1 m-1 text-base font-bold font-montserrat text-black'>
                            <h1 className='p-6 text-xl'>Payment Information</h1>
                            <PaymentInformation />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardAccount