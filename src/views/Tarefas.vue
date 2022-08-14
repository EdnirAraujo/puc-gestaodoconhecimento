<template>
    <Formulário @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">

        <!-- <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="O que procura?" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div> -->


        <!-- <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" @aoTarefaClicada="selecionarTarefa" /> -->

        <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" />
        <Modal :mostrar="tarefaSelecionada != null">
            <template v-slot:cabecalho>
                <p class="modal-card-title">Editar uma Tarefa</p>

                <span class="icon-text has-text-success">
                    <span class="icon">
                        <i class="fas fa-lg fa-check-square" @click="alterarTarefa"></i>
                    </span>
                </span>
                <span class="icon-text has-text-danger">
                    <span class="icon ">
                        <i class="fas fa-lg fa-ban" @click="fecharModal"></i>
                    </span>
                </span>
            </template>
            <template v-slot:corpo>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa"
                        v-if="tarefaSelecionada != null">
                </div>
            </template>
            <template v-slot:rodape>

            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue';
import BarraLateral from '../components/BarraLateral.vue';
import Formulário from '../components/Formulário.vue';

import Modal from '@/components/Modal.vue';
import Box from '../components/Box.vue';
import Tarefa from '../components/Tarefa.vue';
import { useStore } from '@/store';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROFESSORES, ALTERAR_TAREFA ,} from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';




export default defineComponent({
    name: "App",
    // eslint-disable-next-line vue/no-unused-components
    components: { BarraLateral, Formulário, Tarefa, Box, Modal },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
            this.tarefaSelecionada = null
              //.then(() => this.fecharModal)
        }
    },

    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROFESSORES)

        const filtro = ref('')
        //   const tarefas = computed(() => store.state.tarefa.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)));

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
        }
    }
});
</script>