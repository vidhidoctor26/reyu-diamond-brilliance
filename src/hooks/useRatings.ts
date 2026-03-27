import { useState, useEffect, useCallback } from "react";

export interface DealRating {
  dealId: string;
  overall: number;
  categories: {
    communication: number;
    productQuality: number;
    delivery: number;
    pricing: number;
    professionalism: number;
  };
  reviewText: string;
  anonymous: boolean;
  submittedAt: string;
}

const PENDING_KEY = "pending_ratings";
const SUBMITTED_KEY = "submitted_ratings";
const SESSION_DISMISSED_KEY = "session_dismissed_ratings";

const getStoredSet = (key: string): Set<string> => {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return new Set();
  }
};

const storeSet = (key: string, set: Set<string>) => {
  localStorage.setItem(key, JSON.stringify([...set]));
};

export const useRatings = (dealId: string, dealStatus: string) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [submittedRating, setSubmittedRating] = useState<DealRating | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const submitted = getStoredSet(SUBMITTED_KEY);
    if (submitted.has(dealId)) {
      setIsRated(true);
      try {
        const ratings: DealRating[] = JSON.parse(localStorage.getItem("deal_ratings") || "[]");
        const found = ratings.find((r) => r.dealId === dealId);
        if (found) setSubmittedRating(found);
      } catch { /* ignore */ }
      return;
    }

    if (dealStatus === "COMPLETED") {
      const dismissed = getStoredSet(SESSION_DISMISSED_KEY);
      if (!dismissed.has(dealId)) {
        // Auto-trigger on completion
        const pending = getStoredSet(PENDING_KEY);
        pending.add(dealId);
        storeSet(PENDING_KEY, pending);
        setTimeout(() => setShowRatingModal(true), 600);
      }
    }
  }, [dealId, dealStatus]);

  const submitRating = useCallback(async (rating: Omit<DealRating, "dealId" | "submittedAt">) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fullRating: DealRating = { ...rating, dealId, submittedAt: new Date().toISOString() };

    // Mark as submitted
    const submitted = getStoredSet(SUBMITTED_KEY);
    submitted.add(dealId);
    storeSet(SUBMITTED_KEY, submitted);

    // Remove from pending
    const pending = getStoredSet(PENDING_KEY);
    pending.delete(dealId);
    storeSet(PENDING_KEY, pending);

    // Store rating
    try {
      const ratings: DealRating[] = JSON.parse(localStorage.getItem("deal_ratings") || "[]");
      ratings.push(fullRating);
      localStorage.setItem("deal_ratings", JSON.stringify(ratings));
    } catch { /* ignore */ }

    setSubmittedRating(fullRating);
    setIsRated(true);
    setIsSubmitting(false);
    setShowRatingModal(false);
  }, [dealId]);

  const dismissRating = useCallback(() => {
    // Mark dismissed for this session
    const dismissed = getStoredSet(SESSION_DISMISSED_KEY);
    dismissed.add(dealId);
    storeSet(SESSION_DISMISSED_KEY, dismissed);
    setShowRatingModal(false);
  }, [dealId]);

  const openRatingModal = useCallback(() => {
    setShowRatingModal(true);
  }, []);

  return {
    showRatingModal,
    isRated,
    submittedRating,
    isSubmitting,
    submitRating,
    dismissRating,
    openRatingModal,
  };
};
