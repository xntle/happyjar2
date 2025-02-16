

import { Button, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import Header from '../component/header';
import { useAuth } from '../../context/AuthContext';
import { getUserData } from '../../services/userService';

const Profile = () => {
     const router = useRouter();
    const { user, setAuth } = useAuth(); // Get user and setAuth from context
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);

            // Get session user
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error || !session?.user) {
                console.error("Error fetching session:", error);
                setLoading(false);
                return;
            }

            // Get user details from session metadata
            const sessionUser = session.user;
            const sessionData = {
                id: sessionUser.id,
                name: sessionUser?.user_metadata?.name || "Anonymous",
                bio: sessionUser?.user_metadata?.bio || "No bio available",
                profileImage: sessionUser?.user_metadata?.profileImage || "https://via.placeholder.com/150",
                title: sessionUser?.user_metadata?.title || "No title available",
                email: sessionUser.email,
            };

            console.log("Session user:", sessionUser);

            // If session has all required data, store in auth context
            setAuth(sessionData);
            setLoading(false);

            // Fetch from Supabase if additional details are needed
            const { success, data } = await getUserData(sessionUser.id);
            if (success) {
                const updatedUserData = {
                    ...sessionData,
                    name: data.name || sessionData.name,
                    bio: data.bio || sessionData.bio,
                    profileImage: data.profileImage || sessionData.profileImage,
                    title: data.title || sessionData.title,
                };
                setAuth(updatedUserData); // Update user in context
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (
        <ScreenWrapper>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Header></Header>
                {/* Year Section */}
                {/* <View style={styles.yearContainer}>
                    <Text style={styles.yearText}>2025</Text> */}
                    {/* Floating Abstract Shapes */}
                    {/* <View style={[styles.shape, styles.shapeOne]} />
                    <View style={[styles.shape, styles.shapeTwo]} />
                    <View style={[styles.shape, styles.shapeThree]} />
                </View> */}

                {/* Profile Section */}
                <View style={styles.profileContainer}>
                    {/* Profile Image */}
                    <Image 
                        source={{ uri: user?.profileImage || 'https://via.placeholder.com/150' }} 
                        style={styles.profileImage} 
                    />
                    
                    {/* Profile Details */}
                    <View>
                        <Text style={styles.name}>{user?.name || 'Anonymous'}</Text>
                        <Text style={styles.title}>{user?.title || 'N/A'}</Text>
                    </View>
                </View>

                {/* Badges */}
                <View style={styles.badgesContainer}>
                    <Text style={styles.badge}>Community Leader</Text>
                    <Text style={styles.badge}>Employee of the Month</Text>
                </View>

                {/* Year Selection */}
                <View style={styles.yearSelector}>
                    <Text style={styles.yearText}>2024 ▼</Text>
                </View>

                {/* Recognition Post */}
                <View style={styles.recognitionCard}>
                    <Text style={styles.timeAgo}>1 month ago</Text>
                    <Text style={styles.recognitionText}>
                        Recognition is given shortly after you do something good
                    </Text>
                    <View style={styles.recognitionUser}>
                        <View style={styles.avatarPlaceholder} />
                        <View>
                            <Text style={styles.recognitionName}>John Doe</Text>
                            <Text style={styles.recognitionPosition}>Position, Company</Text>
                        </View>
                    </View>
                </View>

                {/* Team Recognitions */}
                <View style={styles.teamRecognitionCard}>
                    <View style={styles.avatarPlaceholder} />
                    <View>
                        <Text style={styles.teamName}>Product Team</Text>
                        <Text style={styles.teamStats}>14 Badges • 111 Recognitions</Text>
                    </View>
                </View>

                <View style={styles.teamRecognitionCard}>
                    <View style={styles.avatarPlaceholder} />
                    <View>
                        <Text style={styles.teamName}>Product Team</Text>
                        <Text style={styles.teamStats}>14 Badges • 111 Recognitions</Text>
                    </View>
                </View>

                {/* Connection Count */}
                <View style={styles.connectionsCard}>
                    <Text style={styles.connectionsText}>120 Connections</Text>
                </View>

                {/* Contact Information */}
                <View style={styles.contactContainer}>
                    <Text style={styles.contactLabel}>Email</Text>
                    <Text style={styles.contactText}>adalovelace@company.com</Text>

                    <Text style={styles.contactLabel}>Phone</Text>
                    <Text style={styles.contactText}>+1 (510) 736-6447</Text>

                    <Text style={styles.contactLabel}>Birthday</Text>
                    <Text style={styles.contactText}>May 4, 2000</Text>

                    <Text style={styles.contactLabel}>Relations</Text>
                    <Text style={styles.contactText}>
                        Inner Circle, Team member, Collaborator, Co-worker, Manager
                    </Text>

                    <Text style={styles.contactLabel}>Joined</Text>
                    <Text style={styles.contactText}>Oct 2024</Text>

                    <Text style={styles.contactLabel}>Social</Text>
                    <Text style={styles.contactText}>@adalovelace</Text>
                    <Text style={styles.contactText}>@adalovelace</Text>
                </View>

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

                {/* Navigation */}
                <Button
                    title="Go to Home"
                    onPress={() => router.push("/")} // Navigate to Home
                />
            </ScrollView>
        </ScreenWrapper>
    );
};

export default Profile;

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 30,
        backgroundColor: '#fff',

    },
    yearSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },
    yearText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    recognitionCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    timeAgo: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
    },
    recognitionText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
    },
    recognitionUser: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ddd',
        marginRight: 12,
    },
    recognitionName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
    recognitionPosition: {
        fontSize: 12,
        color: '#6b7280',
    },
    teamRecognitionCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    teamName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
    teamStats: {
        fontSize: 12,
        color: '#6b7280',
    },
    connectionsCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 10,
    },
    connectionsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    contactContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contactLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    contactText: {
        fontSize: 14,
        color: '#6b7280',
    },
    logoutButton: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ff4d4d',
        borderRadius: 8,
        alignSelf: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    yearContainer: {
        backgroundColor: "#F2F2F7",
        borderRadius: 40,
        padding: 20,
        height: 300,
        justifyContent: "flex-start",
        position: "relative",
        marginBottom: 0,
        marginTop: 20,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '',
    
    },
    yearText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    shape: {
        position: "absolute",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    shapeOne: { width: 30, height: 30, top: 40, left: 20 },
    shapeTwo: { width: 50, height: 50, top: 10, right: 30 },
    shapeThree: { width: 40, height: 40, bottom: 20, right: 10 },
    profileContainer: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    title: {
        fontSize: 14,
        color: '#6b7280',
    },
    badgesContainer: {
        flexDirection: "row",
        padding: 16,
        marginTop: 10,
    },
    badge: {
        backgroundColor: "#e5e7eb",
        color: "#374151",
        fontSize: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginRight: 8,
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


