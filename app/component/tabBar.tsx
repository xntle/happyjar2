import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // A helper function to handle tab press
  const handlePress = (routeName: string, isFocused: boolean, index: number) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        // isFocused for the current tab
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        // We can get the label from tabBarLabel or route name
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // If we want to style the center tab differently:
        const isCenterTab = route.name === 'MidButton';

        // Example icons or text placeholders
        let iconName = label as string;
        if (label === 'Home') iconName = '🏠';
        if (label === 'Shoutout') iconName = '📣';
        if (label === 'Feed') iconName = '📰';
        if (label === 'Profile') iconName = '👤';
        if (label === 'MidButton') iconName = '➕';

        // We can have a separate, bigger button for the center
        if (isCenterTab) {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handlePress(route.name, isFocused, index)}
              style={styles.midButtonContainer}
              activeOpacity={0.8}
            >
              <View style={styles.midButton}>
                <Text style={styles.midButtonIcon}>{iconName}</Text>
              </View>
            </TouchableOpacity>
          );
        }

        // Normal tab item
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => handlePress(route.name, isFocused, index)}
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <Text style={[styles.icon, isFocused && styles.iconFocused]}>
              {iconName}
            </Text>
            <Text style={[styles.label, isFocused && styles.labelFocused]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'bottom',
    justifyContent: 'center',
    height: 96,
    backgroundColor: '#888888',
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  iconFocused: {
    color: 'tomato',
  },
  label: {
    fontSize: 12,
    color: '#444',
  },
  labelFocused: {
    color: 'tomato',
  },
  // Updated middle button styles:
  midButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  midButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  midButtonIcon: {
    fontSize: 24,
    color: '#fff',
    alignSelf: 'center',
    verticalAlign: 'middle',
  },
});