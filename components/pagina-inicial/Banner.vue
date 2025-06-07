<template>
  <div class="flex-column  md-flex-row">
    <div class="bg-stonehenge"></div>
    <div class="md-flex-1 mx-auto my-auto px-5 text-center md-text-left">
      <h1
        class="text-2xl md-text-4xl tracking-tight font-extrabold text-gray-900"
      >
        <span class="block">Associação Médico-Espírita</span>
        <span class="block">do Estado do Rio de Janeiro</span>
      </h1>
      <p
        class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
      >
        Instituição que congrega os profissionais de saúde espíritas, cuja
        diretoria é composta por médicos.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
}
</script>

<style scoped>
.bg-stonehenge {
  background-image: url('https://res.cloudinary.com/ame-rio/image/upload/v1653759158/Banner_Ame_Rio.png');
  height: 12rem;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 768px) {
  .bg-stonehenge {
    margin-left: auto;
    margin-right: auto;
    flex: 1 1 0%;
    height: 20rem; 
    width: 66.666667%;
  }
}

@media (min-width: 1024px) {
  .bg-stonehenge {
    background-size: cover; /* lg:bg-cover */
  }
}
</style>