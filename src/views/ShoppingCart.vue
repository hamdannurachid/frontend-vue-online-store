<template>
  <div class="shopping">
    <Header />
    <Breadcrumb />
    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th class="p-name text-center">Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="keranjangUser.length > 0">
                      <tr v-for="keranjang in keranjangUser" :key="keranjang.id">
                        <td class="cart-pic first-row">
                          <img class="img-keranjang" :src="keranjang.photo" />
                        </td>
                        <td class="cart-title first-row text-center">
                          <h5>{{keranjang.name}}</h5>
                        </td>
                        <td class="p-price first-row">Rp. {{keranjang.price}}</td>
                        <td @click="removeItem(keranjang.id)">
                          <i class="ti-close"></i>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4">Keranjang Kosong</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-8">
                <h4 class="mb-4">Informasi Pembeli:</h4>
                <div class="user-checkout">
                  <form>
                    <div class="form-group">
                      <label for="namaLengkap">Nama lengkap</label>
                      <input
                        type="text"
                        class="form-control"
                        id="namaLengkap"
                        aria-describedby="namaHelp"
                        placeholder="Masukan Nama"
                        v-model="customerInfo.name"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Masukan Email"
                        v-model="customerInfo.email"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">No. HP</label>
                      <input
                        type="number"
                        class="form-control"
                        id="noHP"
                        aria-describedby="noHPHelp"
                        placeholder="Masukan No. HP"
                        v-model="customerInfo.number"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Alamat Lengkap</label>
                      <textarea
                        class="form-control"
                        id="alamatLengkap"
                        rows="3"
                        v-model="customerInfo.address"
                        required
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout">
                  <ul>
                    <li class="subtotal">
                      ID Transaction
                      <span>#SH12000</span>
                    </li>
                    <li class="subtotal mt-3">
                      Subtotal
                      <span>Rp. {{totalHarga}}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Pajak
                      <small>10%</small>
                      <span>Rp. {{addPajak}}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Total Biaya
                      <span>Rp. {{totalBiaya}}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Bank Transfer
                      <span>Mandiri</span>
                    </li>
                    <li class="subtotal mt-3">
                      No. Rekening
                      <span>2208 1996 1403</span>
                    </li>
                    <li class="subtotal mt-3">
                      Nama Penerima
                      <span>Shayna</span>
                    </li>
                  </ul>
                  <!-- <router-link to="/success" class="proceed-btn">I ALREADY PAID</router-link> -->
                  <a @click="checkout()" href="#" class="proceed-btn">I ALREADY PAID</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import axios from "axios";

export default {
  name: "ShoppingCart",
  components: {
    Header,
    Breadcrumb,
    Footer
  },
  data() {
    return {
      keranjangUser: [],
      customerInfo: {
        name: "",
        email: "",
        number: "",
        address: ""
      }
    };
  },
  methods: {
    removeItem(idx) {
      let keranjangUserStorage = JSON.parse(
        localStorage.getItem("keranjangUser")
      );
      let itemKeranjangUserStorage = keranjangUserStorage.map(
        itemKeranjangUserStorage => itemKeranjangUserStorage.id
      );
      let index = itemKeranjangUserStorage.findIndex(id => id == idx);
      this.keranjangUser.splice(index, 1);
      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);
      window.location.reload();
    },

    checkout() {
      let productIds = this.keranjangUser.map(function(product) {
        return product.id;
      });

      let checkoutData = {
        name: this.customerInfo.name,
        email: this.customerInfo.email,
        number: this.customerInfo.number,
        address: this.customerInfo.address,
        transaction_total: this.totalBiaya,
        transaction_status: "PENDING",
        transaction_details: productIds
      };

      axios
        .post("http://localhost/shayna/public/api/checkout", checkoutData)
        .then(() => this.$router.push("success"))
        .catch(err => console.log(err));
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
  },
  computed: {
    totalHarga() {
      return this.keranjangUser.reduce(function(items, data) {
        return items + data.price;
      }, 0);
    },
    addPajak() {
      return (this.totalHarga * 10) / 100;
    },
    totalBiaya() {
      return this.totalHarga + this.addPajak;
    }
  }
};
</script>

<style scoped>
.img-keranjang {
  width: 75px;
  height: 75px;
}
</style>