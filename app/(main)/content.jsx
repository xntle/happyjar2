import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import TabBar from "../component/tabBar";
import Home from "./home";
import MyProfile from "./myProfile";
import ScreenWrapper from "../../components/ScreenWrapper";

const Content = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const tabBarState = {
    index: activeIndex,
    routes: [
      { key: "home", name: "Home" },
      { key: "MidButton", name: "MidButton" },
      { key: "Profile", name: "Profile" },
    ],
  };

  const tabBarDescriptors = {
    home: { 
      options: { tabBarLabel: "Home" },
      navigation: {
        emit: () => ({ defaultPrevented: false }),
        isFocused: () => activeIndex === 0
      }
    },
    MidButton: { 
      options: { tabBarLabel: "MidButton" },
      navigation: {
        emit: () => ({ defaultPrevented: false }),
        isFocused: () => activeIndex === 1
      }
    },
    Profile: { 
      options: { tabBarLabel: "Profile" },
      navigation: {
        emit: () => ({ defaultPrevented: false }),
        isFocused: () => activeIndex === 2
      }
    },
  };

  const tabBarNavigation = {
    navigate: (routeName) => {
      switch (routeName.toLowerCase()) {
        case "home":
          setActiveIndex(0);
          break;
        case "midbutton":
          setActiveIndex(1);
          break;
        case "profile":
          setActiveIndex(2);
          break;
      }
    },
    emit: () => ({ defaultPrevented: false }),
    isFocused: () => true
  };

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
        <TabBar
          state={tabBarState}
          descriptors={tabBarDescriptors}
          navigation={tabBarNavigation}
        />
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