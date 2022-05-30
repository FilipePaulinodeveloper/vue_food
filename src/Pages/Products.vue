<template>
  <div>
        <div class="row">

      <div class="col-lg-3">

        <h1 class="my-4 title-tenant">{{ company.name }} <p><a href="#" @click.prevent="removeCompanySelected">(Voltar para o Lojas)</a></p></h1>
        <h2 v-if="company.table.identify">
          Mesa: {{company.table.name}}
          <a href="#" @click.prevent="removeTableCompany">(x)</a>
        </h2>
        <div class="list-group">
          <a href="#"
         :class="['list-group-item', categoryInFilter('')] "
          @click.prevent="filterByCategory('')"
          
          >
          Todas as Categorias
          </a>
          <a href="#" 
          v-for="(category,index) in categories.data" :key='index'
         :class="['list-group-item', categoryInFilter(category.identify)] "
          @click.prevent="filterByCategory(category.identify)"
         >
              {{category.name}}
          </a>
          
        </div>

      </div>
      <!-- /.col-lg-3 --> 

      <div class="col-lg-9">

        <div class="row my-4">

            <div v-if="company.products.data.length === 0">
                Nenhum produto encontrado
            </div>

            <div class="col-lg-4 col-md-6 mb-4" v-for="(product,index) in company.products.data" :key="index" >
            <div :class="['card', 'h-100', {'disabled' : productInCart(product)}]">
            
              <a href="#">
                <img 
                v-if="company.logo"
                class="card-img-top" 
                :src="product.image" 
                :alt="product.name">
              
                <img 
                v-else
                class="card-img-top" 
                src="@/assets/imgs/lanches.png" 
                :alt="product.name">
              
              </a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">{{product.title}}</a>
                </h4>
                <h5>R${{product.price | formatprice}}</h5>
                <p class="card-text">{{product.descripition}}</p> 
              </div>
              <div 
              class='card-footer card-footer-custom'>               
              <a href=""
              @click.prevent=''
              v-if= "productInCart(product)"
              > 
              Adicionado ao Carrinho <i class="fa fa-cart-plus"></i>
                </a> 

              <a href="#" 
              v-else
              @click.prevent="addProdCart(product)"
              > 
              Adicionar no Carrinho <i class="fa fa-cart-plus"></i>
              </a>  

                                         
              </div>

            </div>
          </div>


        </div>          
        <!-- /.row -->
      </div>
      <!-- /.col-lg-9 -->
    </div>
    <!-- /.row -->
  </div>
</template>

<script>

import {mapActions, mapMutations, mapState,} from 'vuex'
export default {
  props:['companyFlag'],

 created(){
      if(this.company.name === ''){
        
        return this.$router.push({name:'home'})
        
      } 
       this.getCategoriesByCompany(this.company.uuid)
       .catch(response => this.$vToastify.error('Falha ao Carregar as Categorias', 'Erro'))      

      // this.getProductsByCompany(this.company.uuid)
      //      .catch(response => this.$vToastify.error('Falha ao Carregar os Produtos', 'Erro'))      


      this.loadProducts()

    },

    computed: {
      ...mapState({
        company: state => state.companies.companySelected,
        categories: state => state.companies.categoriesCompanySelected,
        // companies: state => state.companies.productsSelected,
        productsCart: state => state.cart.products
        
        
      }),
    },

    data () {
      return{
        filters:{
          category: ''
        }
      }
    },

    methods:{
      
        ...mapActions([
          'getCategoriesByCompany',
          'getProductsByCompany'

          ]),

          ...mapMutations({
            addProdCart: 'ADD_PRODUCT_CART',
            removeTableCompany:'REMOVE_TABLE_COMPANY',
            removeCompany:'REMOVE_COMPANY_SELECTED'

          }),

         loadProducts () {          
           
         const params = {
            token_company: this.company.uuid,
         }
          if (this.filters.category) {
            params.categories = [
              this.filters.category
            ]          
          }
            
        this.getProductsByCompany(params)
       .catch(response => this.$vToastify.error('Falha ao Carregar as Produtos', 'Erro'))  


       },

      filterByCategory (identify) {
        this.filters.category = identify

        this.loadProducts()
      },
      
      categoryInFilter (identify) {
        return identify === this.filters.category ? 'active' : ''
      }, 
                   

      productInCart(product) {
        let inCart = false 

        this.productsCart.map((prodCart, index) =>{
          if ( prodCart.identify === product.identify) 
          inCart = true
        })

        return  inCart 
      },

      removeCompanySelected (){
        this.removeCompany()
        this.$router.push({name:'home'})
      }

     

      // inCart(product){
      //   console.log( this.productsCart.indexOf(product) != -1)
      // }


    },



}
</script>

<style>

</style>