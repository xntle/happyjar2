import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useFetchUserProfile } from "../hooks/fetchUser";
import { useAuth } from "../../context/AuthContext";
import { useUpdateUserProfile } from "../hooks/updateUser";

const EditProfile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { loading } = useFetchUserProfile();
  const { updateUser, updating } = useUpdateUserProfile();

  const [form, setForm] = useState({
    name: "",
    pronouns: "",
    bio: "",
    company: "",
    department: "",
    role: "",
    country: "",
    city: "",
    education: "",
    interests: [],
  });

  const [bioError, setBioError] = useState(false);

  // Fill out form with current user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        pronouns: user.pronouns || "",
        bio: user.bio || "",
        company: user.company || "",
        department: user.department || "",
        role: user.title || "",
        country: user.country || "",
        city: user.city || "",
        education: user.education || "",
        interests: user.interests || [],
      });
    }
  }, [loading]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "bio" && value.length > 250) {
      setBioError(true);
    } else {
      setBioError(false);
    }
  };

  const handleSave = async () => {
    const { success, error } = await updateUser(form);

    if (success) {
      Alert.alert("Success", "Profile updated!");
      router.back();
    } else {
      Alert.alert("Error", error || "Could not update profile.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.label}>Name*</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Your name"
      />

      <Text style={styles.label}>Pronouns</Text>
      <TextInput
        style={styles.input}
        value={form.pronouns}
        onChangeText={(text) => handleChange("pronouns", text)}
        placeholder="e.g. she/her"
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, bioError && styles.errorInput]}
        value={form.bio}
        onChangeText={(text) => handleChange("bio", text)}
        placeholder="Tell us about yourself"
        multiline
      />
      <Text style={styles.charCount}>{form.bio.length}/250</Text>

      <Text style={styles.label}>Company*</Text>
      <TextInput
        style={styles.input}
        value={form.company}
        onChangeText={(text) => handleChange("company", text)}
        placeholder="Company name"
      />

      <Text style={styles.label}>Department/Team</Text>
      <TextInput
        style={styles.input}
        value={form.department}
        onChangeText={(text) => handleChange("department", text)}
        placeholder="Add tags..."
      />

      <Text style={styles.label}>Role*</Text>
      <TextInput
        style={styles.input}
        value={form.role}
        onChangeText={(text) => handleChange("role", text)}
        placeholder="e.g. Product Manager"
      />

      <Text style={styles.label}>Country/Region*</Text>
      <TextInput
        style={styles.input}
        value={form.country}
        onChangeText={(text) => handleChange("country", text)}
        placeholder="e.g. United States"
      />

      <Text style={styles.label}>City*</Text>
      <TextInput
        style={styles.input}
        value={form.city}
        onChangeText={(text) => handleChange("city", text)}
        placeholder="e.g. San Francisco"
      />

      <Text style={styles.label}>Education</Text>
      <TextInput
        style={styles.input}
        value={form.education}
        onChangeText={(text) => handleChange("education", text)}
        placeholder="e.g. University of California, Davis"
      />

      <Text style={styles.label}>Interests/Hobbies</Text>
      <TextInput
        style={styles.input}
        value={form.interests.join(", ")}
        onChangeText={(text) =>
          handleChange(
            "interests",
            text.split(",").map((item) => item.trim())
          )
        }
        placeholder="e.g. Design, Software, Marketing"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>{updating ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
  },
  errorInput: {
    borderColor: "#e53935",
  },
  charCount: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 24,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
