<template>
  <div class="container">
    <h1 class="title text-center">Editar Post</h1>
    <div v-if="$fetchState.pending" class="text-center">Carregando...</div>
    <div v-else-if="!post" class="text-center">Post não encontrado.</div>
    <form v-else @submit.prevent="updatePost">
      <div class="form-group">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Título</label
        >
        <input
          v-model="form.title"
          id="title"
          type="text"
          class="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div class="form-group">
        <label for="content" class="form-label">Conteúdo (Markdown)</label>
        <SimpleMde v-model="form.content" :configs="editorConfig" />
      </div>
      <div class="form-group">
        <label for="docx" class="form-label">Upload de .docx (opcional)</label>
        <input
          type="file"
          id="docx"
          accept=".docx"
          @change="handleFileUpload"
          class="mt-1 block w-full"
        />
      </div>
      <div class="form-group">
        <label for="author" class="form-label">Autor</label>
        <input
          v-model="form.author"
          id="author"
          type="text"
          class="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div class="text-center">
        <button type="submit" class="create-button" :disabled="submitting">
          {{ submitting ? 'Salvando...' : 'Atualizar Post' }}
        </button>
        <NuxtLink to="/admin/posts" class="m-2"> Cancelar </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script>
import mammoth from 'mammoth'

export default {
  data() {
    return {
      post: null,
      form: {
        title: '',
        content: '',
        author: '',
      },
      submitting: false,
      editorConfig: {
        spellChecker: false,
        status: false,
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'image',
          '|',
          'preview',
          'side-by-side',
          'fullscreen',
        ],
      },
    }
  },
  async fetch() {
    try {
      this.post = await this.$axios.$get(`/artigos/${this.$route.params.id}`)
      this.form = {
        title: this.post.title,
        content: this.post.content,
        author: this.post.author,
      }
    } catch (error) {
      console.error('Erro ao buscar post:', error)
      this.post = null
    }
  },
  layout: 'admin',
  methods: {
    async updatePost() {
      this.submitting = true
      try {
        await this.$axios.$put(`/artigos/${this.$route.params.id}`, this.form)
        alert('Post atualizado com sucesso!')
        this.$router.push('/admin/posts')
      } catch (error) {
        console.error('Erro ao atualizar post:', error)
        alert('Erro ao atualizar o post.')
      } finally {
        this.submitting = false
      }
    },
    async handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file || !file.name.endsWith('.docx')) {
        alert('Por favor, selecione um arquivo .docx')
        return
      }

      try {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.convertToMarkdown({ arrayBuffer })
        this.form.content = result.value || 'Conteúdo não pôde ser extraído.'
        if (result.messages.length > 0) {
          console.warn('Avisos ao converter .docx:', result.messages)
        }
      } catch (error) {
        console.error('Erro ao processar arquivo .docx:', error)
        alert('Erro ao processar o arquivo .docx.')
      }
    },
  },
}
</script>

<style scoped>
/* Ajustes para o editor Markdown */
:deep(.EasyMDEContainer) {
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
