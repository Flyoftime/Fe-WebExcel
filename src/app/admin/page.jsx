import DashboardAdmin from '@/components/Admin/DashboardAdmin';
import Navbar from '@/components/Admin/Navbar';
import SideBarAdmin from '@/components/Admin/SideBarAdmin';
import React from 'react';
import Widget from '@/components/Admin/Widget';
import Featured from '@/components/Admin/Featured';
import Chart from '@/components/Admin/Chart';
import Table from '@/components/Admin/Table';
const Adminpage = () => {
    return (
        // <div className="flex min-h-screen">
        //   {/* Sidebar di sebelah kiri */}
        //   <SideBarAdmin />

        //   {/* Kontainer utama untuk Navbar dan Dashboard */}
        //   <div className="flex-1 flex flex-col">
        //     {/* Navbar di atas */}
        //     <Navbar />

        //     {/* Dashboard di bawah Navbar */}
        //     <div className="flex-1 p-5">
        //       <DashboardAdmin />
        //     </div>
        //   </div>
        // </div>
        <div className="flex bg-white">
            <SideBarAdmin />
            <div className="flex-6">
                <Navbar />
                <div className="flex p-5 gap-5">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />
                </div>
                <div className="flex p-1 gap-5">
                    <Featured />
                    <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
                </div>
                <div className="shadow-md p-5 m-5">
                    <div className="font-medium text-gray-500 mb-4">Latest Transactions</div>
                    <Table />
                </div>
            </div>
        </div>


    );
};

export default Adminpage;
