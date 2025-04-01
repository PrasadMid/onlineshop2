const Footer = ({ isModalOpen }) => {
    return (
        <footer className={`${isModalOpen ? "hidden" : "fixed bottom-0 left-0"} w-full bg-gray-900 text-white py-6 text-center z-50`}>
            <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-3">
                <a href="#" className="text-xl hover:text-blue-500">📘</a>
                <a href="#" className="text-xl hover:text-blue-400">🐦</a>
                <a href="#" className="text-xl hover:text-pink-500">📷</a>
            </div>
        </footer>
    );
  };
  
  export default Footer;
  