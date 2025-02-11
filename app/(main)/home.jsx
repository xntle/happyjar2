import React from "react";
import {
  StatusBar,
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Avatar from "../../components/Avatar";
import { getUserImageSrc } from "../../services/imageService";
import Header from "../component/header"; 

const Home = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter(); // Initialize router

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Sign Out", "Error signing out!");
    } else {
      setAuth(null);
      router.replace("login");
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />

      {/* ✅ Added Header at the Top */}
      <Header title="Home" />

      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.mailTitle}>HappyJar</Text>
          <Text style={styles.description}>
            Make someone's day. Tell them about what they did that brought you joy.
          </Text>
        </View>

        <View style={styles.messageBox} />

        <Button title="Swipe to get started" onPress={() => router.push("signUp")} />
        <Button title="Logout" onPress={onLogout} />
        <Button title="Go to Profile" onPress={() => router.push("profile")} />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: wp(4),
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: hp(5),
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: "#f0f0f5",
  },
  mailTitle: {
    fontSize: wp(6),
    fontWeight: "bold",
    marginTop: hp(2),
  },
  description: {
    fontSize: wp(4),
    color: "gray",
    textAlign: "center",
    marginVertical: hp(1),
  },
  messageBox: {
    width: "90%",
    height: hp(20),
    backgroundColor: "#f8f8f8",
    borderRadius: wp(2),
    marginVertical: hp(3),
  },
  swipeContainer: {
    width: "80%",
    height: hp(6),
    backgroundColor: "#f0f0f5",
    borderRadius: hp(3),
    alignItems: "center",
    justifyContent: "center",
  },
  swipeText: {
    fontSize: wp(4),
    color: "gray",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
