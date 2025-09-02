<template>
  <div class="banner-container">
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <img :src="slide.image" :alt="slide.alt" class="banner-image">
        </div>
      </div>
      
      <!-- Setas de navegação -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      
      <!-- Indicadores (bolinhas) -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

export default {
  name: 'BannerCarousel',
  data() {
    return {
      swiper: null,
      slides: [
        {
          image: 'https://res.cloudinary.com/ame-rio/image/upload/v1756676197/aniversario%2030%20anos/Aniversario_Ame_1_hsda0y.png',
          alt: 'Banner 1'
        },
        {
          image: 'https://res.cloudinary.com/ame-rio/image/upload/v1756857082/aniversario%2030%20anos/Aniversario_Ame_2_mmz1fo.png',
          alt: 'Banner 2'
        },
         {
          image: 'https://res.cloudinary.com/ame-rio/image/upload/v1756857087/aniversario%2030%20anos/Aniversario_Ame_3_myf6id.png',
          alt: 'Banner 3'
        }          
      ]
    }
  },
  mounted() {
    this.initSwiper()
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy()
    }
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper(this.$refs.mySwiper, {
        // Configurações básicas
        loop: true,
        autoplay: {
          delay: 10000, // 10 segundos
          disableOnInteraction: false // Continua mesmo após interação
        },
        
        // Navegação com setas
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
                        
        // Efeito de transição
        effect: 'slide',
        speed: 800,
        
        // Responsivo
        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }
      })
    }
  }
}
</script>

<style scoped>
.banner-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.swiper-container {
  width: 100%;
  height: 680px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffffc2;
}

.banner-image {
  width: 100%;
  height: 100%;
  text-align: center;
  object-fit: contain;
  display: block;
}

/* Customização das setas */
.swiper-button-next,
.swiper-button-prev {
  color: #ffffff;
  background: var(--primary);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  transition: all 0.3s ease;
  margin-top: 0;
  top: 50%;
  transform: translateY(-50%);
}

.swiper-button-next {
  right: 10px;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 16px;
  font-weight: bold;
}

/* Customização dos indicadores */
.swiper-pagination {
  bottom: 15px;
}

.swiper-pagination >>> .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid #fff;
  opacity: 1;
  transition: all 0.3s ease;
}

.swiper-pagination >>> .swiper-pagination-bullet-active {
  background: #ffffff;
  transform: scale(1.2);
}

/* Responsividade */
@media (max-width: 768px) {
  .banner-container {
    width: 80vw;
  }  

  .swiper-container {
    height: 350px;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    width: 40px;
    height: 40px;
  }
  
  .swiper-button-next {
    right: 8px;
  }
  
  .swiper-button-prev {
    left: 8px;
  }
  
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .banner-container {
    width: 80vw;
  }  

  .swiper-container {
    height: 450px;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    width: 35px;
    height: 35px;
  }
  
  .swiper-button-next {
    right: 5px;
  }
  
  .swiper-button-prev {
    left: 5px;
  }
  
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 12px;
  }
}
</style>