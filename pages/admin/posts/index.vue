<template>
  <div class="container">
    <h1 class="title">Painel Administrativo - Artigo</h1>
    <NuxtLink
      to="/admin/posts/create"
      class="mb-4"
    >
      Criar Novo 
    </NuxtLink>
    <div v-if="$fetchState.pending" class="text-gray-600">Carregando...</div>
    <div v-else-if="posts.length === 0" class="text-gray-600">
      Nenhum artigo encontrado.
    </div>
    <div v-else class="grid">
      <div v-for="post in posts" :key="post.id" class="border border-gray-200">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="text-gray-600">Autor: {{ post.author }}</p>
        <p class="text-gray-600">Slug: {{ post.slug }}</p>
        <div class="mt-2">
          <NuxtLink
            :to="`/admin/posts/edit/${post.id}`"
            class="text-indigo-600 hover:text-indigo-500 mr-4"
          >
            Editar
          </NuxtLink>
          <button
            @click="deletePost(post.id)"
            class="text-red-600 hover:text-red-500"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    }
  },
  async fetch() {
    try {
      this.posts = await this.$axios.$get('/posts')
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      this.posts = []
    }
  },
  methods: {
    async deletePost(id) {
      if (confirm('Tem certeza que deseja excluir este post?')) {
        try {
          await this.$axios.$delete(`/posts/${id}`)
          this.posts = this.posts.filter((post) => post.id !== id)
          alert('Post excluído com sucesso!')
        } catch (error) {
          console.error('Erro ao excluir post:', error)
          alert('Erro ao excluir o post.')
        }
      }
    },
  },
}
</script>
<style scoped>
.grid {
  display: grid;
  gap: 16px;
}
</style>