export const lightTheme = {
  background: "#F8F9FA", // Off-white modern background
  surface: "#FFFFFF",
  primary: ["#6366F1", "#8B5CF6"], // Indigo to Violet gradient
  text: "#1E293B", // Slate 800
  textSecondary: "#64748B", // Slate 500
  border: "#E2E8F0", // Slate 200
  error: "#EF4444", // Red 500
  success: "#10B981", // Emerald 500
  cardShadow: {
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const darkTheme = {
  background: "#0F172A", // Slate 900
  surface: "#1E293B", // Slate 800
  primary: ["#818CF8", "#A78BFA"], // Lighter Indigo/Violet for dark mode
  text: "#F8FAFC", // Slate 50
  textSecondary: "#94A3B8", // Slate 400
  border: "#334155", // Slate 700
  error: "#F87171", // Red 400
  success: "#34D399", // Emerald 400
  cardShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
};
