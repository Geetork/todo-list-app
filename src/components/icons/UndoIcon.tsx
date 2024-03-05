import React from "react";

export const UndoIcon: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
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
                stroke="#A9CDF3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
            />
        </svg>
    )
};