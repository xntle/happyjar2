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
    const { user, setAuth } = useAuth();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        setLoading(true);
  
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
  
        if (error || !session?.user) {
          console.error('Error fetching session:', error);
          setLoading(false);
          return;
        }
  
        // Basic session user details
        const sessionUser = session.user;
        const sessionData = {
          id: sessionUser.id,
          name: sessionUser?.user_metadata?.name || 'Anonymous',
          bio: sessionUser?.user_metadata?.bio || 'No bio available',
          profileImage:
            sessionUser?.user_metadata?.profileImage ||
            'https://via.placeholder.com/150',
          title: sessionUser?.user_metadata?.title || 'No title available',
          email: sessionUser.email,
        };
  
        // Store in auth context
        setAuth(sessionData);
  
        // Optionally fetch more from Supabase
        const { success, data } = await getUserData(sessionUser.id);
        if (success) {
          const updatedUserData = {
            ...sessionData,
            name: data.name || sessionData.name,
            bio: data.bio || sessionData.bio,
            profileImage: data.profileImage || sessionData.profileImage,
            title: data.title || sessionData.title,
          };
          setAuth(updatedUserData);
        }
  
        setLoading(false);
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

          <Header />
  
          {/* Header / Profile Info */}
          <View style={styles.headerContainer}>
            {/* Profile Image */}
            <Image
              source={{ uri: user?.profileImage }}
              style={styles.profileImage}
            />
  
            {/* Name & Title */}
            <Text style={styles.nameText}>
              {user?.name || 'Anonymous'}
            </Text>
            <Text style={styles.jobText}>
              {user?.title || 'No title available'}
            </Text>
            {/* Hard-coded location (update as needed) */}
            <Text style={styles.locationText}>New York, United States</Text>
  
            {/* Bio / Description */}
            <Text style={styles.locationText}>
              {user?.bio ||
                'Sapien nisl fermentum eget in ipsum duis lorem. Nec varius tempor quam.'}
            </Text>
  
  
            <View style={styles.largeStatsRow}>
              <View style={styles.largeStatItem}>
                <Text style={styles.largeStatNumber}>60K</Text>
              </View>
              <View style={styles.largeStatItem}>
                <Text style={styles.largeStatNumber}>60K</Text>
              </View>
              <View style={styles.largeStatItem}>
                <Text style={styles.largeStatNumber}>60K</Text>
              </View>
            </View>

                {/* Small Stats Row */}
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                <Text style={styles.statLabel}>14 Mutuals</Text>
                </View>
                <View style={styles.statItem}>
                <Text style={styles.statLabel}>2 Projects</Text>
                </View>
                <View style={styles.statItem}>
                <Text style={styles.statLabel}> 10 Interests</Text>
            </View>
          </View>

          </View>
  
          <Text style={styles.sectionTitle}>Memories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Replace these placeholders with real images or dynamic data */}
            <View style={styles.memoryItem}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100x100' }}
                style={styles.memoryImage}
              />
            </View>
            <View style={styles.memoryItem}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100x100' }}
                style={styles.memoryImage}
              />
            </View>
            <View style={styles.memoryItem}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100x100' }}
                style={styles.memoryImage}
              />
            </View>
            <View style={styles.memoryItem}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100x100' }}
                style={styles.memoryImage}
              />
            </View>
          </ScrollView>
  
        
        
        <Text style={styles.sectionTitle}>Highlights</Text>
        
  
          {/* Brand Value Section */}
          <View style={styles.brandValueCard}>
            <Text style={styles.brandValueText}>
              Lorem ipsum dolor sit amet consectetur. A tristique habitant in
              posuere. Turpis nunc ullamcorper lacus turpis nunc facilisis mollis
              aliquam.
            </Text>
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
  
          {/* Example navigation (optional) */}
          <Button title="Go to Home" onPress={() => router.push('/')} />
        </ScrollView>
      </ScreenWrapper>
    );
  };
  
  export default Profile;
  
  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    headerContainer: {
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#F8F8F8',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    nameText: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 5,
      color: '#111827',
    },
    jobText: {
      fontSize: 16,
      color: '#666666',
      marginTop: 2,
    },
    locationText: {
      fontSize: 14,
      color: '#999999',
      marginTop: 2,
    },
    descriptionText: {
      fontSize: 14,
      color: '#333333',
      textAlign: 'center',
      marginVertical: 10,
      paddingHorizontal: 20,
    },
    statsRow: {
      flexDirection: 'row',
      marginTop: 10,
    },
    statItem: {
      alignItems: 'center',
      marginHorizontal: 15,
    },
    statNumber: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: 12,
      color: '#666666',
    },
    largeStatsRow: {
      flexDirection: 'row',
      marginTop: 10,
    },
    largeStatItem: {
      alignItems: 'center',
      marginHorizontal: 15,
    },
    largeStatNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 20,
      marginLeft: 20,
      color: '#111827',
    },
    memoryItem: {
      width: 100,
      height: 100,
      margin: 10,
      borderRadius: 8,
      overflow: 'hidden',
    },
    memoryImage: {
      width: '100%',
      height: '100%',
    },
    highlightsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
    },
    highlightYear: {
      fontSize: 16,
      color: '#666666',
      marginLeft: 10,
    },
    brandValueCard: {
      backgroundColor: '#EFEFEF',
      margin: 20,
      padding: 15,
      borderRadius: 10,
    },
    brandValueText: {
      fontSize: 14,
      color: '#333333',
      lineHeight: 20,
    },
    logoutButton: {
      marginTop: 20,
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
  });