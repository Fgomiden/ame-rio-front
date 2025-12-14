<template>
  <div class="container">
    <h1 class="title text-center">Editar Artigo</h1>

    <div v-if="$fetchState.pending" class="loading">
      <div class="spinner"></div>
      Carregando artigo...
    </div>

    <div v-else-if="!post" class="error-state">
      <p>❌ Artigo não encontrado.</p>
      <NuxtLink to="/admin/posts" class="back-link">
        ← Voltar para lista
      </NuxtLink>
    </div>

    <form v-else @submit.prevent="updatePost">
      <!-- Título -->
      <div class="form-group">
        <label for="title" class="form-label">Título</label>
        <input
          v-model="form.titulo"
          id="title"
          type="text"
          class="form-input"
          placeholder="Digite o título do artigo..."
          required
        />
      </div>

      <!-- Conteúdo com Toast UI Editor -->
      <div class="form-group">
        <label class="form-label">Conteúdo</label>

        <client-only>
          <ToastEditor
            ref="toastEditor"
            :initial-value="form.texto"
            :initial-edit-type="editMode"
            :options="editorOptions"
            height="600px"
            @change="onEditorChange"
          />
        </client-only>
      </div>

      <!-- Upload .docx -->
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

      <!-- Autor -->
      <div class="form-group">
        <label for="author" class="form-label">Autor</label>
        <input
          v-model="form.autor"
          id="author"
          type="text"
          class="form-input"
          placeholder="Nome do autor..."
          required
        />
      </div>

      <!-- Status de Publicação -->
      <div class="form-group">
        <label class="form-label">Status</label>
        <div class="status-toggle">
          <label class="switch">
            <input type="checkbox" v-model="form.publicado" />
            <span class="slider"></span>
          </label>
          <span class="status-label" :class="{ published: form.publicado }">
            {{ form.publicado ? '✅ Publicado' : '📝 Rascunho' }}
          </span>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="submitting">
          <span v-if="submitting">⏳ Salvando...</span>
          <span v-else>💾 Atualizar Artigo</span>
        </button>

        <NuxtLink to="/admin/posts" class="btn-secondary">
          ← Cancelar
        </NuxtLink>
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
        titulo: '',
        texto: '',
        autor: '',
        publicado: false,
      },
      submitting: false,
      uploadedFile: null,
      editMode: 'wysiwyg',
      editorOptions: {
        minHeight: '600px',
        language: 'pt-BR',
        useCommandShortcut: true,
        usageStatistics: false,
        hideModeSwitch: false,
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'image', 'table', 'indent', 'outdent'],
          ['task', 'link'],
        ],
        placeholder: 'Digite o conteúdo do artigo aqui...',
      },
    }
  },

  async fetch() {
    try {
      const token = localStorage.getItem('token')

      this.post = await this.$axios.$get(`/artigos/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Preencher form com dados do artigo
      this.form = {
        titulo: this.post.titulo || '',
        texto: this.post.texto || '',
        autor: this.post.autor || '',
        publicado: this.post.publicado || false,
      }
    } catch (error) {
      console.error('Erro ao buscar artigo:', error)
      this.post = null

      if (error.response?.status === 401) {
        this.$toast.error('Sessão expirada. Faça login novamente.')
        this.$router.push('/login')
      } else if (error.response?.status === 404) {
        this.$toast.error('Artigo não encontrado.')
      } else {
        this.$toast.error('Erro ao carregar artigo.')
      }
    }
  },

  layout: 'admin',
  middleware: 'auth',

  methods: {
    onEditorChange() {
      // Atualizar form.texto quando o editor mudar
      if (this.$refs.toastEditor) {
        this.form.texto = this.$refs.toastEditor.invoke('getMarkdown')
      }
    },

    async updatePost() {
      this.submitting = true

      try {
        const token = localStorage.getItem('token')

        // Obter conteúdo final do editor
        if (this.$refs.toastEditor) {
          this.form.texto = this.$refs.toastEditor.invoke('getMarkdown')
        }

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

        // Atualizar artigo
        const artigoAtualizado = await this.$axios.$put(
          `/artigos/${this.$route.params.id}`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        // Emitir evento para atualizar lista (se estiver usando EventBus)
        if (this.$eventBus) {
          this.$eventBus.$emit('artigo-atualizado', artigoAtualizado)
        }

        this.$toast.success('✅ Artigo atualizado com sucesso!')

        // Redirecionar após pequeno delay
        setTimeout(() => {
          this.$router.push('/admin/posts')
        }, 500)
      } catch (error) {
        console.error('Erro ao atualizar artigo:', error)

        if (error.response?.status === 401) {
          this.$toast.error('Sessão expirada. Faça login novamente.')
          this.$router.push('/login')
        } else if (error.response?.status === 404) {
          this.$toast.error('Artigo não encontrado.')
        } else {
          this.$toast.error('❌ Erro ao atualizar artigo.')
        }
      } finally {
        this.submitting = false
      }
    },

    async handleFileUpload(event) {
      const file = event.target.files[0]

      if (!file) return

      if (!file.name.endsWith('.docx')) {
        this.$toast.warning('⚠️ Por favor, selecione um arquivo .docx')
        this.$refs.fileInput.value = null
        return
      }

      try {
        this.$toast.info('📄 Processando arquivo...')

        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.convertToMarkdown({ arrayBuffer })

        const conteudo = result.value || 'Conteúdo não pôde ser extraído.'

        // Definir conteúdo no editor
        if (this.$refs.toastEditor) {
          this.$refs.toastEditor.invoke('setMarkdown', conteudo)
          this.form.texto = conteudo
        }

        this.uploadedFile = file.name

        if (result.messages.length > 0) {
          console.warn('Avisos ao converter .docx:', result.messages)
        }

        this.$toast.success('✅ Arquivo .docx processado com sucesso!')
      } catch (error) {
        console.error('Erro ao processar arquivo .docx:', error)
        this.$toast.error('❌ Erro ao processar o arquivo .docx.')
      }
    },
  },
}
</script>

<style scoped>
/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  text-align: center;
  padding: 3rem;
  color: #dc2626;
}

/* Status Toggle */
.status-toggle {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.3s;
  border-radius: 28px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #10b981;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.status-label {
  font-weight: 600;
  color: #6b7280;
  transition: color 0.2s;
}

.status-label.published {
  color: #10b981;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-primary:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #6b7280;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

/* Toast Editor Customization */
:deep(.toastui-editor-defaultUI) {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

:deep(.toastui-editor-toolbar) {
  background-color: #f9fafb;
}

:deep(.toastui-editor-contents) {
  font-size: 15px;
  line-height: 1.7;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>
