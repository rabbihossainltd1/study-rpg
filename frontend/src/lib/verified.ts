export const VERIFIED_CREATOR_UID = "cx55DilhC6ZuYXJ6sL6Haq1huLt1";
export const VERIFIED_CREATOR_EMAIL = "rabbixofficial@gmail.com";
export const VERIFIED_CREATOR_USERNAME = "rabbixofficial";

type VerifiableUser = {
  uid?: string | null;
  userId?: string | null;
  email?: string | null;
  username?: string | null;
};

export function isVerifiedUser(user?: VerifiableUser | null) {
  if (!user) return false;
  const uid = String(user.uid || user.userId || "").trim();
  const email = String(user.email || "").trim().toLowerCase();
  const username = String(user.username || "").trim().toLowerCase().replace(/^@/, "");
  return uid === VERIFIED_CREATOR_UID || email === VERIFIED_CREATOR_EMAIL || username === VERIFIED_CREATOR_USERNAME;
}
