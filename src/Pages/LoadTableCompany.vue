<template>
    <div class="my-4 text-center">
        <h1 class="my-4 title-tenant">Carregando Dados</h1>
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
    props:['token_company', 'token_table'],

    ...mapState({

        company: state => state.companies.companySelected,
    }),

    created (){
        this.getCompanyByToken(this.token_company)
        .then(response =>{
            const params = {table: this.token_table, token_company:this.token_company}

            this.getTableFromCompany(params)
            .then(response =>this.$vToastify.success('Loja carregada com sucesso', 'Encotrou'))
            .catch(response =>this.$vToastify.error('Falha a empresa', 'Erro'))             
            .finally(()=> this.$router.push({name: 'products' , params:{companyFlag: this.flag }}))

        })


             .catch(response => {
                    this.$vToastify.error('Falha ao Carregar a empresa', 'Erro')

                    this.$router.push({name: 'home'})

                 }) 
    },
    methods:{
        ...mapActions([
            'getCompanyByToken',
            'getTableFromCompany'
        ]),
    }
}


</script>