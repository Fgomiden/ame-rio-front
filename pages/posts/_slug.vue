<template>
  <div>
    <div v-if="$fetchState.pending">
      <p>Carregando...</p>
      <!-- Adicione um loading simples -->
    </div>
    <div
      v-else-if="post"
      class="relative py-16 bg-white dark:bg-indigo-400 overflow-hidden"
    >
      <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto mb-6">
          <h1
            class="mt-2 mb-4 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
          >
            {{ post.title }}
          </h1>
        </div>
        <div
          v-if="post.content"
          class="prose prose-lg text-justify mx-auto px-5 px-md-50 max-w-4xl"
          v-html="$md.render(post.content)"
        ></div>
        <div class="prose prose-lg mx-auto mt-4">
          <Date v-if="post.createdAt" :date="post.createdAt" />
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
        `/posts/${this.$route.params.slug}`
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
