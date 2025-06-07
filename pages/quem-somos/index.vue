<template>
  <div class="py-2 bg-white">
    <div v-if="$fetchState.pending">
      <!-- por animação de loading -->
    </div>
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900">
        Quem Somos
      </h2>
      <div id="diretoria">
        <h3 class="text-xl font-bold py-2">Diretoria</h3>
        <div class="grid-col">
          <div v-for="doctor in this.doctors.data.filter(
            (d) => d.field == 'Diretoria'
          )" :key="doctor.id">
            <doctor-card :doctor="doctor" />
          </div>
        </div>
      </div>
      <div id="conselho-fiscal">
        <h3 class="text-xl font-bold py-2">Conselho Fiscal</h3>
        <div class="grid-col">
          <div v-for="doctor in this.doctors.data.filter(
            (d) => d.field == 'Conselho Fiscal'
          )" :key="doctor.id">
            <doctor-card :doctor="doctor" />
          </div>
        </div>
      </div>
      <div id="responsavel">
        <h3 class="text-center text-xl font-bold py-5">
          Apresentação do responsável atual pela Associação
        </h3>
        <responsible-text />
      </div>
      <div id="livros-autor">
        <div>
          <h3 class="text-xl font-bold py-2">
            Autor de {{ this.books.data.filter((b) => !b.preface).length }} livros espíritas:
          </h3>
          <div class="grid-col">
            <div v-for="book in this.books.data.filter(
              (b) => !b.preface
            )" :key="book.id">
              <book-card :book="book" />
            </div>
          </div>
        </div>
      </div>
      <div id="livros-prefaciador">
        <div>
          <h3 class="text-xl font-bold py-2">
            Apresentador e Prefaciador dos seguintes livros espíritas:
          </h3>
          <div class="grid-col">
            <div v-for="book in this.books.data.filter(
              (b) => b.preface
            )" :key="book.id">
              <book-card :book="book" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorCard from '~/components/quem-somos/DoctorCard.vue'
import BookCard from '~/components/quem-somos/BookCard.vue'
import ResponsibleText from '~/components/quem-somos/ResponsibleText.vue'
export default {
  components: { DoctorCard, BookCard, ResponsibleText },
  data() {
    return {
      doctors: [],
      books: [],
    }
  },
  async fetch() {
    this.doctors = await this.$axios.$get('/data/doctors.json', { baseURL: window.location.origin })
    console.log("doctors", this.doctors)

    this.books = await this.$axios.$get('/data/books.json', { baseURL: window.location.origin })
    console.log("books", this.books)
  },
  fetchOnServer: true,
}
</script>
