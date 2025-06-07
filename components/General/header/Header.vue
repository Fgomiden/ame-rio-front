<template>
  <header class="topHeader">
    <div class="bg-white">
      <div class="flex justify-between items-center py-6 container">
        <div class="divLogo">
          <NuxtLink to="/">
            <img
              class="logo"
              src="/ame-rio-logo.svg"
              alt="Website Logo"
            />
          </NuxtLink>
        </div>

        <div class="divMobileButton">
          <button
            @click="toggleNav"
            aria-label="Mobile Menu Button"
            type="button"
            class="mobile-button"
          >
            <svg
              class="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <DesktopHeader />
      </div>
    </div>

    <transition name="fade">
      <div
        v-show="navOpen"
        class="mobile-menu"
      >
        <div class="rounded-lg shadow-lg">
          <div class="rounded-lg bg-white">
            <div class="header-space">
              <div class="flex items-center justify-between">
                <div>
                  <img
                    class="logo-mobile"
                    src="/ame-rio-logo.svg"
                    alt="Website Logo"
                  />
                </div>
                <div class="-mr-2">
                  <button
                    @click="toggleNav"
                    type="button"
                    aria-label="Close Mobile Menu"
                    class="mobile-button"
                  >
                    <svg
                      class="icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <MobileHeader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  watch: {
    $route() {
      this.navOpen = false;
    },
  },
  data: () => {
    return {
      navOpen: false,
    };
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
  },
};
</script>

<style scoped>
.topHeader{
  position: sticky;
  top: 0;
  z-index: 50;
}

.divLogo {
  @media (min-width: 770px) {
    width: 0;
    flex: 1 1 0%;
  }
}

.logo {
  height: 32px;
  width: auto;
}

.icon {
  width: 24px; 
  height: 24px; 
}

.divMobileButton {
  margin-top: -0.5rem; /* -8px */
  margin-bottom: -0.5rem; /* -8px */
}

@media (min-width: 770px) {
  .divMobileButton {
    display: none;
  }
}

.mobile-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  background-color: #fff; 
}

.mobile-button:hover {
  color: #6b7280; 
}

.mobile-button:focus {
  outline: none; 
  border: none;
  background-color: #f3f4f6; 
}

.mobile-menu {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px;
  transform-origin: top right;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

  @media (min-width: 1024px) {
    display: none;
  }
}

.logo-mobile {
  height: 32px;
  width: auto;
}

.header-space{
  padding-top: 1.25rem; /* 20px */
  padding-bottom: 1.5rem; /* 24px */
  padding-left: 1.25rem; /* 20px */
  padding-right: 1.25rem; /* 20px */
}

.header-space > :not(:last-child) {
  margin-bottom: 1.5rem; /* 24px */
}

/* Transição para o menu mobile */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Media Queries específicas */
@media (min-width: 640px) {
  .logo {
    height: 48px; /* sm:h-12 */
  }
}
</style>
