<template>
  <div class="py-2 bg-white">
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="
          text-center text-3xl
          leading-8
          font-extrabold
          tracking-tight
          text-gray-900
        "
      >
        Mentor
      </h2>
    </div>
    <div class="mx-auto">
      <div class="flex justify-center">
        <div class="px-5 md:px-40">
          <div class="flex-column text-center">
            <h3 class="font-bold text-xl">Dr. Dias da Cruz</h3>
          </div>
          <div class="flex-column py-4">
            <img
              src="https://res.cloudinary.com/ame-rio/image/upload/v1653755796/Dias-da-Cruz-FIlho.jpg"
              class="w-full h-52 object-contain"
              alt="Dr. Dias da Cruz"
            />
          </div>
        </div>
      </div>
      <MentorText />
    </div>
  </div>
</template>
<script>
import MentorText from '~/components/mentor/MentorText.vue'
export default {
  components: { MentorText },
}
</script>