import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { Accelerometer } from "expo-sensors";

const { width, height } = Dimensions.get("window");
const BLOCK_COUNT = 10;

const Jar = () => {
  const positions = useRef(
    Array.from({ length: BLOCK_COUNT }, () => ({
      x: new Animated.Value(Math.random() * (width - 60)),
      y: new Animated.Value(Math.random() * (height / 2)),
      currentX: Math.random() * (width - 60),
      currentY: Math.random() * (height / 2),
    }))
  ).current;

  useEffect(() => {
    Accelerometer.setUpdateInterval(50);
    const subscription = Accelerometer.addListener(({ x, y }) => {
      positions.forEach((pos) => {
        pos.currentX += x * 10;
        pos.currentY -= y * 10;

        // Optional: clamp position to stay within screen
        pos.currentX = Math.max(0, Math.min(width - 30, pos.currentX));
        pos.currentY = Math.max(0, Math.min(height - 30, pos.currentY));

        Animated.spring(pos.x, {
          toValue: pos.currentX,
          useNativeDriver: false,
        }).start();

        Animated.spring(pos.y, {
          toValue: pos.currentY,
          useNativeDriver: false,
        }).start();
      });
    });

    return () => subscription.remove();
  }, [positions]);

  return (
    <View style={styles.jar}>
      {positions.map((pos, index) => (
        <Animated.View
          key={index}
          style={[
            styles.block,
            {
              transform: [{ translateX: pos.x }, { translateY: pos.y }],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  jar: {
    flex: 1,
    backgroundColor: "#fef9ef",
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    width: 30,
    height: 30,
    backgroundColor: "#ffa500",
    borderRadius: 6,
    position: "absolute",
  },
});

export default Jar;
