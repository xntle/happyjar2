import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

interface FloatingActionButtonProps {
  onPress: () => void;
  size?: number;
  icon?: React.ReactNode;
  style?: any;
  backgroundColor?: string;
  badgeCount?: number; 
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  size = 64,
  icon,
  style,
  backgroundColor = '#000',
  badgeCount,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { width: size, height: size, borderRadius: size / 2, backgroundColor }, style]}>

      {icon}
      {badgeCount && badgeCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.45, 
    borderColor: '#D2D6DB',
    elevation: 5,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,       // tweak these to position the badge where you want
    right: 0,     // e.g., top-right corner
    backgroundColor: '#0D121C',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});