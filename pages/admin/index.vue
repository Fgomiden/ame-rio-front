<template>
  <div class="flex-column">
    <main>
      <h1>Painel Administrativo</h1>
      <div class="options">
        <NuxtLink to="/admin/posts/" class="option-link">
          Artigos
        </NuxtLink>
        <NuxtLink to="/admin/doctors/" class="option-link">
          Médicos
        </NuxtLink>
        <NuxtLink to="/admin/books/" class="option-link">
          Livros
        </NuxtLink>
        <button @click="logout" class="logout-button">Sair</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.logout-button {
  padding: 0.5rem 1rem;
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #b91c1c;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-top: 4rem;
}

h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 20rem;
}

.option-link {
  display: block;
  padding: 1rem;
  color: var(--primary);
  text-align: center;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.option-link:hover {
  background-color: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
}
</style>