<template>
  <nav class="header">
    <div class="nav-links">
      <DesktopHeaderLink
        v-for="navLink in navLinks"
        :key="navLink.title"
        :link="navLink.route"
        :text="navLink.title"
      />
    </div>
    <div class="social-icons" role="list">
      <span class="social-item" role="listitem">
        <a
          href="https://www.youtube.com/@Associa%C3%A7%C3%A3o-M%C3%A9dico-Esp%C3%ADrita-RJ"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Siga a AME-Rio no YouTube"
          class="social-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="youtube-icon"
          >
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />
          </svg>
        </a>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => {
    return {
      navLinks: [
        {
          title: 'Quem Somos',
          route: '/quem-somos',
        },
        {
          title: 'Artigos',
          route: '/posts',
        },
        {
          title: 'Recado',
          route: '/recado',
        },
        {
          title: 'História',
          route: '/historia',
        },
        {
          title: 'Patrono',
          route: '/patrono',
        },
        {
          title: 'Mentor',
          route: '/mentor',
        },
      ],
    }
  },
}
</script>

<style scoped>
.header {
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--white);
}

@media (min-width: 770px) {
  .header {
    display: flex;
  }
}

.nav-links {
  display: flex;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-item {
  display: inline-block;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--white); /* gray-100 */
  color: var(--primary); /* YouTube red */
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background-color: var(--primary);
  color: #ffffff;
}

.youtube-icon {
  width: 24px;
  height: 24px;
}
</style>
