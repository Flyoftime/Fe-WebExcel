import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'; 

const Footer = () => {
    return (
        <footer className="text-white bg-gray-800 py-4">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-4">
                <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
                    {/* Left section - Contact Us */}
                    <div className="flex flex-col space-y-2 md:w-1/2">
                        <h2 className="text-xl font-semibold font-Montserrat">Contact Us</h2>
                        <div className="flex items-center space-x-2">
                            <FiMapPin className="text-gray-400" />
                            <p className="text-sm">Bandung, Jawa Barat</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FiPhone className="text-gray-400" />
                            <p className="text-sm">+62 8810 2357 9090</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FiMail className="text-gray-400" />
                            <p className="text-sm">mirsabanwar@gmail.com</p>
                        </div>
                    </div>

                    {/* Right section - About */}
                    <div className="flex flex-col space-y-2 md:w-1/2">
                        <h2 className="text-xl font-semibold font-Montserrat">About</h2>
                        <p className="text-sm text-gray-400">
                            Platform interaktif untuk jual beli file Excel berkualitas tinggi, membantu pengguna menghemat waktu dan meningkatkan produktivitas.
                        </p>
                    </div>
                </div>
                <div className="mt-4 text-center text-gray-400 text-xs">
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
