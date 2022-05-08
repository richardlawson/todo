<script setup>
import ToDo from './components/ToDo.vue'
</script>

<template>
  <main class="grid place-items-center">
    <div class="max-w-2xl w-full mt-16 text-gray-700 px-4 md:px-0">
      <div class="w-full text-gray-700 mb-4">
        <h1>To Do:</h1>
      </div>
      <div class="w-full bg-white rounded p-6">
        <ToDo/>
      </div>
    </div>
  </main>
</template>

<style>
</style>
