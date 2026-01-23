import React, { createContext, useState, useMemo, useCallback } from "react";

export const ProfileContext = createContext();

const defaultProfile = {
  name: "Chí Bảo",
  avatar: "https://i.pravatar.cc/150?img=3",
  bio: "React Native Developer",
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(defaultProfile);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
      resetProfile,
    }),
    [profile, updateProfile, resetProfile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
