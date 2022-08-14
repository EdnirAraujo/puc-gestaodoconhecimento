<template>
    <div class="box">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual a tarefa você deseja iniciar?" v-model="descricao" />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProfessor">
                        <option value="">Selecione o Professor</option>
                        <option :value="professor.id" v-for="professor in professores" :key="professor.nome"         >
                            {{ professor.nome }}   
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex'
import { key } from '@/store';
import IProfessor from '@/interfaces/IProfessor';



export default defineComponent({
    methods: {
        
        chama(){
            alert('professor')      
    }
    
    },

    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Formulário',
    emits: ['aoSalvarTarefa'],
    components: { Temporizador },
    setup(props, { emit }) {

        const store = useStore(key)
        const descricao = ref("")
        const idProfessor = ref("")        
        const professores  = computed(() => store.state.professor.professores)//objeto >>value> tagert>>CHEGO
        
        const constObj = { id: 'idprofessor', nome: 'nomeprofessor'} as IProfessor;

        const professor = ref("") 
       

        const finalizarTarefa = (tempoDecorrido: number): void => {
            emit('aoSalvarTarefa', {



                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                professor: constObj




                //professor: professores.value.values.bind(idProfessor.value)
                //idProfessor.value

//store.state.professor.professores. find--->Tra proxy

        // const store = useStore(key)
        // const descricao = ref("")
        // const idProfessor = ref("")
        // const professores = computed(() => store.state.professor.professores)

        // const finalizarTarefa = (tempoDecorrido: number): void => {
        //     emit('aoSalvarTarefa', {
        //         duracaoEmSegundos: tempoDecorrido,
        //         descricao: descricao.value,
        //         professor: professores.value.find(p => p.id == idProfessor.value)


            })
            descricao.value = ''
        }
        return {
            descricao,
            idProfessor,
            finalizarTarefa,
            professores,
            professor
        }
    }
})

</script>
<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>