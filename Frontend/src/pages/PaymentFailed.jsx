import React from 'react'
import { RxCrossCircled } from "react-icons/rx";

export default function PaymentFailed() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="flex flex-col items-center">
                    <RxCrossCircled className="text-red-500 h-16 w-16" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Payment Failed</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Please try again later. Your amount will be refunded. if deducted.
                    </p>
                </div>
            </div>
        </div>
    )
}
