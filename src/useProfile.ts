import { Dispatch, useState } from "react";

export type SteamUserProfile = {
  steam_id: string;
  avatar: string;
  persona_name: string;
} | null;

export default function useProfile(): [SteamUserProfile, Dispatch<SteamUserProfile>] {
  const validateProfile = (profile: any): profile is SteamUserProfile =>
    profile !== null && "steam_id" in profile && "avatar" in profile && "persona_name" in profile;

  const getProfile = (): SteamUserProfile => {
    const profileString = sessionStorage.getItem("profile");
    if (profileString == null) return null;
    const parsed = JSON.parse(profileString);
    return validateProfile(parsed) ? parsed : null;
  };

  const [profile, setProfile] = useState(getProfile());

  const saveProfile = (userProfile: SteamUserProfile) => {
    sessionStorage.setItem("profile", JSON.stringify(userProfile));
    setProfile(userProfile);
  };

  return [profile, saveProfile];
}
