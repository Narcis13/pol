<template>
        <q-banner v-if="!solicitarevalida" dense inline-actions class="text-white bg-red">
          Ne pare rau! Solicitare invalida!
          <template v-slot:action>
            <q-btn flat color="white" label="Solicita programare online" />
          </template>
         </q-banner>

      <q-item v-if="solicitarevalida" class="q-mt-md">
      <q-item-section side>
        <q-avatar rounded size="64px">
          <img src="~assets/doctor.jpeg" />
      
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{state.solicitare.nume}}</q-item-label>
        <q-item-label caption>{{state.solicitare.email}}</q-item-label>
      </q-item-section>
      <q-item-section side>
       {{state.solicitare.denumire}}
      </q-item-section>
    </q-item>

</template>

<script>
import { defineComponent ,reactive,onMounted,ref} from 'vue';
import { useRoute } from "vue-router";
import axios from 'axios'

const state = reactive({
  solicitare:{}
})
export default defineComponent({
  name: 'Programare',
  setup(){
    let solicitarevalida=ref(true)
    const route =useRoute()
    console.log('Ruta este...',route.params.token)
    onMounted(()=>{
              axios.get(process.env.host+`solicitari/${route.params.token}`).then(

                  res => {
                  console.log('Raspuns la o solicitare',res);
                  if(res.data.solicitare){
                   state.solicitare=res.data.solicitare_q[0]
                   solicitarevalida.value=true
                  }
                  else
                  {
                    solicitarevalida.value=false
                  }

                  }
                  ).catch(err =>{})
                         console.log('mounted!')
                  })
 
    return {
       state,
       solicitarevalida
    }
  }
})
</script>