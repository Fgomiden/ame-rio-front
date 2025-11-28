<template>
  <div>
    <div v-if="$fetchState.pending">
      <p>Carregando...</p>
      <!-- Adicione um loading simples -->
    </div>
    <div v-else-if="post" class="post-wrapper">
      <div class="post-container">
        <div class="post-intro">
          <h1 class="post-heading">
            {{ post.titulo }}
          </h1>
        </div>
        <div
          v-if="post.texto"
          class="post-content"
          v-html="$md.render(post.texto)"
        ></div>
        <div class="post-content-simple">
          <Date v-if="post.dataPublicacao" :date="post.dataPublicacao" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Post não encontrado.</p>
      <!-- Tratamento de erro -->
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      post: null,
    }
  },
  async fetch() {
    try {
      this.post = await this.$axios.$get(
        `/artigos/slug/${this.$route.params.slug}`
      )
      console.log('post', this.post)
    } catch (error) {
      console.error('Erro ao buscar o post:', error)
      this.post = null // Define como null se der erro
    }
  },
  fetchOnServer: true,
}
</script>
<style scoped>
/* relative py-16 bg-white dark:bg-indigo-400 overflow-hidden */
.post-wrapper {
  position: relative;
  padding-top: 4rem; /* 64px */
  padding-bottom: 4rem; /* 64px */
  background-color: #ffffff;
  overflow: hidden;
}

/* relative px-4 sm:px-6 lg:px-8 */
.post-container {
  position: relative;
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
}

@media (min-width: 640px) {
  .post-container {
    padding-left: 1.5rem; /* 24px */
    padding-right: 1.5rem; /* 24px */
  }
}

@media (min-width: 1024px) {
  .post-container {
    padding-left: 2rem; /* 32px */
    padding-right: 2rem; /* 32px */
  }
}

/* text-lg max-w-prose mx-auto mb-6 */
.post-intro {
  font-size: 1.125rem; /* 18px */
  max-width: 50ch;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem; /* 24px */
}

/* mt-2 mb-4 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 */
.post-heading {
  margin-top: 0.5rem; /* 8px */
  margin-bottom: 1rem; /* 16px */
  font-size: 1.875rem; /* 30px */
  text-align: center;
  line-height: 2rem; /* 32px */
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #111827;
}

@media (min-width: 640px) {
  .post-heading {
    font-size: 2.25rem; /* 36px */
    line-height: 2.5rem; /* 40px */
  }
}

/* prose prose-lg text-justify mx-auto px-5 px-md-50 max-w-4xl */
.post-content {
  max-width: 80rem; /* 896px - max-w-4xl */
  margin-left: auto;
  margin-right: auto;
  text-align: justify;
  font-size: 1.125rem; /* 18px - prose-lg */
  line-height: 1.75rem; /* 28px - prose-lg */
  color: #374151;
}

@media (min-width: 768px) {
  .post-content {
    padding-left: 12.5rem; /* 200px - px-md-50 (assumindo 50 * 4px) */
    padding-right: 12.5rem; /* 200px */
  }
}

/* prose prose-lg mx-auto mt-4 */
.post-content-simple {
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem; /* 16px */
  color: #374151;
  max-width: 65ch; /* largura padrão do prose */
}
</style>
