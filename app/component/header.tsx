import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, MoreVertical, ChevronLeft } from "lucide-react-native";
import { useRouter, useNavigation } from "expo-router";

const Header = () => {
    const router = useRouter();
    const navigation = useNavigation();
    
    // Check if we can go back (if there's history)
    const canGoBack = navigation.canGoBack();
    
    return (
        <View style={styles.container}>
            {/* Back Arrow - only show when we can go back */}
            {canGoBack ? (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color="black" />
                </TouchableOpacity>
            ) : (
                <View style={styles.emptySpace} />
            )}

            {/* Right-side Icons */}
            <View style={styles.rightIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Bell size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <MoreVertical size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    rightIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        marginLeft: 20,
    },
    emptySpace: {
        width: 24, // Same width as the icon for consistent layout
    },
});

export default Header;
