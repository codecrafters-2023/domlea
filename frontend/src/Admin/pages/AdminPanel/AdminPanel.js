import AdminSidebar from '../../components/Navbar';
import './index.css'

const AdminPanel = () => {


    return (
        <div className='admin-container'>
            <div>
                <AdminSidebar />
            </div>
            <div>
                {/* <!-- Main Content --> */}
                <div>
                    <main class="main-content">
                        <h1 className='text-5xl font-bold'>Dashboard</h1>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;