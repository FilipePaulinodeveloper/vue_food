<template>
  <div>
    <preloader-component></preloader-component>
    <header-Component/>

<!-- Page Content -->
  <div class="container container-body">
    <router-view></router-view>
  </div>


    <footer-Component/>

  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderComponent from "./Partes/Header.vue"
import FooterComponent from "./Partes/Footer.vue"

export default {
  components:{
    HeaderComponent,
    FooterComponent,

  }
}
</script>
   

<style scoped>

@import url('../assets/css/vuefood.css');
@import url('../assets/css/reset.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

</style>