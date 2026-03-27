import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DealRating } from "@/hooks/useRatings";
import RatingStars from "./RatingStars";

interface RatingBannerProps {
  isRated: boolean;
  submittedRating: DealRating | null;
  onRateNow: () => void;
}

const RatingBanner = ({ isRated, submittedRating, onRateNow }: RatingBannerProps) => {
  if (isRated && submittedRating) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/50 dark:bg-amber-500/5 dark:border-amber-500/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-400/10 flex items-center justify-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium">You rated this deal</p>
            <RatingStars value={submittedRating.overall} size="sm" readOnly />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/50 dark:bg-amber-500/5 dark:border-amber-500/20 p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-400/10 flex items-center justify-center">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        </div>
        <div>
          <p className="text-sm font-medium">You haven't rated this deal yet</p>
          <p className="text-xs text-muted-foreground">Help build trust in the marketplace</p>
        </div>
      </div>
      <Button size="sm" onClick={onRateNow} className="gap-1.5">
        <Star className="h-3.5 w-3.5" /> Rate Now
      </Button>
    </div>
  );
};

export default RatingBanner;
