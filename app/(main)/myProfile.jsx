// padding: 16
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import Header from "../component/header";
import { useAuth } from "../../context/AuthContext";
import { getUserData } from "../../services/userService";
import { Heart, Camera, Mail } from "lucide-react-native";
import { useFetchUserProfile } from "../hooks/fetchUser";

const MyProfile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { loading } = useFetchUserProfile();

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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
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
              source={
                { uri: user?.profileImage } ||
                require("../../assets/images/default.jpg")
              }
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

export default MyProfile;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  coverImage: {
    width: "120%",
    height: 200,
    resizeMode: "cover",
  },
  headerContainer: {
    padding: 20,
    alignItems: "center",
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
    paddingHorizontal: 16,
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
    gap: 4,
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
    marginLeft: 16,
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
});
