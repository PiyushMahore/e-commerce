// import { Card } from "@/components/ui/card"

export default function Success() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="flex flex-col items-center">
                    <CircleCheckIcon className="text-green-500 h-16 w-16" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Payment Successful</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Thank you for your payment. Your order is being processed.
                    </p>
                </div>
            </div>
        </div>
    )
}

function CircleCheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}