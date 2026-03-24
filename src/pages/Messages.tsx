import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardShell from "@/components/layout/DashboardShell";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  participant: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  contextType: "REQUIREMENT" | "DEAL";
  contextId: string;
  lastMessageText: string;
  lastMessageAt: string;
  unreadCount: number;
  updatedAt: string;
}

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participant: { firstName: "Arjun", lastName: "Mehta" },
    contextType: "DEAL",
    contextId: "DEAL-1001",
    lastMessageText: "I've shipped the parcel via FedEx. Tracking number shared.",
    lastMessageAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    unreadCount: 3,
    updatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "conv-2",
    participant: { firstName: "Sarah", lastName: "Chen" },
    contextType: "REQUIREMENT",
    contextId: "REQ-2045",
    lastMessageText: "Do you have VS1 clarity in round brilliant? Looking for 2ct+",
    lastMessageAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "conv-3",
    participant: { firstName: "Raj", lastName: "Patel" },
    contextType: "DEAL",
    contextId: "DEAL-998",
    lastMessageText: "Payment confirmed. Thank you for the smooth transaction!",
    lastMessageAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "conv-4",
    participant: { firstName: "Emily", lastName: "Watson" },
    contextType: "REQUIREMENT",
    contextId: "REQ-3012",
    lastMessageText: "Can you share the GIA certificate for the emerald cut?",
    lastMessageAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

const Messages = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading] = useState(false);

  const filtered = mockConversations.filter((c) => {
    const name = `${c.participant.firstName} ${c.participant.lastName}`.toLowerCase();
    return name.includes(search.toLowerCase()) || c.lastMessageText.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <DashboardShell>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">Your conversations from deals and requirements</p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl border-border bg-card"
          />
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No conversations yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Start one from a Requirement or Deal page.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-2">
              {filtered.map((conv, i) => (
                <motion.button
                  key={conv.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => navigate(`/messages/${conv.id}`)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card text-left transition-all duration-200 hover:shadow-sm hover:border-accent/40",
                    conv.unreadCount > 0 && "bg-accent/5 border-accent/20"
                  )}
                >
                  {/* Avatar */}
                  <Avatar className="h-11 w-11 shrink-0">
                    <AvatarImage src={conv.participant.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                      {getInitials(conv.participant.firstName, conv.participant.lastName)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={cn("text-sm font-semibold text-foreground", conv.unreadCount > 0 && "font-bold")}>
                        {conv.participant.firstName} {conv.participant.lastName}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1.5 py-0 h-4 font-medium",
                          conv.contextType === "DEAL"
                            ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                            : "border-blue-300 text-blue-700 bg-blue-50"
                        )}
                      >
                        {conv.contextType === "DEAL" ? "🤝 Deal" : "📋 Requirement"}
                      </Badge>
                    </div>
                    <p className={cn(
                      "text-xs truncate max-w-[280px]",
                      conv.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {conv.lastMessageText}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {getRelativeTime(conv.lastMessageAt)}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </DashboardShell>
  );
};

export default Messages;
