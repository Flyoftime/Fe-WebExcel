import React from 'react'
import SideBarAdmin from '@/components/Admin/SideBarAdmin';
import Widget from '@/components/Admin/Widget';
import Featured from '@/components/Admin/Featured';
import Chart from '@/components/Admin/Chart';
import Table from '@/components/Admin/Table';
import Products from '@/components/Admin/Products';

const DashboardAdmin = () => {
  return (
    <div className="flex bg-white">
      <SideBarAdmin />
      <div className="flex-6">
        <div className="flex p-5 gap-5">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="flex p-1 gap-5">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="shadow-md p-5 m-5">
          <div className="font-medium text-gray-500 mb-4">Latest Transactions</div>
          <Products />
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin