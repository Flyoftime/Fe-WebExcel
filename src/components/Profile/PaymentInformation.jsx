
import React from 'react';

const PaymentInformation = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">Upcoming Payment</h1>
                    <button className="px-4 py-2 text-gray-800  rounded hover:text-blue-600">View History</button>
                </div>
                <p className="mt-2 text-gray-600">No upcoming payment</p>
            </div>
            <div className="mt-6">
                <div className='flex justify-between items-center'>
                    <h1 className="text-xl font-semibold text-gray-800">Payment Method</h1>
                    <button className="mt-4 px-4 py-2 text-gray-800 rounded hover:text-blue-600">Update</button>
                </div>
                <p className="mt-2 text-gray-600">No card on file</p>
            </div>
        </div>
    );
};

export default PaymentInformation;
