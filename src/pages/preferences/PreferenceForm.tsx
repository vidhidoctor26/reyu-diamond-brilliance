import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Diamond } from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

/* ── Options ───────────────────────────────────── */

const SHAPES = ["Round", "Princess", "Cushion", "Oval", "Emerald", "Pear", "Marquise", "Radiant", "Asscher", "Heart"];
const COLORS = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"];
const CERTIFICATIONS = ["GIA", "IGI", "AGS", "HRD", "EGL"];

export interface PreferenceFormData {
  shape: string;
  caratMin: number;
  caratMax: number;
  color: string;
  clarity: string;
  budgetMin: number;
  budgetMax: number;
  certification: string;
}

const EMPTY_FORM: PreferenceFormData = {
  shape: "",
  caratMin: 0.5,
  caratMax: 3,
  color: "",
  clarity: "",
  budgetMin: 1000,
  budgetMax: 50000,
  certification: "",
};

/* ── Field wrapper ─────────────────────────────── */

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

/* ── Page ──────────────────────────────────────── */

const PreferenceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  // In a real app, fetch the existing preference by id for edit mode.
  // For now we use mock seed data lookup or empty form.
  const [form, setForm] = useState<PreferenceFormData>(() => {
    if (!isEdit) return EMPTY_FORM;
    // Mock: try to load from sessionStorage (set by list page)
    const stored = sessionStorage.getItem(`pref_edit_${id}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return EMPTY_FORM;
      }
    }
    return EMPTY_FORM;
  });

  const updateField = <K extends keyof PreferenceFormData>(key: K, value: PreferenceFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = useCallback(() => {
    if (!form.shape || !form.color || !form.clarity || !form.certification) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    if (isEdit) {
      toast({ title: "Preference updated", description: "Your requirement has been saved." });
    } else {
      toast({ title: "Preference created", description: "New requirement has been added." });
    }

    // Clean up session storage
    if (id) sessionStorage.removeItem(`pref_edit_${id}`);
    navigate("/user/preferences");
  }, [form, isEdit, id, navigate]);

  const handleCancel = () => {
    if (id) sessionStorage.removeItem(`pref_edit_${id}`);
    navigate("/user/preferences");
  };

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Preferences
          </button>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
              <Diamond className="h-5 w-5 text-accent" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {isEdit ? "Edit Preference" : "Create Preference"}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-2 ml-[52px]">
            {isEdit
              ? "Update your diamond requirement criteria."
              : "Define your diamond requirements to receive tailored recommendations."}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-6 sm:p-8 rounded-xl shadow-soft border-border/60">
            <div className="grid gap-6">
              {/* Shape */}
              <Field label="Shape">
                <Select value={form.shape} onValueChange={(v) => updateField("shape", v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHAPES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
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
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              {/* Clarity */}
              <Field label="Clarity">
                <Select value={form.clarity} onValueChange={(v) => updateField("clarity", v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select clarity" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLARITIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
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
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select certification" />
                  </SelectTrigger>
                  <SelectContent>
                    {CERTIFICATIONS.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-8 mt-2 border-t border-border/40">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {isEdit ? "Update Preference" : "Save Preference"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardShell>
  );
};

export default PreferenceForm;
