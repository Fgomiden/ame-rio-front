<template>
  <div class="relative bg-white overflow-hidden">
    <main class="flex-column  flex-wrap container">
      <section id="banner">
        <banner />
      </section>
      <section id="principios">
        <div class="flex-column ">
          <div class="flex-column  md-flex-row md-justify-around">
            <principle-card
              title="Missão"
              description="Divulgar para os interessados em saúde a visão científica da medicina espiritual trazida pela doutrina espírita."
              image="./icons/globe-icon.svg"
            />
            <principle-card
              title="Visão"
              description="Ser uma entidade que promove e vincula à visão da comunidade científica o espiritismo para o entendimento da Saúde."
              image="./icons/stethoscope-icon.svg"
            />
          </div>
          <div class="flex">
            <principle-card
              title="Valores"
              isValores
              image="./icons/doctor-icon.svg"
            />
          </div>
        </div>
      </section>
      <section id="atividades">
        <atividades />
      </section>
    </main>
  </div>
</template>

<script>
import Atividades from '~/components/pagina-inicial/Atividades.vue'
import Banner from '~/components/pagina-inicial/Banner.vue'
import PrincipleCard from '~/components/pagina-inicial/PrincipleCard.vue'
export default {
  components: { PrincipleCard, Banner, Atividades },
}
</script>

<style scoped>
main {
  gap: 16px;
}

section {
  padding: 5px 0;
}

#principios .flex-column > .flex-column,
#principios .flex {
  gap: 16px;
}

#principios .flex-column > .flex {
  margin-top: 16px;
}

</style>
