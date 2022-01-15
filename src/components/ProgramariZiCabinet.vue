<template>
    <div style="min-width:180px;" class="q-pa-sm column">
       <div class="text-subtitle2">{{denumirezi}}</div> 

  
        </div>
</template>
<script>
import { defineComponent,ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
 

export default defineComponent({
    name:'ProgramariZiCabinet',
    props:['zi','liste'],
    setup(props, { emit }) {
        
       console.log('Proprietati zi programari cabinet',props.liste.programari,props.zi)
        let intervale = ref([])
        const $q = useQuasar()

        //programari per cabinet
       
      

      return {
          denumirezi:props.zi.textlocalizat,
         
      }  
    },
})
</script>