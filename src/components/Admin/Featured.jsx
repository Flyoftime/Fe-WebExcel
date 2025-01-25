import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
    return (
        <div className="flex-[2] shadow-md p-4">
            <div className="flex items-center justify-between text-gray-500">
                <h1 className="text-lg font-medium">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 p-5">
                <div className="w-24 h-24">
                    <div className="radial-progress" style={{ "--value": 70 }} role="progressbar">
                        70%
                    </div>
                </div>
                <p className="font-medium text-gray-500">Total sales made today</p>
                <p className="text-2xl">$420</p>
                <p className="text-center text-sm font-light text-gray-500">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="w-full flex items-center justify-between">
                    <div className="text-center">
                        <div className="text-sm text-gray-500">Target</div>
                        <div className="flex items-center mt-2 text-sm text-red-500">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className="ml-1">$12.4k</div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-500">Last Week</div>
                        <div className="flex items-center mt-2 text-sm text-green-500">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="ml-1">$12.4k</div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-500">Last Month</div>
                        <div className="flex items-center mt-2 text-sm text-green-500">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="ml-1">$12.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Featured;
