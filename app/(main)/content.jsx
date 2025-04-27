import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Home from "./home";
import MyProfile from "./myProfile";
import ScreenWrapper from "../../components/ScreenWrapper";

const Content = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <Home />;
      case 1:
        // Add MidButton content here
        return null;
      case 2:
        return <MyProfile />;
      default:
        return <Home />;
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {renderContent()}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Content;