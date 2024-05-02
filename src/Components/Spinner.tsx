
const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
            <svg
                className="w-12 h-12 text-customPrimary animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="64 64"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
