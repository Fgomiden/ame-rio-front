<template>
  <div class="footer-1">
    <div class="width-footer">
      <div class="md-flex-row">
        <div class="description">
          <div class="divLogo">
            <NuxtLink to="/">
              <img
                class="logo"
                src="/ame-rio-logo.svg"
                alt="Logo da AME-Rio"
              />
            </NuxtLink>
          </div>
          <div class="mx-auto p-3 padding-text">
            <p class="text-justify text-md">
              A Associação Médico-Espírita do Estado do Rio de Janeiro (AME-RIO)
              estuda a Doutrina Espírita codificada por Allan Kardec e sua
              fenomenologia, tendo em vista suas relações, integração e
              aplicação nos campos da filosofia, da religião e da ciência, e em
              particular da medicina, procurando fundamentá-las através da
              criação e realização de estudos e experiências orientadas nesta
              direção.
            </p>
          </div>
        </div>
        <div class="contact-social">
          <!-- Contato Section -->
          <div class="contact-section">
            <h4 class="section-title">Contato</h4>
            <ul class="contact-list">
              <li class="contact-item">
                <a
                  href="mailto:associacaomedicoespiritarj@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enviar email para AME-Rio"
                  class="contact-link"
                >
                  <span class="contact-icon">
                    <svg
                      aria-hidden="true"
                      class="e-font-icon-svg e-far-envelope"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
                      />
                    </svg>
                  </span>
                  <span class="contact-text"
                    >associacaomedicoespiritarj@gmail.com</span
                  >
                </a>
              </li>
              <li class="contact-item">
                <a
                  href="https://maps.app.goo.gl/gBB9hqJCPdFYZhz4A"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver endereço da AME-Rio no Google Maps"
                  class="contact-link"
                >
                  <span class="contact-icon">
                    <svg
                      aria-hidden="true"
                      class="e-font-icon-svg e-fas-map-marker-alt"
                      viewBox="0 0 384 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                      />
                    </svg>
                  </span>
                  <span class="contact-text"
                    >Rua Santa Alexandrina, 667, Rio Comprido - Rio de Janeiro,
                    RJ</span
                  >
                </a>
              </li>
            </ul>
          </div>
          <!-- Social Media Section -->
          <div class="social-section">
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
          </div>
        </div>
      </div>
      <!-- Copyright Section -->
      <div class="footer-2">
        <p class="text-base leading-6 text-gray-600 text-center">
          © {{ new Date().getFullYear() }} AME-Rio - Associação Médico Espírita
          do Estado do Rio de Janeiro.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-1 {
  background-color: var(--white);
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
}

.description {
  display: flex;
  flex-direction: column;
  flex: 0.5;
}

.divLogo {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo {
  width: 120px;
  height: auto;
  max-width: 100%;
}

@media (min-width: 640px) {
  .logo {
    width: 150px;
  }
}

@media (min-width: 1024px) {
  .logo {
    width: 180px;
  }
}

.contact-social {
  display: flex;
  flex: 0.5;
  flex-direction: column;
  justify-content: end;
}

@media (min-width: 640px) {
  .footer-1 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .footer-1 {
    padding-top: 1rem;
    padding-bottom: 4rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.width-footer {
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .width-footer {
    max-width: 80rem;
  }
}

.footer-2 {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}
.contact-section {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem; /* text-xl */
  font-weight: 600;
  color: #1f2937; /* gray-800 */
  margin-bottom: 1rem;
}

.contact-list {
  list-style: none;
  margin-left: 2rem;
}

.contact-item {
  margin-bottom: 0.75rem;
}

.contact-link {
  display: flex;
  text-decoration: none;
  color: var(--gray-600); /* gray-600 */
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #1f2937; /* gray-800 */
}

.contact-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  fill: #4b5563; /* gray-600 */
}

.contact-text {
  font-size: 1rem;
  text-align: left;
}

/* Social Media Section Styles */
.social-section {
  text-align: center;
  margin-bottom: 2rem;
}

.social-icons {
  display: flex;
  justify-content: center;
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
  background-color: var(--white);
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
