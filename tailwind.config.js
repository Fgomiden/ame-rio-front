module.exports = {
  content: [
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './assets/**/*.{vue,js,ts}',
  ],
  theme: {
    colors: {
      primary: '#004a92',
      secondary: '#1699d5',
      darkblue: '#24456a',
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  },
}
