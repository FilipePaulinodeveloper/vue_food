<template>
    <div>
        <!-- Page Content -->
        <div class="container container-body">
            <router-view></router-view>
        </div>
        <!-- tudo que tiver na barra de loguin é registro -->
    </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
export default {
  
}
</script>


<style scoped>
@import url('@/assets/css/auth.css');
@import url('@/assets/css/reset.css');
</style>