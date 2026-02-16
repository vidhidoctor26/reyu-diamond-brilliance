import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Diamond,
  Pencil,
  Trash2,
  X,
  Search,
} from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

/* ── Types ─────────────────────────────────────── */

interface Preference {
  id: string;
  shape: string;
  caratMin: number;
  caratMax: number;
  color: string;
  clarity: string;
  budgetMin: number;
  budgetMax: number;
  certification: string;
  createdAt: string;
}

type PreferenceForm = Omit<Preference, "id" | "createdAt">;

const EMPTY_FORM: PreferenceForm = {
  shape: "",
  caratMin: 0.5,
  caratMax: 3,
  color: "",
  clarity: "",
  budgetMin: 1000,
  budgetMax: 50000,
  certification: "",
};

/* ── Options ───────────────────────────────────── */

const SHAPES = ["Round", "Princess", "Cushion", "Oval", "Emerald", "Pear", "Marquise", "Radiant", "Asscher", "Heart"];
const COLORS = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"];
const CERTIFICATIONS = ["GIA", "IGI", "AGS", "HRD", "EGL"];

/* ── Mock seed data ────────────────────────────── */

const SEED: Preference[] = [
  {
    id: "1",
    shape: "Round",
    caratMin: 1,
    caratMax: 2.5,
    color: "D",
    clarity: "VVS1",
    budgetMin: 5000,
    budgetMax: 25000,
    certification: "GIA",
    createdAt: "2026-02-10T10:30:00Z",
  },
  {
    id: "2",
    shape: "Oval",
    caratMin: 0.8,
    caratMax: 1.5,
    color: "F",
    clarity: "VS1",
    budgetMin: 3000,
    budgetMax: 15000,
    certification: "IGI",
    createdAt: "2026-02-12T14:15:00Z",
  },
];

/* ── Page Component ────────────────────────────── */

const Preferences = () => {
  const [preferences, setPreferences] = useState<Preference[]>(SEED);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<PreferenceForm>(EMPTY_FORM);

  /* ── Handlers ── */

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (p: Preference) => {
    setEditingId(p.id);
    setForm({
      shape: p.shape,
      caratMin: p.caratMin,
      caratMax: p.caratMax,
      color: p.color,
      clarity: p.clarity,
      budgetMin: p.budgetMin,
      budgetMax: p.budgetMax,
      certification: p.certification,
    });
    setModalOpen(true);
  };

  const handleSave = useCallback(() => {
    if (!form.shape || !form.color || !form.clarity || !form.certification) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    if (editingId) {
      setPreferences((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...form } : p))
      );
      toast({ title: "Preference updated", description: "Your requirement has been saved." });
    } else {
      const newPref: Preference = {
        ...form,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setPreferences((prev) => [newPref, ...prev]);
      toast({ title: "Preference created", description: "New requirement has been added." });
    }

    setModalOpen(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
  }, [form, editingId]);

  const handleDelete = useCallback(() => {
    if (!deleteId) return;
    setPreferences((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    toast({ title: "Preference deleted", description: "Requirement removed successfully." });
  }, [deleteId]);

  const updateField = <K extends keyof PreferenceForm>(key: K, value: PreferenceForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              My Preferences
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your diamond requirements to receive tailored recommendations.
            </p>
          </div>
          <Button onClick={openCreate} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            Create Preference
          </Button>
        </motion.div>

        {/* List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : preferences.length === 0 ? (
          <EmptyState onCreate={openCreate} />
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {preferences.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <PreferenceCard
                    preference={p}
                    onEdit={() => openEdit(p)}
                    onDelete={() => setDeleteId(p.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingId ? "Edit Preference" : "Create Preference"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-2">
            {/* Shape */}
            <Field label="Shape">
              <Select value={form.shape} onValueChange={(v) => updateField("shape", v)}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select shape" /></SelectTrigger>
                <SelectContent>
                  {SHAPES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>

            {/* Carat Range */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Carat Min">
                <Input
                  type="number"
                  step={0.1}
                  min={0.1}
                  value={form.caratMin}
                  onChange={(e) => updateField("caratMin", parseFloat(e.target.value) || 0)}
                  className="rounded-xl"
                />
              </Field>
              <Field label="Carat Max">
                <Input
                  type="number"
                  step={0.1}
                  min={0.1}
                  value={form.caratMax}
                  onChange={(e) => updateField("caratMax", parseFloat(e.target.value) || 0)}
                  className="rounded-xl"
                />
              </Field>
            </div>

            {/* Color */}
            <Field label="Color">
              <Select value={form.color} onValueChange={(v) => updateField("color", v)}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select color" /></SelectTrigger>
                <SelectContent>
                  {COLORS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>

            {/* Clarity */}
            <Field label="Clarity">
              <Select value={form.clarity} onValueChange={(v) => updateField("clarity", v)}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select clarity" /></SelectTrigger>
                <SelectContent>
                  {CLARITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>

            {/* Budget Range */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Budget Min ($)">
                <Input
                  type="number"
                  step={100}
                  min={0}
                  value={form.budgetMin}
                  onChange={(e) => updateField("budgetMin", parseInt(e.target.value) || 0)}
                  className="rounded-xl"
                />
              </Field>
              <Field label="Budget Max ($)">
                <Input
                  type="number"
                  step={100}
                  min={0}
                  value={form.budgetMax}
                  onChange={(e) => updateField("budgetMax", parseInt(e.target.value) || 0)}
                  className="rounded-xl"
                />
              </Field>
            </div>

            {/* Certification */}
            <Field label="Certification">
              <Select value={form.certification} onValueChange={(v) => updateField("certification", v)}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select certification" /></SelectTrigger>
                <SelectContent>
                  {CERTIFICATIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete Preference</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this requirement. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardShell>
  );
};

/* ── Sub-components ────────────────────────────── */

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const PreferenceCard = ({
  preference: p,
  onEdit,
  onDelete,
}: {
  preference: Preference;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <Card className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl shadow-soft border-border/60">
    <div className="flex items-start gap-4 min-w-0">
      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
        <Diamond className="h-5 w-5 text-accent" />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-sm text-foreground">{p.shape}</span>
          <Badge variant="secondary" className="text-[11px] font-normal">
            {p.caratMin}–{p.caratMax} ct
          </Badge>
          <Badge variant="secondary" className="text-[11px] font-normal">
            {p.color} · {p.clarity}
          </Badge>
          <Badge variant="outline" className="text-[11px] font-normal">
            {p.certification}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          ${p.budgetMin.toLocaleString()} – ${p.budgetMax.toLocaleString()} · Created{" "}
          {new Date(p.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 shrink-0">
      <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-destructive hover:text-destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  </Card>
);

const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
      <Search className="h-7 w-7 text-muted-foreground" />
    </div>
    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
      No preferences yet
    </h3>
    <p className="text-sm text-muted-foreground mb-6 max-w-sm">
      Create your first diamond requirement and we'll match listings that fit your criteria.
    </p>
    <Button onClick={onCreate} className="gap-2">
      <Plus className="h-4 w-4" />
      Create Preference
    </Button>
  </motion.div>
);

export default Preferences;
