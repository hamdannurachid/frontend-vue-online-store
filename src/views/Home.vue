<template>
  <div class="home">
    <Header/>
    <Hero/>
    <ProductSlider/>
    <Instagram/>
    <Partner/>
    <Footer/>


  </div>
</template>


<script>

import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import ProductSlider from "@/components/ProductSlider.vue";
import Instagram from "@/components/Instagram.vue";
import Partner from "@/components/Partner.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'Home',
  components: {
    Header, 
    Hero,
    ProductSlider,
    Instagram,
    Partner,
    Footer,
  }
}
</script>

