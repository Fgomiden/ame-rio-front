<template>
  <NuxtLink
    :to="link"
    no-prefetch
    class="headerLink"
  >
    {{ text }}
  </NuxtLink>
</template>
<script>
export default {
  props: ["text", "link"],
};
</script>
<style scoped>
.headerLink,
.headerLink:link,
.headerLink:visited {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: #111827;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: ease-in-out;
  transition-duration: 150ms;
  padding-inline: 1rem; 
}

.headerLink:hover {
  color: #3b82f6;
}

 .headerLink:focus {
  outline: none;
  color: #3b82f6;
}

</style>
