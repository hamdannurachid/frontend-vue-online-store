<template>
  <div class="about">
    <h1>This is an profile page HAHAH</h1>
    <p> Halo nama saya {{ title }} - {{ desc }} </p>

    <h1>Tugas Hari ini</h1>

   <p v-for="tugasSaya in tugas" v-bind:key="tugasSaya.id">
       {{ tugasSaya.namaTugas }}
   </p>

  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'

export default {
    name: 'profile',
    data: function() {
        return {
            title: 'Hamdan Nurachid',
            desc: 'ini adalah produk momen pearson',

            tugas: [
                {
                    id:1,
                    namaTugas: 'membaca buku'
                },
                {
                    id:2,
                    namaTugas: 'ngoding'
                },
                {
                    id:3,
                    namaTugas: 'membaca koran'
                }
            ]
        }
    },
    components: {
        
    }
}
</script>