import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface FloatingActionButtonProps {
  onPress: () => void;
  size?: number;
  icon?: React.ReactNode;
  style?: any;
  backgroundColor?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  size = 64,
  icon,
  style,
  backgroundColor = '#000'
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
        style,
      ]}
    >
      {icon}
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
});