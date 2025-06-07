<template>
  <div class="container">
    <div class="flex flex-wrap">
      <div class="pt-6 w-full px-4 text-center">
        <div
          class="
            relative
            flex-column 
            mb-8
            w-full
            card-shadow
          "
        >
          <div class="px-4 py-4 flex-auto">
            <div class="card-image">
              <img :src="image" alt="Icon" />
            </div>
            <h6 class="text-xl font-semibold">{{ title }}</h6>
            <p class="mt-2 mb-4 text-gray-600 text-lg">
              {{ description }}
            </p>
            <div v-if="isValores" class="mt-2 mb-4 mx-6 text-lg text-gray-600 text-justify">
              1. A medicina espiritual como exercício legítimo e ético.<br />
              2. Entendimento da saúde integral do homem na visão espírita sob a
              égide de Jesus.<br />
              3. A ciência espírita, com sua metodologia de estudo, amplia a
              noção de saúde integral do homem e pode contribuir com a
              comunidade científica.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrincipleCard',
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    isValores: {
      type: Boolean,
    },
  },
}
</script>

<style scoped>
.mb-8{
  margin-bottom: 2rem;
}

.card {
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 16px;
  background-color: var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 250px;
  max-width: 400px;
}

.card-image {
  display: inline-flex;
  width: 4rem;
  height: 4rem;
  margin-bottom: 8px;
  justify-content: center;
}

.card-image>img {
  width: auto;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary); /* Usando primary para títulos */
  margin-bottom: 8px;
}

.card-description {
  font-size: 1rem;
  color: var(--gray-600);
}

.card-values {
  list-style: disc;
  padding-left: 20px;
}
</style>
