const NavBar = () => {
    return (
        <div className="bg-[#34495e]/60 h-16 flex flex-row w-full px-16 justify-between items-center">
            <img src="./logoHack.png" alt="Logo" className="max-h-28 max-w-28" />
            
            <div className="flex items-center space-x-4">
                <h1 className="font-walter text-[#2D2D2D] font-bold">
                    <a href="/login" className="hover:underline">Login</a>
                </h1>
                <h1 className="font-walter text-[#2D2D2D] font-bold">
                    <a href="/review" className="hover:underline">Add Review</a>
                </h1>
            </div>
        </div>
    );
}

export default NavBar;