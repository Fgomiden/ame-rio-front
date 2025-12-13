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
        <label for="content" class="form-label">Conteúdo</label>
        <client-only>
          <ToastEditor
            ref="toastEditor"
            :initial-value="form.texto"
            initial-edit-type="wysiwyg"
            :options="editorOptions"
            height="600px"
            @change="onEditorChange"
          />
        </client-only>
      </div>

      <div class="form-group">
        <label for="docx" class="form-label">
          📄 Upload de .docx (opcional)
        </label>
        <div class="file-upload-wrapper">
          <input
            type="file"
            id="docx"
            ref="fileInput"
            accept=".docx"
            @change="handleFileUpload"
            class="file-input"
          />
          <label for="docx" class="file-label">
            <span v-if="!uploadedFile">Escolher arquivo .docx</span>
            <span v-else>✅ {{ uploadedFile }}</span>
          </label>
        </div>
        <p class="help-text">O conteúdo do arquivo substituirá o texto atual</p>
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
      editorOptions: {
        minHeight: '600px',
        language: 'pt-BR',
        useCommandShortcut: true,
        usageStatistics: false,
        hideModeSwitch: false,
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['image', 'table', 'link'],
          ['code', 'codeblock'],
        ],
      },
    }
  },
  layout: 'admin',
  methods: {
    onEditorChange() {
      this.form.texto = this.$refs.toastEditor.invoke('getMarkdown')
    },

    async createPost() {
      this.submitting = true
      try {
        const token = localStorage.getItem('token')

        this.form.texto = this.$refs.toastEditor.invoke('getMarkdown')

        // Validações
        if (!this.form.titulo.trim()) {
          this.$toast.warning('⚠️ Título é obrigatório')
          return
        }

        if (!this.form.autor.trim()) {
          this.$toast.warning('⚠️ Autor é obrigatório')
          return
        }

        if (!this.form.texto.trim()) {
          this.$toast.warning('⚠️ Conteúdo é obrigatório')
          return
        }

        const novoArtigo = await this.$axios.$post('/artigos', this.form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.$eventBus.$emit('artigo-criado', novoArtigo)

        this.$toast.success('✅ Artigo criado com sucesso!')

        setTimeout(() => {
          this.$router.push('/admin/posts')
        }, 300)
      } catch (error) {
        console.error('Erro ao criar post:', error)
        this.$toast.error('❌ Erro ao criar o artigo.')
      } finally {
        this.submitting = false
      }
    },
    async handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file || !file.name.endsWith('.docx')) {
        this.$toast.warning('⚠️ Por favor, selecione um arquivo .docx')
        return
      }

      try {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.convertToMarkdown({ arrayBuffer })

        // Definir conteúdo no editor
        this.$refs.toastEditor.invoke('setMarkdown', result.value)
        this.form.texto = result.value

        this.$toast.success('📄 Arquivo .docx processado com sucesso!')
      } catch (error) {
        console.error('Erro ao processar arquivo .docx:', error)
        this.$toast.error('❌ Erro ao processar o arquivo .docx.')
      }
    },
  },
}
</script>

<style scoped>
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
