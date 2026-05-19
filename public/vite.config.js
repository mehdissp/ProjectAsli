build: {
  cssCodeSplit: true,
  minify: 'terser',
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom']
      }
    }
  }
}