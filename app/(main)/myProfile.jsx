import { Button, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Pressable } from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import Header from "../component/header";
import { useAuth } from "../../context/AuthContext";
import { getUserData } from "../../services/userService";
import { Heart, Camera, Mail} from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function MyProfile() {
  const router = useRouter();
  const { user, setAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        console.error("Error fetching session:", error);
        setLoading(false);
        return;
      }

      // Basic session user details
      const sessionUser = session.user;
      const sessionData = {
        id: sessionUser.id,
        name: sessionUser?.user_metadata?.name || "Anonymous",
        bio: sessionUser?.user_metadata?.bio || "No bio available",
        profileImage:
          sessionUser?.user_metadata?.profileImage ||
          "https://via.placeholder.com/150",
        title: sessionUser?.user_metadata?.title || "No title available",
        email: sessionUser?.user_metadata?.email || "n/a",
        city: sessionUser?.user_metadata?.city || "n/a",
        country: sessionUser?.user_metadata?.country || "n/a",
        totalLikes: sessionUser?.user_metadata?.totalLikes || "0",
        totalPraise: sessionUser?.user_metadata?.totalPraise || "0",
        totalNotes: sessionUser?.user_metadata?.totalNotes || "0",
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
          city: data.city || sessionData.city,
          country: data.country || sessionData.country,
          totalLikes: data.totalLikes || sessionData.totalLikes,
          totalPraises: data.totalPraise || sessionData.totalPraise,
          totalNotes: data.totalNotes || sessionData.totalNotes,
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
          <Header />
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
            <View style={styles.headerContainer}>
              {/* Profile Image */}
              <View style={styles.coverImage}>
              <Image
                source={require("../../assets/images/default.jpg")} // Use your actual local path
                style={styles.coverImage}
              />
              </View>

              {/* Profile Image - on top of cover */}
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: user?.profileImage } || require("../../assets/images/default.jpg")}
                  style={styles.profileImage}
                />
                {/* You can add logos like Google as overlays here if needed */}
              </View>

              {/* Name & Title */}
              <Text style={styles.nameText}>{user?.name || "Anonymous"}</Text>
              <Text style={styles.jobText}>
                {user?.title || "No title available"}
              </Text>
              {/* Hard-coded location (update as needed) */}
              <Text style={styles.locationText}>New York, United States</Text>

              {/* Bio / Description */}
              <Text style={styles.descriptionText}>
                {user?.bio ||
                  "Sapien nisl fermentum eget in ipsum duis lorem. Nec varius tempor quam."}
              </Text>

              <View style={styles.largeStatsRow}>
                <View style={styles.largeStatItem}>
                  <Heart size={16} color="#303030" style={styles.iconSpacing} />
                  <Text style={styles.largeStatNumber}>{user?.totalLikes}</Text>
                </View>

                <View style={styles.largeStatItem}>
                  <Camera size={16} color="#303030" style={styles.iconSpacing} />
                  <Text style={styles.largeStatNumber}>{user?.totalPraise}</Text>
                </View>

                <View style={styles.largeStatItem}>
                  <Mail size={16} color="#303030" style={styles.iconSpacing} />
                  <Text style={styles.largeStatNumber}>{user?.totalNotes}</Text>
                </View>
              </View>

            </View>
            
          </ScrollView>
        </ScreenWrapper>
  );
};



const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  coverImage:{
    width: "120%",
    height: 200,
    resizeMode: "cover",
  },
  headerContainer: {
    padding: 20,
    alignItems: "center"
  },
  profileImage: {
    width: 215,
    height: 215,
    borderRadius: 150,
    marginBottom: 10,
  },
  avatarWrapper: {
    position: "absolute",
    top: 107, 
    alignSelf: "center",
    zIndex: 10, 
  },
  nameText: {
    fontSize: 24,
    marginTop: 116,
    marginBottom: 8,
    color: "#111827",
  },
  jobText: {
    fontSize: 14,
    color: "#111927",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666666",
  },
  largeStatsRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  largeStatItem: {
    flexDirection: "row",
    gap:4,
    alignItems: "center",
    marginHorizontal: 15,
  },
  largeStatNumber: {
    fontSize: 12,
    color: "#85858B",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginLeft: 20,
    color: "#111827",
  },
  memoryItem: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  memoryImage: {
    width: "100%",
    height: "100%",
  },
  highlightsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10,
  },
  highlightYear: {
    fontSize: 16,
    color: "#666666",
    marginLeft: 10,
  },
  brandValueCard: {
    backgroundColor: "#EFEFEF",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  brandValueText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    alignSelf: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundText: {
    fontSize: 16,
    color: '#999',
  },
  // Profile UI
  profileContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  coverImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  avatarWrapper: {
    marginTop: -50,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  bio: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  unlockButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 10,
  },
  unlockButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  // Next Drop UI
  nextDropContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropSubtext: {
    fontSize: 13,
    color: '#777',
    marginBottom: 20,
  },
  openButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  openButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#999',
    fontSize: 14,
  },
});
