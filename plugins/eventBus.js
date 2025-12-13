import Vue from 'vue'

// Criar instância do Vue para usar como Event Bus
export const EventBus = new Vue()

// Injetar no contexto Nuxt
export default (context, inject) => {
  inject('eventBus', EventBus)
}
