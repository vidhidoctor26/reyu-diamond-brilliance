import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Paperclip,
  Send,
  X,
  Reply,
  Check,
  CheckCheck,
  FileText,
  Download,
  Image as ImageIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardShell from "@/components/layout/DashboardShell";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type MessageStatus = "SENDING" | "SENT" | "DELIVERED" | "READ";

interface Attachment {
  type: "image" | "document";
  url: string;
  name: string;
  size?: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  sentAt: string;
  status: MessageStatus;
  replyTo?: { id: string; text: string };
  attachments?: Attachment[];
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */
const CURRENT_USER_ID = "me";

const mockParticipant: Participant = {
  id: "user-arjun",
  firstName: "Arjun",
  lastName: "Mehta",
};

const mockMessages: ChatMessage[] = [
  {
    id: "m1",
    senderId: "user-arjun",
    text: "Hi, I saw your requirement for a 2ct round brilliant. I have a matching stone.",
    sentAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: "READ",
  },
  {
    id: "m2",
    senderId: CURRENT_USER_ID,
    text: "That's great! Can you share the GIA certificate?",
    sentAt: new Date(Date.now() - 2.9 * 60 * 60 * 1000).toISOString(),
    status: "READ",
  },
  {
    id: "m3",
    senderId: "user-arjun",
    text: "Sure, here's the certificate.",
    sentAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    status: "READ",
    attachments: [{ type: "document", url: "#", name: "GIA-Certificate-2024.pdf", size: "1.2 MB" }],
  },
  {
    id: "m4",
    senderId: CURRENT_USER_ID,
    text: "Looks good. What's your best price for this?",
    sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "READ",
    replyTo: { id: "m3", text: "Sure, here's the certificate." },
  },
  {
    id: "m5",
    senderId: "user-arjun",
    text: "I can offer $12,500 per carat. This is an excellent VS1 stone with no fluorescence.",
    sentAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    status: "READ",
  },
  {
    id: "m6",
    senderId: CURRENT_USER_ID,
    text: "Let me check and get back to you.",
    sentAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: "DELIVERED",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function getInitials(f: string, l: string) {
  return `${f[0]}${l[0]}`.toUpperCase();
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDateSeparator(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function shouldShowDateSep(msgs: ChatMessage[], idx: number) {
  if (idx === 0) return true;
  const prev = new Date(msgs[idx - 1].sentAt).toDateString();
  const curr = new Date(msgs[idx].sentAt).toDateString();
  return prev !== curr;
}

function isGroupStart(msgs: ChatMessage[], idx: number) {
  if (idx === 0) return true;
  return msgs[idx].senderId !== msgs[idx - 1].senderId || shouldShowDateSep(msgs, idx);
}

/* ------------------------------------------------------------------ */
/*  Status icon                                                        */
/* ------------------------------------------------------------------ */
const StatusIcon = ({ status }: { status: MessageStatus }) => {
  switch (status) {
    case "SENDING":
      return <div className="h-3 w-3 rounded-full border-2 border-muted-foreground border-t-transparent animate-spin" />;
    case "SENT":
      return <Check className="h-3 w-3 text-muted-foreground" />;
    case "DELIVERED":
      return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
    case "READ":
      return <CheckCheck className="h-3 w-3 text-primary" />;
  }
};

/* ------------------------------------------------------------------ */
/*  ChatWindow                                                         */
/* ------------------------------------------------------------------ */
const ChatWindow = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const participant = mockParticipant;
  const contextType: "REQUIREMENT" | "DEAL" = "DEAL";
  const contextId = "DEAL-1001";

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed && attachments.length === 0) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: CURRENT_USER_ID,
      text: trimmed,
      sentAt: new Date().toISOString(),
      status: "SENDING",
      replyTo: replyTo ? { id: replyTo.id, text: replyTo.text } : undefined,
      attachments: attachments.map((f) => ({
        type: f.type.startsWith("image") ? "image" : "document",
        url: URL.createObjectURL(f),
        name: f.name,
        size: `${(f.size / 1024).toFixed(0)} KB`,
      })),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setReplyTo(null);
    setAttachments([]);

    // Simulate status update
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: "SENT" as MessageStatus } : m))
      );
    }, 600);
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: "DELIVERED" as MessageStatus } : m))
      );
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
    e.target.value = "";
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-border bg-card shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => navigate("/messages")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={participant.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              {getInitials(participant.firstName, participant.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-foreground truncate">
              {participant.firstName} {participant.lastName}
            </h2>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] px-1.5 py-0 h-4 font-medium cursor-pointer",
                contextType === "DEAL"
                  ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                  : "border-blue-300 text-blue-700 bg-blue-50"
              )}
              onClick={() =>
                navigate(contextType === "DEAL" ? `/user/deals/${contextId}` : `/user/preferences`)
              }
            >
              {contextType === "DEAL" ? "🤝 " : "📋 "}
              {contextId}
            </Badge>
          </div>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-1 bg-muted/30">
          {loading ? (
            <div className="space-y-4 py-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn("flex gap-2", i % 2 === 0 ? "justify-end" : "")}>
                  <Skeleton className="h-12 w-48 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => {
                const isMe = msg.senderId === CURRENT_USER_ID;
                const showDate = shouldShowDateSep(messages, idx);
                const groupStart = isGroupStart(messages, idx);

                return (
                  <div key={msg.id}>
                    {/* Date separator */}
                    {showDate && (
                      <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-[10px] text-muted-foreground font-medium px-2">
                          {formatDateSeparator(msg.sentAt)}
                        </span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                    )}

                    {/* Message row */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex gap-2 group", isMe ? "justify-end" : "", groupStart ? "mt-3" : "mt-0.5")}
                    >
                      {/* Avatar (other) */}
                      {!isMe && groupStart && (
                        <Avatar className="h-7 w-7 mt-1 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                            {getInitials(participant.firstName, participant.lastName)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      {!isMe && !groupStart && <div className="w-7 shrink-0" />}

                      <div className={cn("max-w-[75%] sm:max-w-[65%]", isMe ? "items-end" : "items-start")}>
                        {/* Reply preview */}
                        {msg.replyTo && (
                          <div
                            className={cn(
                              "text-[10px] px-3 py-1.5 mb-0.5 rounded-t-xl border-l-2",
                              isMe
                                ? "bg-primary/5 border-primary/30 text-primary/70 rounded-bl-xl"
                                : "bg-muted border-muted-foreground/30 text-muted-foreground rounded-br-xl"
                            )}
                          >
                            <span className="line-clamp-1">{msg.replyTo.text}</span>
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={cn(
                            "px-3.5 py-2 rounded-2xl text-sm leading-relaxed relative",
                            isMe
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-card border border-border text-foreground rounded-bl-md"
                          )}
                        >
                          {msg.text && <p className="whitespace-pre-wrap break-words">{msg.text}</p>}

                          {/* Attachments */}
                          {msg.attachments?.map((att, ai) => (
                            <div key={ai} className="mt-2">
                              {att.type === "image" ? (
                                <div className="rounded-lg overflow-hidden max-w-[200px]">
                                  <img src={att.url} alt={att.name} className="w-full object-cover" />
                                </div>
                              ) : (
                                <div
                                  className={cn(
                                    "flex items-center gap-2 p-2 rounded-lg",
                                    isMe ? "bg-primary-foreground/10" : "bg-muted"
                                  )}
                                >
                                  <FileText className="h-5 w-5 shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{att.name}</p>
                                    {att.size && <p className="text-[10px] opacity-70">{att.size}</p>}
                                  </div>
                                  <Download className="h-4 w-4 shrink-0 cursor-pointer opacity-70 hover:opacity-100" />
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Time + status */}
                          <div className={cn("flex items-center gap-1 mt-1", isMe ? "justify-end" : "")}>
                            <span className={cn("text-[9px]", isMe ? "text-primary-foreground/60" : "text-muted-foreground")}>
                              {formatTime(msg.sentAt)}
                            </span>
                            {isMe && <StatusIcon status={msg.status} />}
                          </div>
                        </div>

                        {/* Reply action */}
                        <button
                          onClick={() => setReplyTo(msg)}
                          className="hidden group-hover:flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5 px-1 hover:text-foreground transition-colors"
                        >
                          <Reply className="h-3 w-3" /> Reply
                        </button>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* ── Input bar ── */}
        <div className="shrink-0 border-t border-border bg-card px-4 sm:px-6 py-3">
          {/* Reply preview */}
          <AnimatePresence>
            {replyTo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 px-3 py-2 mb-2 rounded-lg bg-muted border-l-2 border-primary text-xs text-muted-foreground">
                  <Reply className="h-3 w-3 shrink-0" />
                  <span className="flex-1 truncate">{replyTo.text}</span>
                  <button onClick={() => setReplyTo(null)}>
                    <X className="h-3.5 w-3.5 hover:text-foreground" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attachment previews */}
          {attachments.length > 0 && (
            <div className="flex gap-2 mb-2 flex-wrap">
              {attachments.map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted text-xs">
                  {f.type.startsWith("image") ? (
                    <ImageIcon className="h-3 w-3" />
                  ) : (
                    <FileText className="h-3 w-3" />
                  )}
                  <span className="max-w-[100px] truncate">{f.name}</span>
                  <button onClick={() => setAttachments((prev) => prev.filter((_, j) => j !== i))}>
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 max-h-[120px]"
            />

            <Button
              size="icon"
              className="shrink-0 h-9 w-9 rounded-xl"
              disabled={!input.trim() && attachments.length === 0}
              onClick={handleSend}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default ChatWindow;
