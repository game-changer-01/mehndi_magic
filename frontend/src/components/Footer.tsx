import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Mehndi Management System. All rights reserved.</p>
                <p>Follow us on social media:</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                    <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                    <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;