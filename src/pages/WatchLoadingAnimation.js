import React from 'react';

const WatchLoadingAnimation = () => {
    return (
        <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="watch-loading"
        >
            {/* Outer Circle */}
            <circle
                cx="50"
                cy="50"
                r="48"
                stroke="url(#outerGradient)"
                strokeWidth="3"
                fill="none"
            />
            {/* Watch Face */}
            <circle
                cx="50"
                cy="50"
                r="45"
                fill="url(#faceGradient)"
                stroke="#e0e0e0"
                strokeWidth="1"
            />
            {/* Center Dot */}
            <circle cx="50" cy="50" r="3" fill="#0077ff" />
            {/* Seconds Hand */}
            <line
                x1="50"
                y1="50"
                x2="50"
                y2="10"
                stroke="#0077ff"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </line>
            {/* Gradients */}
            <defs>
                <linearGradient id="outerGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0077ff" />
                    <stop offset="100%" stopColor="#005fcc" />
                </linearGradient>
                <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f4f4f4" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default WatchLoadingAnimation;