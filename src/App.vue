<template>
   <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
      <div class="column is-one-quarter">
         <BarraLateral @aoTemaAlterado="trocarTema" />
      </div>
      <div class="column is-three-quarter conteudo">
         <Notificacoes />
         <router-view></router-view>
      </div>
   </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';


export default defineComponent({
   name: "App",
   // eslint-disable-next-line vue/no-unused-components
   components: { BarraLateral, Notificacoes },
   data() {
      return {
         modoEscuroAtivo: false
      }
   },
   methods: {
      trocarTema(modoEscuroAtivo: boolean): void {
         this.modoEscuroAtivo = modoEscuroAtivo
      }
   }
});
</script>

<style>
.lista {
   padding: 1.25rem;
}

main {
   --bg-primario: white;
   --texto-primario: black;
}

main.modo-escuro {
   --bg-primario: rgb(80, 75, 75);
   --texto-primario: rgb(228, 225, 225);
}

.conteudo {
   background-color: var(--bg-primario);
}
</style> 