import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#20161F", // Dark brown
            foreground: "#c59f60", // Light cream
            primary: {
              50: "#EAE1CF", // Very light coffee
              100: "#DCC6A0", // Light cream
              200: "#C4A484", // Coffee with milk
              300: "#A07855", // Lighter coffee
              400: "#805C40", // Medium coffee
              500: "#624430", // Darker coffee
              600: "#4E3526", // Even darker coffee
              700: "#3B2F2F", // Dark brown
              800: "#2A211F", // Very dark brown
              900: "#1A130F", // Almost black coffee
              DEFAULT: "#4E3526", // Even darker coffee
              foreground: "#c59f60", // Light cream
            },
            focus: "#64D8CB", // Teal
          },
        },
        light: {
          colors: {
            background: "#FFF3E6", // Light retro beige
            foreground: "#2F2B2A", // Dark retro brown
            primary: {
              50: "#FFF3E6", // Very light retro beige
              100: "#F5E1DA", // Light retro beige
              200: "#E4C8B6", // Light retro brown
              300: "#D3A894", // Retro peach
              400: "#C39073", // Retro orange-brown
              500: "#B37A5A", // Retro brown
              600: "#9E6443", // Darker retro brown
              700: "#7C4D37", // Dark retro brown
              800: "#5A372A", // Very dark retro brown
              900: "#3A211E", // Almost black retro brown
              DEFAULT: "#9E6443", // Darker retro brown
              foreground: "#2F2B2A", // Dark retro brown
            },
            focus: "#64D8CB", // Teal
          },
        },
      },
    }),
  ],
} satisfies Config;
