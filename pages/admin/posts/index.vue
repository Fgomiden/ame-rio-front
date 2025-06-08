<template>
  <div class="flex-column">
    <div class="head">
      <NuxtLink to="/admin" class="back-button">Voltar</NuxtLink>
    </div>
    <main>
      <h1 class="title">Painel Administrativo - Artigos</h1>
      <div class="actions">
        <div class="flex-auto">
          <NuxtLink to="/admin/posts/create" class="create-button">
            Criar Novo
          </NuxtLink>
        </div>
        <div class="flex-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por título ou autor..."
            class="search-input"
          />
        </div>
      </div>
      <div v-if="$fetchState.pending" class="loading">Carregando...</div>
      <div v-else-if="filteredPosts.length === 0" class="empty-state">
        Nenhum artigo encontrado.
      </div>
      <div v-else class="grid">
        <div v-for="post in filteredPosts" :key="post.id" class="card">
          <NuxtLink :to="`/admin/posts/edit/${post.id}`">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-info">Autor: {{ post.author }}</p>
            <p class="card-info">
              Criado em:
              {{
                post.createdAt
                  ? $dateFns.format(new Date(post.createdAt), 'dd/mm/yyyy', {
                      locale: $dateFns.locale,
                    })
                  : 'Não informado'
              }}
            </p>
            <div class="card-actions">
              <button @click="deletePost(post.id)" class="delete-button">
                Excluir
              </button>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      searchQuery: '',
    }
  },
  computed: {
    filteredPosts() {
      if (!this.searchQuery) return this.posts
      const query = this.searchQuery.toLowerCase()
      return this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      )
    },
  },
  async fetch() {
    try {
      this.posts = await this.$axios.$get('/posts')
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      this.posts = []
    }
  },
  middleware: 'auth',
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
head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back-button {
  margin-left: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--gray-500);
  color: var(--white);
  text-decoration: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: var(--gray-500);
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-top: 4rem;
}

.title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 40rem;
  margin-bottom: 2rem;
}

.search-input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.loading,
.empty-state {
  font-size: 1.125rem;
  color: #4b5563;
  text-align: center;
  margin-top: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 80rem;
}

.card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.card-info {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.card-actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.delete-button {
  background: none;
  border: none;
  color: #dc2626;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.delete-button:hover {
  color: #b91c1c;
}
</style>
