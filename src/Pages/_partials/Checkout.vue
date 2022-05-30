<template>
    <div>

        <div class=" text-light" style="margin: 5px">
                    Preço Total: <b>R${{totalCart | formatprice}}</b>
        </div>
        <a href="" class="btn btn-success " @click.prevent="openModalCheckout">Finalizar</a>

        <modal name='checkout'>
            <div class="px-md 5my-4" v-if="loading">               
                <p>Gerando pedido... (Porfavor aguarde!)</p>
            </div>
            <div class="px-md-5 my-4" v-else>
                <div class="col-12" v-if="me.name !== '' ">
                    <p><strong>Total do produto</strong>{{products.length}}</p>
                    <p><strong>Preço total:</strong>R${{totalCart | formatprice }}</p>
                    <p v-if="company.table.identify">
                    <strong>Mesa:</strong>{{company.table.name}}
                    </p>
                    <div class="form-group">                        
                        <textarea name="comment" v-model="comment" class="form-control" id="" cols="30" rows="2" placeholder="Comentário"></textarea>                    
                    </div>
                    <button class="btn btn-success btn-full" @click.prevent="createOrder">Fazer pedido</button>
                </div>

                <div v-else class="row">
                   <div class="col-6">
                        <p><strong>Total do produto</strong>{{products.length}}</p>
                        <p><strong>Preço total:</strong>R${{totalCart | formatprice}}</p>
                        <p v-if="company.table.identify">
                        <strong>Mesa:</strong>{{company.table.name}}
                        </p>
                        <div class="form-group">                        
                            <textarea name="comment" v-model="comment" class="form-control" id="" cols="30" rows="2" placeholder="Comentário"></textarea>                    
                        </div>
                        <br>
                        <button class="btn btn-info btn-full" @click.prevent="createOrder">Fazer pedido de forma anonima</button> 
                   </div>
                   <div class="col-6">
                       <router-link :to="{name:'login'}" class="btn btn-primary btn-full">
                           Fazer login
                       </router-link>
                   </div>
                </div>


            </div>

        </modal>

    </div>
    
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    computed: {
        ...mapState({
            products: state => state.cart.products,
            me: state => state.auth.me,
            company: state => state.companies.companySelected   
        }),

        totalCart () {
            let total = 0 

            this.products.map((itemCart,index) => {
                total += itemCart.qty * itemCart.product.price
            })

            return total
        },
       
    },

    data(){
        return{
            comment:'',
            loading:false
        }
    },

    methods:{
        ...mapActions([
            'createOrder',
            'createOrderAutheticated'
        ]),

        createOrder(){
            this.loading = true
            const action = this.me.name === '' ? 'createOrder' : 'createOrderAutheticated'

            let params = {
                token_company:this.company.uuid,
                comment: this.comment,
                products: [
                    ...this.products
                ]                
            }

            if (this.company.table.identify){
                params.table = this.company.table.identify
            }

            this.$store.dispatch(action,params)
                        .then(order =>{
                            this.$vToastify.success('Pedido realizado com sucesso','Obrigado pela compra é um prazer ter você como parceiro')        
                            this.$router.push({                               
                            name:'order.detail',
                            params:{

                            identify: order.identify

                            }
                            
                            })   
                        })
                         .catch(error =>{
                             this.$vToastify.error('Pedido não realizado ','Error')
                            
                        })
                        .finally(()=> this.loading = false)
        },
        
         openModalCheckout (){
            this.$modal.show('checkout')
        },
        closeModalCheckout (){
            this.$modal.hide('checkout')
        },
    }
}
</script>