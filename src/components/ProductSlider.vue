<template>
  <!-- Women Banner Section Begin -->
  <section class="women-banner spad">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mt-5" v-if="product.length > 0">
          <carousel
            class="product-slider"
            :items="3"
            :nav="false"
            :autoplay="true"
            :loop="true"
            :dots="false"
          >
            <div class="product-item" v-for="itemProduct in product" :key="itemProduct.id">
              <div class="pi-pic">
                <img v-bind:src="itemProduct.galleries[0].photo" alt />
                <ul>
                  <li
                    class="w-icon active"
                    @click="saveKeranjang(itemProduct.id, itemProduct.name, itemProduct.price, itemProduct.galleries[0].photo, itemProduct.quantity)"
                  >
                    <a href="#" clas="btn btn-primary">
                      <i class="icon_bag_alt"></i>
                    </a>
                  </li>
                  <li class="quick-view">
                    <router-link v-bind:to="'/product/'+itemProduct.id">+ Quick View</router-link>
                  </li>
                </ul>
              </div>
              <div class="pi-text">
                <div class="catagory-name">{{ itemProduct.type }}</div>
                <router-link v-bind:to="'/product/'+itemProduct.id">
                  <h5>{{ itemProduct.name }}</h5>
                </router-link>
                <div class="product-price">
                  $ {{ itemProduct.price }}
                  <span>$35.00</span>
                </div>
              </div>
            </div>
          </carousel>
        </div>
        <div class="col-lg-12" v-else>
          <p>Produk baru tidak tersedia</p>
        </div>
      </div>
    </div>
  </section>
  <!-- Women Banner Section End -->
</template>

<script>
import carousel from "vue-owl-carousel";
import axios from "axios";

export default {
  name: "ProductSlider",
  components: {
    carousel,
  },
  data() {
    return {
      product: [],
      keranjangUser: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost/shayna/public/api/product")
      .then((res) => (this.product = res.data.data.data))
      .catch((err) => console.log(err));
  },
  methods: {
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
        quantity: quantityProduct,
      };
      this.keranjangUser.push(productStorage);
      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);

      window.location.reload();
    },
  },
};
</script>

<style scoped>
.product-item {
  margin-right: 20px;
}
</style>