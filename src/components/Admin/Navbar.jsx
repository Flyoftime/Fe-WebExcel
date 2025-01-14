import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = () => {
    return (
        <div className="navbar h-[50px] border-b-[0.5px] border-gray-300 flex items-center text-sm text-gray-700">
            <div className="w-full px-5 flex items-center justify-between">
                {/* Search */}
                <div className="search flex items-center border-[0.5px] border-gray-300 p-[3px]">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-none outline-none bg-transparent text-xs placeholder:text-xs"
                    />
                    <SearchOutlinedIcon />
                </div>
                {/* Items */}
                <div className="items flex items-center">
                    <div className="item flex items-center mr-5 relative">
                        <LanguageOutlinedIcon className="text-lg" />
                        <span className="ml-1">English</span>
                    </div>
                    {/* <div className="item flex items-center mr-5 relative">
                        <DarkModeOutlinedIcon
                            className="text-lg cursor-pointer"
                            onClick={() => dispatch({ type: "TOGGLE" })}
                        />
                    </div> */}
                    <div className="item flex items-center mr-5 relative">
                        <FullscreenExitOutlinedIcon className="text-lg" />
                    </div>
                    <div className="item flex items-center mr-5 relative">
                        <NotificationsNoneOutlinedIcon className="text-lg" />
                        <div className="counter w-[15px] h-[15px] bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full absolute top-[-5px] right-[-5px]">
                            1
                        </div>
                    </div>
                    <div className="item flex items-center mr-5 relative">
                        <ChatBubbleOutlineOutlinedIcon className="text-lg" />
                        <div className="counter w-[15px] h-[15px] bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full absolute top-[-5px] right-[-5px]">
                            2
                        </div>
                    </div>
                    <div className="item flex items-center mr-5 relative">
                        <ListOutlinedIcon className="text-lg" />
                    </div>
                    <div className="item flex items-center">
                        <img
                            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt="avatar"
                            className="w-[30px] h-[30px] rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
