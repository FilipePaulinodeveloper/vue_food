<template>
  <div>
      <div class="row my-4">
      <h1 class="title-tenant">Detalhes do Pedido <strong>{{identify}}</strong></h1>
    </div>

    <div class="row my-4">
      <div class="col-sm-12">
        <ul>
          <li>Número: {{identify}}</li>
          <li>Total: {{order.total | formatprice}}</li>
          <li>Data: {{order.date | dataformat}}</li>
          <li>Status: <span class="badge bg-success">{{order.status}}</span></li>
          <li>
            Mesa:
            <ul>
              <li v-if="order.table.identify">Identificador: {{order.table.identify}}</li>
              <li>Descrição: {{order.table.description}}</li>
            </ul>
          </li>
          <li>
            Cliente:
            <ul v-if="order.client.name">
              <li>Nome:{{order.client.name}}</li>
              <li>E-mail: {{order.client.email}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div> <!-- details order -->

    <hr>

    <div class="row my-4">
      <div class="col-12">
        <h4>Produtos</h4>
      </div>

        <div class="col-6 my-1" v-for="(product,index) in order.products" :key="index">
          <div class="restaurant-card">
            <a href="#">
            <img class="card-img-top" :src="product.image" :alt="product.title"></a>
            <div class="restaurant-card-body">
              <h5>{{product.title}}</h5>
            </div>
          </div>
        </div>


    </div>
    <!-- products order -->

    <hr>
    <button class="btn btn-success"
    v-if="me.name != '' && me.name === order.client.name && order.evaluations.length === 0"
    @click.prevent="openModalEvaluation">
      Avaliar o pedido
    </button>

    <modal name="evaluation-order" :heigth="350">
      <div class="px-md-5 my-4">
        <h1>Avaliar o pedido {{identify}}</h1>
        <strong>Nota: </strong>
        <vue-stars
        name="evaluation"
        :active-color="'#ffdd00'"
        :inactive-color="'#b5b5b5'"
        :shadow-color="'#ffff00'"
        :hover-color="'#dddd00'"
        :max="5"
        :value="3"
        :readonly="false"
        :char="'★'"
        :inactive-char="''"
        :class="''"
        v-model="evaluation.stars"
        />
        
        <div class="form-group">
        <textarea v-model="evaluation.comment" class="form-control" name="comment" id="" cols="30" rows="3" placeholder="Comentário (Opcional)"></textarea>
        </div>
        <button class="btn btn-info" 
        @click.prevent="sendEvaluation"
        :disabled="loadSendEvaluation"
        >
        <span v-if="loadSendEvaluation">Enviando.......</span>
        <span v-else>Avaliar</span>

        </button>
      </div>
    </modal>
    <div class="evaluations-order col-12" v-if="order.evaluations.length">
      <div v-for="(evaluation,index) in order.evaluations" :key="index">
        <p><strong>Nome:</strong>{{evaluation.client.name}}</p>
        <p><strong>Comentario:</strong>{{evaluation.comment}}</p>
        <p><strong>Nota</strong>
        <vue-stars
        name="evaluation"
        :active-color="'#ffdd00'"
        :inactive-color="'#b5b5b5'"
        :shadow-color="'#ffff00'"
        :hover-color="'#dddd00'"
        :max="5"        
        :readonly="true"
        :char="'★'"
        :inactive-char="''"
        :class="''"
        :value="evaluation.stars"
        />
        
        </p>

      </div>

    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    
    props: ['identify'],

    computed:{
      ...mapState({
        me: state => state.auth.me
      }),
    },
    
    created (){
     this.getOrderByIdentify(this.identify) 
            .then(response =>this.order = Object.assign(this.order,response.data.data))

            .catch(_=>{

                this.$vToastify.error('Falha ao carregar detalhes do pedido', 'Erro')

                this.$router.push({name: 'home'})
            })
    },
    data() {

        return {
            order:{
               identify: '' ,
               date: '',
               status: '',
               total: '',
               table:{
                   identify:'',
                   description:'',
               },
               client: {
                   name: '',
                   email: '',

               },
               company:{
                   name:'',
                   image:'',
               },
               product:[],
               evaluations:[],
            },
            evaluation:{
              stars: 3,
              comment:''
            },
            loadSendEvaluation: false,
        }

    },
    methods:{
        ...mapActions([
            'getOrderByIdentify',
            'evaluationOrder'
        ]),
        openModalEvaluation (){
          this.$modal.show('evaluation-order')
        },
        closeModalEvaluation (){
          this.$modal.hide('evaluation-order')
        },

        sendEvaluation (){
          this.loadSendEvaluation = true
          const params ={
            identify: this.identify,
            ...this.evaluation
          }

          this.evaluationOrder(params)
                .then(response =>{
                  this.$vToastify.success('Avaliação enviada com sucesso', 'Parabéns')
                  this.order.evaluations.push(response.data.data)
                  this.closeModalEvaluation()
                })

               .catch(error => this.$vToastify.error('Falha ao Enviar as Avaliação', 'Erro')) 
               .finally(() => this.loadSendEvaluation = false)
        } 

    }
}
</script>

<style>

</style>