import Vue from 'vue'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

Vue.prototype.$dateFns = {
  format,
  parseISO,
  locale: ptBR,
}