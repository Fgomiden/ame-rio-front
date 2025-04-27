<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Painel Administrativo - Artigo</h1>
    <NuxtLink
      to="/admin/posts/create"
      class="mb-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
    >
      Criar Novo 
    </NuxtLink>
    <div v-if="$fetchState.pending" class="text-center">Carregando...</div>
    <div v-else-if="posts.length === 0" class="text-center">
      Nenhum artigo encontrado.
    </div>
    <div v-else class="grid gap-4">
      <div v-for="post in posts" :key="post.id" class="border p-4 rounded">
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
