<template>
  <div class="product">
    <Header />
    <Breadcrumb />

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-6">
                <div class="product-pic-zoom">
                  <img class="product-big-img" :src="images" alt />
                </div>
                <div class="product-thumbs" v-if="productDetails.galleries.length > 0">
                  <carousel class="product-thumbs-track ps-slider" :dots="false" :nav="false">
                    <div
                      v-for="ss in productDetails.galleries"
                      :key="ss.id"
                      class="pt"
                      @click="changeImage(ss.photo)"
                      :class="ss.photo == images ? 'active' : ''"
                    >
                      <img :src="ss.photo" alt />
                    </div>
                  </carousel>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="product-details">
                  <div class="pd-title">
                    <span>{{productDetails.type}}</span>
                    <h3>{{productDetails.name}}</h3>
                  </div>
                  <div class="pd-desc">
                    <p v-html="productDetails.description"></p>
                    <h4>Rp. {{productDetails.price}}</h4>
                  </div>
                  <div class="quantity">
                    <router-link to="/cart">
                      <a
                        @click="saveKeranjang(productDetails.id, productDetails.name, productDetails.price, productDetails.galleries[0].photo, productDetails.quantity)"
                        href="#"
                        class="primary-btn pd-cart"
                      >Add To Cart</a>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Shop Section End -->

    <Related />
    <Footer />
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";
import Related from "@/components/Related.vue";
import carousel from "vue-owl-carousel";
import axios from "axios";

export default {
  name: "Product",
  components: {
    Header,
    Breadcrumb,
    carousel,
    Related,
    Footer
  },
  data() {
    return {
      images: "",
      //   idProduct: this.$route.params.slug
      productDetails: [],
      keranjangUser: []
    };
  },
  methods: {
    changeImage(urlImage) {
      this.images = urlImage;
      //   eslint-disable-next-line no-console
      //   console.log(this.idProduct);
    },
    setDataPicture(data) {
      this.productDetails = data;
      this.images = data.galleries[0].photo;
    },
    saveKeranjang(
      idProduct,
      nameProduct,
      priceProduct,
      photoProduct,
      quantityProduct
    ) {
      var productStorage = {
        id: idProduct,
        name: nameProduct,
        price: priceProduct,
        photo: photoProduct,
        quantity: quantityProduct
      };
      this.keranjangUser.push(productStorage);
      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);
    }
  },
  mounted() {
    if (localStorage.getItem("keranjangUser")) {
      try {
        this.keranjangUser = JSON.parse(localStorage.getItem("keranjangUser"));
      } catch (e) {
        localStorage.removeItem("keranjangUser");
      }
    }

    axios
      .get("http://localhost/shayna/public/api/product", {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => this.setDataPicture(res.data.data))
      .catch(err => console.log(err));
  }
};
</script>

<style>
.product-thumbs .pt {
  margin-right: 15px;
}
</style>
