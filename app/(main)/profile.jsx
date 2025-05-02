import React from "react";
import { Dimensions, StyleSheet, View, Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  Gesture,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import MyProfile from "./myProfile";
import JarHeader from "../component/jarHeader";
import FloatingActionButton from "../component/floatingActionButton.tsx";
import { DiceFive, Jar } from "phosphor-react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_HEIGHT = 700; // Adjust as needed

export default function Profile() {
  const translateY = useSharedValue(-SHEET_HEIGHT);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      let newValue = context.startY + event.translationY;
      if (newValue > 0) {
        newValue = 0;
      }
      translateY.value = newValue;
    },
    onEnd: (event) => {
      if (event.translationY < -50 || event.velocityY < -500) {
        // If swiped upward enough, dismiss the sheet
        translateY.value = withTiming(-SHEET_HEIGHT + 200, { duration: 300 });
      } else {
        // Otherwise, snap back to open state
        translateY.value = withTiming(0, { duration: 300 });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const openSheet = () => {
    translateY.value = withTiming(0, { duration: 300 });
  };

  const closeSheet = () => {
    translateY.value = withTiming(-SHEET_HEIGHT, { duration: 300 });
  };

  return (
    <GestureHandlerRootView>
      <Pressable onPress={openSheet} style={styles.openButton}>
        <Text style={styles.openButtonText}>Open Top Sheet</Text>
      </Pressable>
      <JarHeader />
      <FloatingActionButton
        onPress={() => console.log("Dice pressed")}
        size={64}
        icon={
          <DiceFive
            size={32}
            color="#5A5A5A"
            style={{ transform: [{ rotate: "22.5deg" }] }}
          />
        }
        backgroundColor="#fff"
        style={styles.bottomLeftButton}
      />

      {/* Bottom-Right Round Button */}
      <FloatingActionButton
        onPress={() => console.log("Calendar pressed")}
        size={64}
        icon={<Jar size={32} color="#5A5A5A" />}
        backgroundColor="#fff"
        style={styles.bottomRightButton}
        badgeCount={4}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.topSheet, animatedStyle]}>
          {/* <Pressable onPress={closeSheet} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable> */}
          {/* Your top sheet content */}
          <MyProfile />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  topSheet: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: "white",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    overflow: "hidden",
  },
  openButton: {
    marginTop: 50,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  openButtonText: {
    color: "#fff",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  closeButtonText: {
    color: "red",
  },
  bottomLeftButton: {
    position: "absolute",
    bottom: 110,
    left: 16,
  },
  bottomRightButton: {
    position: "absolute",
    bottom: 110,
    right: 16,
  },
});
