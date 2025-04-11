
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { getUserData } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

export const useFetchUserProfile = () => {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        console.log("🔍 Getting session from Supabase...");

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session?.user) {
          console.error("🚨 Error fetching session or no user:", error);
          setLoading(false);
          return;
        }

        const sessionUser = session.user;
        console.log("✅ Session user:", sessionUser);

        const sessionData = {
          id: sessionUser.id,
          name: sessionUser.user_metadata?.name || "Anonymous",
          bio: sessionUser.user_metadata?.bio || "No bio available",
          profileImage:
            sessionUser.user_metadata?.profileImage ||
            "https://via.placeholder.com/150",
          title: sessionUser.user_metadata?.title || "No title available",
          email: sessionUser.email || "n/a",
          city: sessionUser.user_metadata?.city || "n/a",
          country: sessionUser.user_metadata?.country || "n/a",
          totalLikes: sessionUser.user_metadata?.totalLikes || "0",
          totalPraise: sessionUser.user_metadata?.totalPraise || "0",
          totalNotes: sessionUser.user_metadata?.totalNotes || "0",
        };

        console.log("✨ Session data:", sessionData);
        setAuth?.(sessionData); // ✅ store basic session info in context

        const { success, data } = await getUserData(sessionUser.id);
        if (success && data) {
          const updatedUserData = {
            ...sessionData,
            name: data.name || sessionData.name,
            bio: data.bio || sessionData.bio,
            profileImage: data.profileImage || sessionData.profileImage,
            title: data.title || sessionData.title,
            city: data.city || sessionData.city,
            country: data.country || sessionData.country,
            totalLikes: data.totalLikes || sessionData.totalLikes,
            totalPraise: data.totalPraise || sessionData.totalPraise,
            totalNotes: data.totalNotes || sessionData.totalNotes,
          };

          console.log("📦 Updated data from DB:", updatedUserData);
          setAuth?.(updatedUserData);
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ Failed in fetchUserProfile:", err);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { loading };
};
