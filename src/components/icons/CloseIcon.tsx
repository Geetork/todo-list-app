import React from "react";

export const CloseIcon: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <svg 
            onClick={onClick}
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
        </svg>
    )
};