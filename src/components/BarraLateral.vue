<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <!-- <button class="button" @click="alterarTema">
            {{ textoBotao }}
        </button> -->
        <nav class="panel mt-5">
            <ul>
                <li>
                    <router-link to="/" class="link">
                        <i class="fa-solid fa-list-radio"></i>
                        <i class="fas fa-tasks"></i>
                        Diário Tarefas
                    </router-link>
                </li>
                <li>
                    <router-link to="/professores" class="link">
                        <i class="fa-solid fa-person-chalkboard"></i>
                        Professores
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    data() {
        return {
            modoEscuroAtivo: false
        }
    },
    computed: {
        textoBotao() {
            if (this.modoEscuroAtivo) {
                return 'Desativar modo escuro'
            }
            return 'Ativar modo escuro'
        }
    },
    methods: {
        alterarTema() {
            this.modoEscuroAtivo = !this.modoEscuroAtivo
            this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
        }
    }
})
</script>
<style scoped>
header {
    background: rgba(39, 5, 78, 0.747);
    padding: 1rem;
    width: 100%;
    height: 100vh;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

.panel li {
    margin: 8px 0;
}

.link {
    color: #fff;
}

.link:hover {
    color: #0a0a0a;
}

.link.router-link-active {
    color: #020202;
    font-size:xx-large
}
</style>
