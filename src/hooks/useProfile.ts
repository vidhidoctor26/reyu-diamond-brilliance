import { useState, useEffect } from "react";
import type { UserProfile, UserStats, ProfileLoadingState } from "@/types/profile";

const MOCK_PROFILE: UserProfile = {
  id: "usr_001",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (234) 567-890",
  companyName: "Diamond Trading Co.",
  companyType: "dealer",
  address: "123 Diamond Street, New York, NY 10001",
  bio: "Experienced diamond trader with 15+ years in the industry. Specializing in high-quality certified diamonds.",
  isKycVerified: true,
  isEmailVerified: true,
  isBlocked: false,
  stripeOnboardingStatus: "COMPLETED",
  chargesEnabled: true,
  payoutsEnabled: true,
};

const MOCK_STATS: UserStats = {
  averageRating: 4.9,
  completedDeals: 342,
  reputationScore: 97,
  totalShipments: 298,
  cancelledDeals: 3,
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [state, setState] = useState<ProfileLoadingState>("loading");

  const fetchProfile = () => {
    setState("loading");
    // Simulate API call
    setTimeout(() => {
      setProfile(MOCK_PROFILE);
      setStats(MOCK_STATS);
      setState("success");
    }, 800);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, stats, state, retry: fetchProfile };
}
