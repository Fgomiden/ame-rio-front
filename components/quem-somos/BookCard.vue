<template>
  <div>
    <div class="book-card">
      <div class="image-container">
        <img v-if="book.cover" :src="book.cover" alt="Capa Livro" class="book-image" />
      </div>
      <div class="card-content">
        <h2 class="text-base font-medium text-gray-600">
          {{ book.name }}
        </h2>
        <h3 v-if="!book.available" class="text-base text-gray-600">
          (Esgotado)
        </h3>
        <h3 v-if="book.description" class="text-sm text-gray-600 pt-2">
          {{ book.description }}
        </h3>
        <h3 v-if="book.publisher" class="text-base text-gray-600 pt-2">
          Editora: {{ book.publisher }}
        </h3>
        <h3 v-if="book.publisher_location" class="text-base text-gray-600">
          Local: {{ book.publisher_location }}
        </h3>
        <h3 v-if="book.author" class="text-base text-gray-600">
          Autor: {{ book.author }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: Object,
  },
}
</script>

<style scoped>
.book-card {
  display: flex;
  flex-direction: row;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  border-radius: 0.5rem;
  margin: 0.5rem;
  padding: 1rem; /* Added padding for better spacing */
}

.image-container {
  flex-shrink: 0; /* Prevent image from shrinking */
}

.book-image {
  width: 120px;
  height: auto;
  max-width: 100%;
  object-fit: cover; /* Ensure image fits nicely */
}

.card-content {
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 1rem;
  margin: 0 1rem;
  overflow-wrap: break-word; /* Ensure long words wrap */
}

@media (min-width: 768px) {
  .card-content {
    width: 13rem;
  }
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.font-medium {
  font-weight: 500;
}

.text-gray-600 {
  color: #4b5563;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.pt-2 {
  padding-top: 0.5rem;
}
</style>