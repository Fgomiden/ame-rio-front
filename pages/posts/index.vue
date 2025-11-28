<template>
  <section class="blog-posts-section">
    <div class="blog-container">
      <!-- Título e Barra de Pesquisa -->
      <div class="blog-header">
        <h1 class="blog-title">Artigos</h1>
        <!-- Barra de Pesquisa Fixa -->
        <div class="search-wrapper">
          <div class="search-container">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar artigos..."
              class="search-input"
            />
            <svg
              class="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Grid de Posts -->
      <div class="blog-posts-grid">
        <div v-for="post in filteredPosts" :key="post.id" class="post-card">
          <NuxtLink :to="'/posts/' + post.slug">
            <Date :date="post.createdAt" />
            <h3 class="post-title-semibold">
              {{ post.titulo }}
            </h3>
            <h4 class="post-title">Autor: {{ post.autor }}</h4>
            <p class="post-preview">
              {{ post.preview }}
            </p>
            <div class="post-preview">
              <Date v-if="post.dataPublicacao" :date="post.dataPublicacao" />
            </div>
          </NuxtLink>
          <div class="mt-3">
            <NuxtLink :to="'/posts/' + post.slug" class="post-link">
              Leia Mais
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há resultados -->
      <div v-if="filteredPosts.length === 0" class="no-results">
        <p>Nenhum artigo encontrado para "{{ searchQuery }}"</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      posts: [],
      searchQuery: '',
    }
  },
  async fetch() {
    this.posts = await this.$axios.$get('/artigos/publicados')
    console.log('posts', this.posts)
  },
  fetchOnServer: true,
  computed: {
    filteredPosts() {
      if (!this.searchQuery) {
        return this.posts
      }

      const query = this.searchQuery.toLowerCase()
      return this.posts.filter((post) => {
        return (
          post.titulo.toLowerCase().includes(query) ||
          post.autor.toLowerCase().includes(query)
        )
      })
    },
  },
}
</script>

<style scoped>
.blog-posts-section {
  padding-top: 4rem; /* 64px */
  padding-bottom: 5rem; /* 80px */
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
}

@media (min-width: 640px) {
  .blog-posts-section {
    padding-left: 1.5rem; /* 24px */
    padding-right: 1.5rem; /* 24px */
  }
}

@media (min-width: 1024px) {
  .blog-posts-section {
    padding-top: 1rem; /* 96px */
    padding-bottom: 10rem; /* 112px */
    padding-left: 2rem; /* 32px */
    padding-right: 2rem; /* 32px */
  }
}

.blog-container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

@media (min-width: 1024px) {
  .blog-container {
    max-width: 80rem;
  }
}

/* Header com título e pesquisa */
.blog-header {
  margin-bottom: 3rem; /* 48px */
  text-align: center;
}

/* Título "Artigos" */
.blog-title {
  font-size: 2.25rem; /* 36px */
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.5rem; /* 24px */
  letter-spacing: -0.025em;
}

@media (min-width: 640px) {
  .blog-title {
    font-size: 3rem; /* 48px */
  }
}

/* Wrapper da barra de pesquisa - FIXO */
.search-wrapper {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1rem 0; /* 16px - espaçamento vertical */
  background-color: #ffffff;
  margin-bottom: 2rem; /* 32px */
}

/* Container interno do input */
.search-container {
  position: relative;
  max-width: 36rem; /* 576px */
  margin-left: auto;
  margin-right: auto;
}

/* Input de pesquisa */
.search-input {
  width: 100%;
  padding: 0.75rem 1rem; /* 12px 16px */
  padding-left: 3rem; /* 48px - espaço para o ícone */
  font-size: 1rem; /* 16px */
  line-height: 1.5;
  color: #111827;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem; /* 8px */
  outline: none;
  transition: all 0.2s ease-in-out;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Ícone de pesquisa */
.search-icon {
  position: absolute;
  left: 1rem; /* 16px */
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem; /* 20px */
  height: 1.25rem; /* 20px */
  color: #9ca3af;
  pointer-events: none;
}

/* Mensagem de nenhum resultado */
.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
  font-size: 1.125rem; /* 18px */
}

.blog-posts-grid {
  margin-top: 2.5rem; /* 40px */
  display: grid;
  gap: 3rem; /* 48px - assumindo gap-y-12 como padrão */
  row-gap: 3rem; /* 48px */
  width: 100%;
}

@media (min-width: 768px) {
  .blog-posts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 1.25rem; /* 20px */
  }
}

.post-card {
  display: block;
  padding: 1.5rem; /* 24px */
  border-radius: 0.5rem; /* 8px */
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
}

.post-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.post-card-dramatic {
  display: block;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
}

.post-card-dramatic:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-4px);
}

.post-title-semibold {
  margin-top: 0.5rem; /* 8px */
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight: 600;
  color: #111827;
}

.post-title {
  margin-top: 0.5rem; /* 8px */
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  color: #111827;
}

.post-preview {
  margin-top: 0.75rem; /* 12px */
  text-align: justify;
  line-height: 1.5rem; /* 24px */
  color: #6b7280;
}

.post-link {
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
  font-weight: 600;
  color: #4f46e5;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 150ms;
}

.post-link:hover {
  color: #6366f1;
}
</style>
