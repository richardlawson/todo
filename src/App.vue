<script setup>
import ToDo from './components/ToDo.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen items-center w-full">
      <div class="flex-grow max-w-2xl w-full mt-16 text-gray-700 px-4 md:px-0 mb-12">
        <header class="w-full text-gray-700 mb-4">
          <h1 class="bg-red-600 text-white italic inline-block p-2 font-extralight">TO DO:</h1>
        </header>
        <main class="w-full bg-white rounded-2xl p-6">
          <ToDo/>
        </main>
      </div>
      <footer class="flex-none bg-gray-800 text-white w-full px-2 md:px-8 py-2 font-extralight">
        <ul>
          <li>Flipshark Productions &copy;{{ new Date().getFullYear() }}</li>
        </ul>
      </footer>
  </div>
</template>

<style>
</style>
