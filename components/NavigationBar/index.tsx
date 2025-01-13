// import React, {ChangeEvent} from "react";
// import Link from "next/link";
// import Image from "next/image";

// interface InputProps {
//     className?: string,
//     links: { label: string; href: string }[]; // Array of navigation linkst
//     title?: string; // Title for the navigation bar
// }

// const NavigationBar: React.FC<InputProps> = ({links, title, className}) => {

//     return (
//         <nav className={`flex items-center justify-between p-4 bg-nav-color text-white !shadow-2xl ${className}`}>
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//                 <Image 
//                     src="/scriptorium_logo.jpeg" // Path to the logo in the public folder
//                     alt="Logo"
//                     width={40} // Adjust the width as needed
//                     height={40} // Adjust the height as needed
//                     className="object-contain rounded-3xl"
//                 /> {/* Close Image tag here */}
//                 {title && <h1 className="text-xl font-bold">{title}</h1>} 
//             </div>

//             {/* Navigation Links */}
//             <div className="flex space-x-4">
//                 {links.map((link, index) => (
//                 <Link key={index} href={link.href} className="hover:text-gray-300 font-semibold transition-colors duration-200">
//                     {link.label}
//                 </Link>
//                 ))}
//             </div>
//         </nav>

//     )

// }

// export default NavigationBar;
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface InputProps {
    className?: string;
    links: { label: string; href: string }[]; // Array of navigation links
    title?: string; // Title for the navigation bar
}

const NavigationBar: React.FC<InputProps> = ({ links, title, className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    // Close the menu on route change
    useEffect(() => {
        const handleRouteChange = () => setIsMenuOpen(false);
        router.events.on("routeChangeStart", handleRouteChange);

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [router]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`flex items-center justify-between p-4 bg-nav-color text-white shadow-2xl !z-20 ${className}`}>
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
                <Image
                    src="/scriptorium_logo.jpeg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain rounded-3xl"
                />
                {title && <h1 className="text-xl font-bold">{title}</h1>}
            </div>

            {/* Hamburger Menu Button */}
            <button
                className="block md:hidden focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

            </button>

            {/* Navigation Links */}
            <div
                className={`${
                    isMenuOpen ? "block" : "hidden"
                } md:flex flex-col md:flex-row md:space-x-4 absolute md:static bg-nav-color top-16 left-0 w-full md:w-auto p-4 md:p-0`}
            >
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="block md:inline-block hover:text-gray-300 font-semibold transition-colors duration-200 p-2 md:p-0"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavigationBar;
