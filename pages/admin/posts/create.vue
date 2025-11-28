<template>
  <div class="container">
    <h1 class="title text-center">Criar Novo Artigo</h1>
    <form @submit.prevent="createPost">
      <div class="form-group">
        <label for="title" class="form-label">Título</label>
        <input
          v-model="form.titulo"
          id="title"
          type="text"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="content" class="form-label">Conteúdo (Markdown)</label>
        <SimpleMde v-model="form.texto" :configs="editorConfig" />
      </div>
      <div class="form-group">
        <label for="docx" class="form-label">Upload de .docx (opcional)</label>
        <input
          type="file"
          id="docx"
          accept=".docx"
          @change="handleFileUpload"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="author" class="form-label">Autor</label>
        <input
          v-model="form.autor"
          id="author"
          type="text"
          class="form-input"
          required
        />
      </div>
      <div class="text-center">
        <button type="submit" class="create-button" :disabled="submitting">
          {{ submitting ? 'Salvando...' : 'Criar' }}
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
      form: {
        titulo: '',
        texto: '',
        autor: '',
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
  layout: 'admin',
  methods: {
    async createPost() {
      this.submitting = true
      try {
        const token = localStorage.getItem('token')
        await this.$axios.$post('/artigos', this.form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        alert('Post criado com sucesso!')
        this.$router.push('/admin/posts')
      } catch (error) {
        console.error('Erro ao criar post:', error)
        alert('Erro ao criar o post.')
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
        this.form.texto = result.value || 'Conteúdo não pôde ser extraído.'
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
:deep(.EasyMDEContainer) {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #4338ca;
}
</style>
