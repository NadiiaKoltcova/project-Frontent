'use client'

import Link from 'next/link';
import {useAuth} from "@/context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            <Link href="/">Home</Link>
            {user ? (
                <>
                    <Link href="/profile">Profile</Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link href="/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;
