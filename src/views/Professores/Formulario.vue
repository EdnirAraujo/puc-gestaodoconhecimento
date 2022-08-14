<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProfessor" class="label">
                    Nome do Novo Professor
                </label>
                <input type="text" class="input" v-model="nomeDoProfessor" id="nomeDoProfessor">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>

</template>
<script lang="ts">
import { useStore } from '@/store';
import { defineComponent, ref } from "vue";
import { TipoNotificao } from '@/interfaces/INotificao';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROFESSOR, CADASTRAR_PROFESSOR } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Formulario-',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const router = useRouter()
        const store = useStore()
        const { notificar } = useNotificador()
        const nomeDoProfessor = ref("")

        if (props.id) {
            const professor = store.state.professor.professores.find(p => p.id == props.id)
            nomeDoProfessor.value = professor?.nome || ''
        }
        const lidarComSucesso = () => {
            nomeDoProfessor.value = ''
            notificar(TipoNotificao.SUCESSO, 'Excelente', 'Professor cadastrado com Sucesso!')
            router.push('/professores')
        }
        const salvar =() => {
            if (props.id) {
                store.dispatch(ALTERAR_PROFESSOR, {
                    id: props.id,
                    nome: nomeDoProfessor.value
                }).then(() => lidarComSucesso())
            } else {
                store.dispatch(CADASTRAR_PROFESSOR, nomeDoProfessor.value)
                    .then(() => lidarComSucesso())
            }
        }
        return {
            nomeDoProfessor,
            salvar
        }
    }
})
</script>