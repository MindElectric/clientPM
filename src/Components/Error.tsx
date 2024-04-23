

const Error = ({ children }: { children: string }) => {
    return (
        <div className="p-3 mb-3 font-bold text-center text-white uppercase bg-red-800 rounded-md">
            {children}
        </div>
    )
}

export default Error