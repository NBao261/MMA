/**
 * Theme constants for Handbag App
 * Color Palette: E-commerce Luxury (minimal, elegant)
 */

export const colors = {
  // Primary palette
  primary: "#1C1917",
  secondary: "#44403C",
  accent: "#CA8A04",

  // Background colors
  background: "#FAFAF9",
  surface: "#FFFFFF",

  // Text colors
  textPrimary: "#0C0A09",
  textSecondary: "#57534E",
  textMuted: "#78716C",

  // UI elements
  border: "#D6D3D1",
  divider: "#E7E5E4",

  // Semantic colors
  error: "#DC2626",
  success: "#16A34A",
  warning: "#CA8A04",

  // Gender indicators
  male: "#3B82F6",
  female: "#EC4899",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.textSecondary,
  },
};
