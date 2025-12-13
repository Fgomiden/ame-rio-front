<!-- components/Date.vue -->
<template>
  <time :datetime="date" class="date"> 🗓️ {{ formattedDate }} </time>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(this.date).toLocaleDateString('pt-BR', options)
    },
  },
}
</script>

<style scoped>
.date {
  color: #6b7280;
  font-size: 0.95rem;
}
</style>
