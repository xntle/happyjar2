import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";

const Header = () => {
    return (
        <View style={styles.container}>
            {/* Logo & Title */}
            <View style={styles.leftSection}>
                <Image 
                    source={require("../../assets/images/happyjar.png")} // Update with your logo path
                    style={styles.logo}
                />
                <Text style={styles.title}>happyjar</Text>
            </View>

            {/* Icons */}
            <View style={styles.rightSection}>
                <TouchableOpacity style={styles.iconButton}>
                    <Feather name="bell" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome5 name="ellipsis-v" size={18} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 40,
        height: 50,
        marginRight: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
    },
    iconButton: {
        marginLeft: 16,
    },
});

export default Header;
