<template>
  <q-page class="flex flex-center">
    <div class="column flex flex-center">
      <h5 v-show="global.state.user.autentificat">{{numeclinica}}</h5>
      <img
        v-show="global.state.user.autentificat"
        alt="Programare online "
        :src="urlsigla"
        style="width: 200px; height: 200px"
      >
    </div>

  </q-page>
</template>

<script>
import { defineComponent,ref,inject } from 'vue';
import { useRoute } from "vue-router";
export default defineComponent({
  name: 'PageIndex',
  setup(){
    const global=inject('global');
    const bus=inject('bus');
    console.log('INDEX')
    const route = useRoute()
    console.log('Ruta este...',route.params.slug)
    bus.emit('ruta-stabilita',route.params.slug)
    const numeclinica=ref(global.state.user.clinica.denumire)
    const urlsigla=ref(process.env.host+global.state.user.clinica.fisiersigla)
    
    bus.on('succes-autentificare',(user,clinica)=>{
      console.log('Receptionat succes autentificare',user,clinica,global.state.user.autentificat)
      numeclinica.value=clinica.denumire
      urlsigla.value=process.env.host+clinica.fisiersigla
    })

    return {
      global,
      numeclinica,
      urlsigla
    }
  }
})
</script>
