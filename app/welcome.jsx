import {
    Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from "react-native";
import React, { Component } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../helpers/common";
import Button from "../components/Button";
import { theme } from "../constants/theme";
import { useRouter } from "expo-router";

const Welcome = () => {
    const router = useRouter();
    return (
      <ScreenWrapper>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={require("../assets/images/happyjar.png")}
              resizeMode="contain"
            />
            <Text style={styles.mailTitle}>happyjar</Text>
            <Text style={styles.description}>
              Make someone's day. Tell them about what they did that brought you
              joy.
            </Text>
          </View>
          <View style={styles.messageBox} />
          <Button
            title="Swipe to get started"
            onPress={() => router.push('signUp')}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
                Already have an account?
            </Text>
            <Pressable onPress={() => router.push('login')}>
                <Text style={[styles.loginText, {color: theme.colors.primaryDark}]}>
                    Login
                </Text>
            </Pressable>
          </View>
        </View>
      </ScreenWrapper>
    );
}

export default Welcome;

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),

  }


});
