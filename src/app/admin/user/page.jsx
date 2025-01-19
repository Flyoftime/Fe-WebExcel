import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SideBarAdmin from '@/components/Admin/SideBarAdmin';
import Widget from '@/components/Admin/Widget';

import { redirect } from 'next/navigation';
import TableUser from '@/components/Admin/TableUser';

const USerPage = async () => {

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/login');
    }

    return (
        <div className="flex bg-white">
            <SideBarAdmin />
            <div className="flex-6">
                <div className="flex p-5 gap-5">
                    <Widget type="user" />
                </div>
                <div className="shadow-md p-5 m-5">
                    <div className="font-medium text-gray-500 mb-4">Latest Transactions</div>
                    <TableUser/>
                </div>
            </div>
        </div>
    );
};

export default USerPage;
