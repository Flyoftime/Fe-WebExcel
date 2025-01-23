import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

import { redirect } from 'next/navigation';

import DashboardAdmin from '@/components/Admin/DashboardAdmin';

const AdminPage = async () => {

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/login');
    }

    return (
        <div>
            <DashboardAdmin />
        </div>
    );
};

export default AdminPage;
