
export default function UserNameTaken({onClose}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="rounded-lg bg-white p-6 shadow-lg w-96">
                <h2 className="text-xl font-bold text-red-600">
                    Username not available
                </h2>

                <p className="mt-3">
                    That username has been taken. Create another.
                </p>

                <button
                    onClick={onClose}
                    className="mt-5 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
