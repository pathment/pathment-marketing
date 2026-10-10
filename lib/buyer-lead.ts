export const programTypes = ["Mentorship", "Fellowship", "Bootcamp", "Internship", "Employee development", "Education community", "Other"] as const;

export type BuyerLead = {
  email: string;
  fullName: string;
  organizationName: string;
  organizationSize?: string;
  participants?: string;
  programType?: string;
  launchTimeframe?: string;
  planInterest?: string;
  message?: string;
  website?: string;
  startedAt?: number;
};

export type LeadErrors = Partial<Record<keyof BuyerLead, string>>;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validateBuyerLead(value: unknown): { data?: BuyerLead; errors: LeadErrors } {
  if (!value || typeof value !== "object") return { errors: { email: "Enter your work email.", fullName: "Enter your full name.", organizationName: "Enter your organization name." } };
  const input = value as Record<string, unknown>;
  const data: BuyerLead = {
    email: text(input.email, 160).toLowerCase(),
    fullName: text(input.fullName, 100),
    organizationName: text(input.organizationName, 140),
    organizationSize: text(input.organizationSize, 60),
    participants: text(input.participants, 60),
    programType: text(input.programType, 80),
    launchTimeframe: text(input.launchTimeframe, 80),
    planInterest: text(input.planInterest, 80),
    message: text(input.message, 1200),
    website: text(input.website, 200),
    startedAt: typeof input.startedAt === "number" ? input.startedAt : undefined,
  };
  const errors: LeadErrors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Enter a valid work email.";
  if (data.fullName.length < 2) errors.fullName = "Enter your full name.";
  if (data.organizationName.length < 2) errors.organizationName = "Enter your organization name.";
  if (data.message && data.message.length < 5) errors.message = "Add a little more detail or leave this blank.";
  return Object.keys(errors).length ? { errors } : { data, errors };
}
