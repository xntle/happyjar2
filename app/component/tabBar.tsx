import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname } from "expo-router";
import { House, Plus, User, Megaphone, Newspaper } from "phosphor-react-native";

interface Route {
  key: string;
  name: string;
}

interface TabBarProps {
  state: {
    index: number;
    routes: Route[];
  };
  descriptors: {
    [key: string]: {
      options: {
        tabBarLabel?: string;
        title?: string;
      };
      navigation: {
        emit: () => { defaultPrevented: boolean };
        isFocused: () => boolean;
      };
    };
  };
  navigation: {
    navigate: (name: string) => void;
    emit: () => { defaultPrevented: boolean };
    isFocused: () => boolean;
  };
}

export default function TabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const hideTabBarScreens = ["/login", "/signUp", "/welcome"];
  if (hideTabBarScreens.includes(pathname as string)) return null;

  const handlePress = (
    routeName: string,
    isFocused: boolean,
    index: number
  ) => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View
      style={[
        styles.tabBarContainer,
        { paddingBottom: insets.bottom } as ViewStyle,
      ]}
    >
      {/* Tab items left and right of MidButton */}
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        if (route.name === "MidButton") return null;

        let IconComponent = User;
        if (label === "Home") IconComponent = House;
        else if (label === "Profile") IconComponent = User;
        else if (label === "Shoutout") IconComponent = Megaphone;
        else if (label === "Feed") IconComponent = Newspaper;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => handlePress(route.name, isFocused, index)}
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <IconComponent
              size={24}
              weight={isFocused ? "fill" : "regular"}
              color={isFocused ? "tomato" : "#444"}
            />
            <Text style={[styles.label, isFocused && styles.labelFocused]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Center floating MidButton */}
      <TouchableOpacity
        key="midButton"
        onPress={() => {
          const index = state.routes.findIndex((r) => r.name === "MidButton");
          handlePress("MidButton", state.index === index, index);
        }}
        style={styles.midButtonContainer}
        activeOpacity={0.8}
      >
        <View style={styles.midButton}>
          <Plus size={20} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    backgroundColor: "#bbbbbb",

    height: 96,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#444",
  },
  labelFocused: {
    color: "tomato",
  },
  midButtonContainer: {
    position: "absolute",
    bottom: 20, // slightly above the tab bar
    left: "50%",
    transform: [{ translateX: -32 }], // center horizontally
    zIndex: 10,
  },
  midButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
