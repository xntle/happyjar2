import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";
import TabBar from "./component/tabBar";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session user:", session?.user);
      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace("/content", { animation: "none" });
      } else {
        setAuth(null);
        router.replace("/welcome", { animation: "none" });
      }
    });
  }, []);

  const updateUserData = async (user) => {
    let res = getUserData(user?.id);
    if (res.success) {
      setUserData(res.data);
    }
  };

  // Keep track of the current tab
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  // Setup mock tab navigation state for the TabBar
  const tabBarState = {
    index: activeTabIndex,
    routes: [
      { key: "home", name: "Home" },
      { key: "MidButton", name: "MidButton" },
      { key: "Profile", name: "Profile" },
    ],
  };

  // Setup mock descriptors for the TabBar
  const tabBarDescriptors = {
    home: {
      options: { tabBarLabel: "Home" },
      navigation: {
        emit: () => ({ defaultPrevented: false }),
        isFocused: () => activeTabIndex === 0,
      },
    },
    MidButton: {
      options: { tabBarLabel: "MidButton" },
      navigation: {
        emit: () => ({ defaultPrevented: false }),
        isFocused: () => activeTabIndex === 1,
      },
    },
    Profile: {
      options: { tabBarLabel: "Profile" },
      navigation: {
        emit: () => ({ defaultPrevented: false }),
        isFocused: () => activeTabIndex === 2,
      },
    },
  };

  // Setup mock navigation for the TabBar
  const tabBarNavigation = {
    navigate: (routeName) => {
      switch (routeName.toLowerCase()) {
        case "home":
          setActiveTabIndex(0);
          router.push("/home");
          break;
        case "midbutton":
          setActiveTabIndex(1);
          router.push("/newPost");
          break;
        case "profile":
          setActiveTabIndex(2);
          router.push("/Profile");
          break;
      }
    },
    emit: ({ type, target, canPreventDefault }) => {
      return { defaultPrevented: false };
    },
    isFocused: () => true,
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <TabBar
          state={tabBarState}
          descriptors={tabBarDescriptors}
          navigation={tabBarNavigation}
        />
      </View>
    </View>
  );
};

export default _layout;
