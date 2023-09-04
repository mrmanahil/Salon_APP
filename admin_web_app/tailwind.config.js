function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgba(var(${variableName}), 1)`;
    }
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: withOpacity("--color-dark"),
        light: withOpacity("--color-light"),
      },
      backgroundColor: {
        dark: withOpacity("--color-dark"),
        light: withOpacity("--color-light"),
      },
      borderColor: {
        dark: withOpacity("--color-dark"),
        light: withOpacity("--color-light"),
      },
    },
  },
  plugins: [],
};
