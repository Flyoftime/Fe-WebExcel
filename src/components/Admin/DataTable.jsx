import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import Link from "next/link";
import { useState } from "react";

const Datatable = () => {
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
                <div className="flex items-center space-x-4">
                    <Link href="/users/test" passHref>
                        <button className="px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white">
                            View
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(params.row.id)}
                        className="px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4 bg-white rounded shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Add New User</h1>
                <Link href="/users/new" passHref>
                    <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                        Add New
                    </button>
                </Link>
            </div>
            <DataGrid
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                className="h-[600px]"
            />
        </div>
    );
};

export default Datatable;
