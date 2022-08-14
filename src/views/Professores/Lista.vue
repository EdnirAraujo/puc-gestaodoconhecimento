<template>
    <section>
        <router-link to="/professores/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo professor</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="professor in professores" :key="professor.id">
                    <td>{{ professor.id }}</td>
                    <td>{{ professor.nome }}</td>
                    <td>
                        <!-- <router-link :to="`/professores/${professor.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                       </router-link> -->
                        <button class="button ml-2 is-danger" @click="excluir(professor.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>

</template>
<script lang="ts">
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';
import { defineComponent } from "vue";
import { OBTER_PROFESSORES,  REMOVER_PROFESSOR } from '@/store/tipo-acoes';


export default defineComponent({
    name: 'Lista-',
    methods: {
        excluir(id: string) {
            this.store.dispatch(REMOVER_PROFESSOR, id)     
            this.store.dispatch(OBTER_PROFESSORES)
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_PROFESSORES)
        return {
            professores: computed(() => store.state.professor.professores),
            store
        }
    }
})
</script>