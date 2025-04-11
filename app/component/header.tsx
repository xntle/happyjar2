import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, MoreVertical, ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const Header = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            {/* Back Arrow */}
            <TouchableOpacity onPress={() => router.push("/home")}>
                <ChevronLeft size={24} color="black" />
            </TouchableOpacity>

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
});

export default Header;
