import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export const useUpdateUserProfile = () => {
  const { user, setAuth } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (updates) => {
    if (!user?.id) {
      setError("No user logged in.");
      return { success: false, error: "No user" };
    }

    try {
      setUpdating(true);
      setError(null); // Update Supabase user_metadata

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          name: updates.name,
          bio: updates.bio,
          profileImage: updates.profileImage,
          title: updates.title,
          city: updates.city,
          country: updates.country,
          education: updates.education,
          interests: updates.interests,
          company: updates.company,
          department: updates.department,
        },
      });

      if (updateError) {
        console.error("❌ Supabase updateUser error:", updateError.message);
        setError(updateError.message);
        return { success: false, error: updateError.message };
      } // Optional: Update in your own user table (if using RLS/profiles)

      const { error } = await supabase
        .from("users")
        .update({
          name: updates.name,
          bio: updates.bio,
          profileImage: updates.profileImage,
          title: updates.title,
          city: updates.city,
          country: updates.country,
          education: updates.education,
          interests: updates.interests,
          company: updates.company,
          department: updates.department,
        })
        .eq("id", user.id);

      const updatedUser = { ...user, ...updates };
      setAuth(updatedUser);

      return { success: true };
    } catch (err) {
      console.error("⚠️ Unexpected error:", err.message);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setUpdating(false);
    }
  };

  return { updateUser, updating, error };
};
