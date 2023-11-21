import { updateProfile,User } from "firebase/auth";

export const handleUpdateProfile = (auth: User, displayName: string ) => updateProfile(auth, {
  displayName: displayName
})