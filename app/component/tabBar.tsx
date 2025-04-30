import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';

// Define our own props instead of depending on @react-navigation/bottom-tabs
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

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  
  // Hide tab bar on login, signup, and welcome screens
  const hideTabBarScreens = ['/login', '/signUp', '/welcome'];
  
  // Check if current pathname should hide the tab bar
  if (hideTabBarScreens.includes(pathname as string)) {
    return null;
  }

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
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom } as ViewStyle]}>
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
              style={styles.midButtonContainer as StyleProp<ViewStyle>}
              activeOpacity={0.8}
            >
              <View style={styles.midButton as StyleProp<ViewStyle>}>
                <Text style={styles.midButtonIcon as StyleProp<TextStyle>}>{iconName}</Text>
              </View>
            </TouchableOpacity>
          );
        }

        // Normal tab item
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => handlePress(route.name, isFocused, index)}
            style={styles.tabItem as StyleProp<ViewStyle>}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.icon as StyleProp<TextStyle>, 
              isFocused && (styles.iconFocused as StyleProp<TextStyle>)
            ]}>
              {iconName}
            </Text>
            <Text style={[
              styles.label as StyleProp<TextStyle>, 
              isFocused && (styles.labelFocused as StyleProp<TextStyle>)
            ]}>
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
    alignItems: 'flex-end',
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