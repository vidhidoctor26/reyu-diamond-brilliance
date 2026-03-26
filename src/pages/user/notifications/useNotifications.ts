import { useState, useCallback, useMemo } from "react";

export type NotificationType = "BID" | "DEAL" | "CHAT" | "PAYMENT" | "SYSTEM";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
  link?: string;
  actorName?: string;
  actorAvatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "BID",
    title: "New bid received",
    body: "Arjun Mehta placed a bid of $12,500 on your Round 2.5ct listing.",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    link: "/bids/received/LST-001",
    actorName: "Arjun Mehta",
  },
  {
    id: "n2",
    type: "DEAL",
    title: "Deal status updated",
    body: "Deal #DL-1042 has been marked as Shipped. Track your delivery.",
    read: false,
    createdAt: new Date(Date.now() - 35 * 60 * 1000),
    link: "/user/deals/DL-1042",
    actorName: "System",
  },
  {
    id: "n3",
    type: "CHAT",
    title: "New message from Priya Sharma",
    body: "Hi, I wanted to discuss the clarity grade on that emerald cut stone…",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    link: "/messages/conv-003",
    actorName: "Priya Sharma",
  },
  {
    id: "n4",
    type: "PAYMENT",
    title: "Payment received",
    body: "You received $8,200 for Deal #DL-1038. Funds are now in escrow.",
    read: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    link: "/user/deals/DL-1038",
    actorName: "System",
  },
  {
    id: "n5",
    type: "BID",
    title: "Bid expired",
    body: "Your bid of $6,800 on Oval 1.8ct has expired.",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    link: "/bids",
    actorName: "System",
  },
  {
    id: "n6",
    type: "SYSTEM",
    title: "KYC verification approved",
    body: "Your identity verification has been approved. You can now list diamonds.",
    read: true,
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
    link: "/kyc",
    actorName: "System",
  },
  {
    id: "n7",
    type: "DEAL",
    title: "Deal completed",
    body: "Deal #DL-1035 is now completed. Leave a review for the buyer.",
    read: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    link: "/user/deals/DL-1035",
    actorName: "System",
  },
  {
    id: "n8",
    type: "CHAT",
    title: "New message from Vikram Patel",
    body: "Can you share the GIA certificate for the princess cut?",
    read: true,
    createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000),
    link: "/messages/conv-007",
    actorName: "Vikram Patel",
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [loading, setLoading] = useState(false);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Group by day
  const grouped = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);

    const groups: { label: string; items: Notification[] }[] = [];
    const todayItems: Notification[] = [];
    const yesterdayItems: Notification[] = [];
    const olderItems: Notification[] = [];

    notifications.forEach((n) => {
      const d = new Date(n.createdAt);
      if (d >= today) todayItems.push(n);
      else if (d >= yesterday) yesterdayItems.push(n);
      else olderItems.push(n);
    });

    if (todayItems.length) groups.push({ label: "Today", items: todayItems });
    if (yesterdayItems.length) groups.push({ label: "Yesterday", items: yesterdayItems });
    if (olderItems.length) groups.push({ label: "Earlier", items: olderItems });

    return groups;
  }, [notifications]);

  return { notifications, grouped, unreadCount, loading, markAsRead, markAllAsRead };
}
