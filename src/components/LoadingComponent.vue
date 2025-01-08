<template>
    <div class="loading-indicator">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  </script>
  
  <style scoped>
  .loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Tinggi area loading */
  }
  
  .spinner {
    border: 8px solid #f3f3f3; /* Warna latar belakang */
    border-top: 8px solid #181818; /* Warna bagian atas */
    border-radius: 50%; /* Membuat lingkaran */
    width: 50px; /* Lebar spinner */
    height: 50px; /* Tinggi spinner */
    animation: spin 1s linear infinite; /* Animasi berputar */
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>