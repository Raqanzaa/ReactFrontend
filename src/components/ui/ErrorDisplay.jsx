// src/components/ui/ErrorDisplay.jsx

import React from 'react';

const ErrorDisplay = ({ message = "An unexpected error occurred." }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default ErrorDisplay;