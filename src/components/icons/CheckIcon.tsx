import React from "react";

export const CheckIcon: React.FC<{ onClick?: () => void}> = ({ onClick }) => {
    return (
        <svg
            onClick={onClick}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            >
            <path
                stroke="#CCE6B9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 12 4.7 4.5 9.3-9"
            />
        </svg>
    )
};