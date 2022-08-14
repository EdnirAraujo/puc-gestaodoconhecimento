<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempo-em-segundos="tempoEmSegundos" />
        <button class="button" @click="iniciar" :disabled="cronometroRodado">
            <span class="icon">
                <i class="fa-solid fa-hourglass-start"></i>
            </span>
            <span>Inicio </span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroRodado">
            <span class="icon">
                <i class="fa-solid fa-flag-checkered"></i>
            </span>
            <span>Fim</span>
        </button>
    </div>
</template> 

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Temporizador',
    emits:['aoTemporizadorFinalizado'],
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodado: false
        };
    },
    methods: {
        iniciar() {
            this.cronometroRodado = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
            }, 1000);
        },
        finalizar() {
            this.cronometroRodado = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado',this.tempoEmSegundos)
            this.tempoEmSegundos =0
            this.$router.go(0)
        }
    },
    components: { Cronometro }
})

</script> 