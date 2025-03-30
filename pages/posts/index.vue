<template>
  <section class="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative mx-auto lg:max-w-7xl w-full">
      <div
        class="mt-10 grid gap-16-2 md:grid-cols-2 md:gap-x-5 gap-y-12 w-full"
      >
        <div v-for="post in posts" :key="post.id">
          <NuxtLink :to="'/posts/' + post.slug" class="block">
            <Date :date="post.createdAt" />
            <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
              {{ post.title }}
            </h3>
            <h4 class="mt-2 text-xl leading-7 text-gray-900">
              Autor: {{ post.author }}
            </h4>
            <!-- <p
              class="mt-3 text-justify leading-6 text-gray-500 dark:text-black"
            >
              {{ post.preview }}
            </p> -->
          </NuxtLink>
          <div class="mt-3">
            <NuxtLink
              :to="'/posts/' + post.slug"
              class="text-base leading-6 font-semibold text-indigo-600 dark:text-black hover:text-indigo-500 transition ease-in-out duration-150"
            >
              Leia Mais
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      posts: [],
    }
  },
  async fetch() {
    this.posts = await this.$axios.$get('/posts')
  },

  fetchOnServer: true,
}
</script>
