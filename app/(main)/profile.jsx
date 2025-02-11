import { Button, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import Header from '../component/header'; // Import the Header component

const Profile = () => {
    const { user, setAuth } = useAuth(); // Assume `user` contains profile data
    const router = useRouter();

    return (
        <ScreenWrapper>
            {/* Header */}
            <Header title="Profile" />

            <View style={styles.container}>
                {/* Profile Image */}
                <Image 
                    source={{ uri: user?.profileImage || 'https://via.placeholder.com/150' }} 
                    style={styles.profileImage} 
                />

                {/* Name */}
                <Text style={styles.name}>{user?.name || 'John Doe'}</Text>

                {/* Bio */}
                <Text style={styles.bio}>{user?.bio || 'A short bio about yourself.'}</Text>

                {/* Phone Number */}
                <Text style={styles.info}>📞 {user?.phone || 'Not Provided'}</Text>

                {/* Address */}
                <Text style={styles.info}>🏠 {user?.address || 'No address available'}</Text>

                {/* Log Out Button */}
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={() => {
                        setAuth(null); // Clear auth context
                        router.replace('/login'); // Redirect to login page
                    }}
                >
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <Button
                title="Go to Home"
                onPress={() => router.push("/")} // Navigate to Home
            />

        </ScreenWrapper>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    bio: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 20,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
        color: '#444',
    },
    logoutButton: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ff4d4d',
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
