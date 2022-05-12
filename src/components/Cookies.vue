<template>
  <aside v-if="display" class="bg-gray-800 w-full text-gray-300 text-sm flex justify-center p-4">
    <div class="max-w-2xl w-full">
      <h2 class="font-extralight text-xl lg:text-2xl mb-2">Cookies on Flipshark.co.uk</h2>
      <p class="mb-4">We use cookies for security purposes, remembering your preferences and to analyse site traffic to understand our users' behaviour. This includes anonymised Google Analytics data. Please note, we will never share your information with third parties.</p>
      <button @click="savePreferences" class="p-2 border border-gray-300 rounded hover:underline">I'm okay with that</button>
    </div>
  </aside>
</template>

<script>

export default {
  data() {
    return {
      display: false
    }
  },
  mounted() {
   this.loadPreferences()
  },
  methods: {
    loadPreferences() {
      if (localStorage.getItem('allowCookies') === null || localStorage.getItem('allowCookies') !== '1') {
        this.display = true
      }
    },
    savePreferences() {
      localStorage.setItem('allowCookies', '1')
      this.display = false
    },

  },
}

</script>

<style scoped>

</style>
