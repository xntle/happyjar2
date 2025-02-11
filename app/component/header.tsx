import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Header = ({ title, showBackButton = false, mb = 10 }) => {
  const router = useRouter();

  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      <Text style={styles.title}>{title || "App"}</Text>
      <View style={styles.navContainer}>
        <NavItem screen="/home" label="Home" />
        <NavItem screen="/shoutout" label="Shoutout" />
        <NavItem screen="/feed" label="Feed" />
        <NavItem screen="/profile" label="Profile" />
      </View>
    </View>
  );
};

const NavItem = ({ screen, label }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(screen)} style={styles.navItem}>
      <Text style={styles.navText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 5,
  },
  navItem: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: "blue",
  },
});

export default Header;
