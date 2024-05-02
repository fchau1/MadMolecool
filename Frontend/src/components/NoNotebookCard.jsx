
export default function NoNotebookCard () {
    return (
        <div className="max-w-lg text-2xl mx-auto text-gray-300">
            <div className="bg-white rounded-lg p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold ">No Notebooks Created</h2>
                    <p className="mt-2 text-md ">{"You haven't created any notebooks yet. Get started by creating your first notebook!"}</p>
                </div>
            </div>
        </div>
    );
};
