import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { hp, wp } from "../helpers/common";
import Loading from "./Loading";

const Button = ({
  buttonStyle,
  textStyle,
  title = "",
  onPress = () => {},
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        buttonStyle,
      ]}
      disabled={loading}
    >
      {loading ? (
        <Loading/>
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
      
    </TouchableOpacity>
  );
};

Button.propTypes = {
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  hasShadow: PropTypes.bool,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f0f0f5", 
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 12,
    borderRadius: 25, 
    alignItems: "center",
    justifyContent: "center",
    width: '90%', 
  },
  buttonText: {
    color: "black", 
    fontSize: wp(4),
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
