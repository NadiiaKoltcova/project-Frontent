import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useAuth} from "@/context/AuthContext";
import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Profile</h1>
            <ProfileCard />
        </div>
    );
}
