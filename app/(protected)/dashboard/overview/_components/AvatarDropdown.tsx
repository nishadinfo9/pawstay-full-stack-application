import { profileActions } from "../../profile/actions";
import AvatarDropdownClient from "./avatar-dropdown-client";

export default async function AvatarDropdown() {
  const profile = await profileActions();

  return <AvatarDropdownClient profile={profile} />;
}