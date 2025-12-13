<template>
  <div>
    <div v-if="$fetchState.pending" class="loading-state">
      <div class="spinner"></div>
      <p>Carregando artigo...</p>
    </div>

    <div v-else-if="post" class="post-wrapper">
      <div class="post-container">
        <!-- Cabeçalho do Post -->
        <div class="post-header">
          <h1 class="post-title">
            {{ post.titulo }}
          </h1>

          <div class="post-meta">
            <span class="author">👤 {{ post.autor }}</span>
            <Date v-if="post.dataPublicacao" :date="post.dataPublicacao" />
          </div>
        </div>

        <!-- Conteúdo do Post -->
        <article
          v-if="post.texto"
          class="post-content markdown-body"
          v-html="$md.render(post.texto)"
        ></article>

        <div v-else class="empty-content">
          <p>Este artigo ainda não possui conteúdo.</p>
        </div>
      </div>
    </div>

    <div v-else class="error-state">
      <h2>❌ Artigo não encontrado</h2>
      <p>O artigo que você procura não existe ou foi removido.</p>
      <NuxtLink to="/" class="back-home">← Voltar para o início</NuxtLink>
    </div>
  </div>
</template>

<script>
import Date from '~/components/Date.vue'
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
      console.log('Post carregado:', this.post)
    } catch (error) {
      console.error('Erro ao buscar o post:', error)
      this.post = null
    }
  },

  fetchOnServer: true,

  head() {
    // SEO
    return {
      title: this.post?.titulo || 'Artigo',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post?.texto?.substring(0, 160) || '',
        },
      ],
    }
  },
}
</script>

<style scoped>
/* ===== LOADING STATE ===== */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ===== ERROR STATE ===== */
.error-state {
  text-align: center;
  padding: 4rem 2rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-state h2 {
  font-size: 2rem;
  color: #dc2626;
  margin-bottom: 1rem;
}

.error-state p {
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.back-home {
  padding: 0.75rem 1.5rem;
  background-color: #6366f1;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.back-home:hover {
  background-color: #4338ca;
}

/* ===== POST WRAPPER ===== */
.post-wrapper {
  position: relative;
  padding: 4rem 0;
  background-color: #ffffff;
  min-height: 100vh;
}

.post-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .post-container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .post-container {
    padding: 0 2rem;
  }
}

/* ===== POST HEADER ===== */
.post-header {
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #111827;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
}

@media (min-width: 640px) {
  .post-title {
    font-size: 3rem;
  }
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  color: #6b7280;
  font-size: 0.95rem;
}

.author {
  font-weight: 600;
  color: #374151;
}

.views {
  color: #6b7280;
}

.empty-content {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}
</style>

<style>
/* ===== ESTILOS MARKDOWN - NÃO USE SCOPED ===== */

.markdown-body {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
}

/* Parágrafos */
.markdown-body p {
  margin: 1.25rem 0;
  line-height: 1.8;
  text-align: justify;
}

/* Headings */
.markdown-body h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  line-height: 1.2;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.markdown-body h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.markdown-body h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.markdown-body h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4b5563;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Listas Ordenadas */
.markdown-body ol {
  margin: 1.5rem 0;
  padding-left: 2rem;
  color: #374151;
}

.markdown-body ol li {
  margin: 0.75rem 0;
  line-height: 1.8;
  padding-left: 0.5rem;
}

.markdown-body ol li::marker {
  color: #6366f1;
  font-weight: 700;
  font-size: 1.1em;
}

/* Listas Não Ordenadas */
.markdown-body ul {
  margin: 1.5rem 0;
  padding-left: 2rem;
  color: #374151;
}

.markdown-body ul li {
  margin: 0.75rem 0;
  line-height: 1.8;
  padding-left: 0.5rem;
}

.markdown-body ul li::marker {
  color: #6366f1;
  font-size: 1.2em;
}

/* Sublistas */
.markdown-body ol ol,
.markdown-body ol ul,
.markdown-body ul ol,
.markdown-body ul ul {
  margin: 0.5rem 0;
}

/* Blockquote - Citações */
.markdown-body blockquote {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  background-color: #f3f4f6;
  border-left: 4px solid #6366f1;
  border-radius: 0.5rem;
  font-style: italic;
  color: #374151;
}

.markdown-body blockquote p {
  margin: 0.5rem 0;
  text-align: left;
}

.markdown-body blockquote p:first-child {
  margin-top: 0;
}

.markdown-body blockquote p:last-child {
  margin-bottom: 0;
}

/* Código Inline */
.markdown-body code {
  background-color: #f3f4f6;
  color: #dc2626;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
  font-family: 'Courier New', Courier, monospace;
}

/* Blocos de Código */
.markdown-body pre {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background-color: #1f2937;
  color: #f9fafb;
  border-radius: 0.5rem;
  overflow-x: auto;
  line-height: 1.6;
}

.markdown-body pre code {
  background-color: transparent;
  color: #f9fafb;
  padding: 0;
  font-size: 0.95rem;
}

/* Links */
.markdown-body a {
  color: #6366f1;
  text-decoration: underline;
  font-weight: 500;
  transition: color 0.2s;
}

.markdown-body a:hover {
  color: #4338ca;
}

/* Imagens */
.markdown-body img {
  max-width: 100%;
  height: auto;
  margin: 2rem auto;
  display: block;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Tabelas */
.markdown-body table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.markdown-body table th {
  background-color: #f3f4f6;
  color: #1f2937;
  font-weight: 700;
  padding: 0.875rem 1rem;
  text-align: left;
  border-bottom: 2px solid #d1d5db;
}

.markdown-body table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

.markdown-body table tr:last-child td {
  border-bottom: none;
}

.markdown-body table tr:hover {
  background-color: #f9fafb;
}

/* Linha Horizontal */
.markdown-body hr {
  margin: 3rem 0;
  border: none;
  border-top: 2px solid #e5e7eb;
}

/* Strong (Negrito) */
.markdown-body strong {
  font-weight: 700;
  color: #1f2937;
}

/* Emphasis (Itálico) */
.markdown-body em {
  font-style: italic;
  color: #4b5563;
}

/* Strike */
.markdown-body del {
  text-decoration: line-through;
  color: #9ca3af;
}

/* Task Lists */
.markdown-body .task-list-item {
  list-style: none;
  margin-left: -2rem;
  padding-left: 0;
}

.markdown-body .task-list-item input {
  margin-right: 0.5rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .markdown-body {
    font-size: 1rem;
  }

  .markdown-body h1 {
    font-size: 1.875rem;
  }

  .markdown-body h2 {
    font-size: 1.5rem;
  }

  .markdown-body h3 {
    font-size: 1.25rem;
  }

  .markdown-body pre {
    font-size: 0.875rem;
  }

  .markdown-body table {
    font-size: 0.875rem;
  }
}
</style>
