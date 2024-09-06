import { useEffect, useState } from 'react';
import {fetchUserProfile} from "@/api";
import {useAuth} from "@/context/AuthContext";

const ProfileCard = () => {
    const { authToken } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetchUserProfile(authToken);
                setProfile(response.data);
            } catch (err) {
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        if (authToken) {
            getProfile();
        }
    }, [authToken]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>City: {profile.city}</p>
        </div>
    );
};

export default ProfileCard;
