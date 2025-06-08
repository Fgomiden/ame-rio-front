<template>
  <div class="login-container">
    <h2 class="login-title">Admin Login</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Usuário</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="form-input"
        />
      </div>
      <button type="submit" class="submit-button">Login</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$axios.post('/auth/login', {
          username: this.username,
          password: this.password,
        })
        localStorage.setItem('token', response.data.access_token)
        this.$router.push('/admin')
      } catch (error) {
        if (error.response?.status === 500) {
          this.error = 'Erro na configuração do Servidor'
        }
        else if (error.response?.status === 429) {
          this.error = 'Muitas tentativas, por favor, tente novamente mais tarde'
        } else {
          this.error = 'Nome de usuário ou senha inválidos'
        }
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 20rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 0.25rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.submit-button {
  padding: 0.75rem;
  background-color: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #345c9c;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
