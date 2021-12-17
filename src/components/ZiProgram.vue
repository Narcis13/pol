<template>
    <div style="min-width:180px;" class="q-pa-sm column">
       <div class="text-subtitle2">{{denumirezi}}</div> 
         <q-timeline layout="dense" side="right" color="secondary">
             <q-timeline-entry
           
                subtitle="08.00 - 10.30"
                side="right"
                >
                <div>
                    Dr. Radu Laurentiu 
                </div>
                <div class="q-mt-sm">Medic primar</div>
                <q-btn class="q-mt-sm" outline rounded color="green" label="Programeaza-te!" />
             </q-timeline-entry>

            <q-timeline-entry
           
                subtitle="08.00 - 10.30"
                side="right"
                >
                <div>
                    Dr. Radu Laurentiu 
                </div>
                <div class="q-mt-sm">Medic primar</div>
                  <q-badge class="q-mt-sm" rounded color="red" label="OCUPAT" />
             </q-timeline-entry>

            <q-timeline-entry
           
                subtitle="08.00 - 10.30"
                side="right"
                >
                <div>
                    Dr. Radu Laurentiu 
                </div>
                <div class="q-mt-sm">Medic primar</div>
                 <q-btn class="q-mt-sm" outline rounded color="green" label="Programeaza-te!" />
             </q-timeline-entry>
         </q-timeline>
        </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name:'ZiProgram',
    props:['zi'],
    setup(props, { emit }) {
        console.log('Proprietati zi program',props.zi)

      return {
          denumirezi:props.zi.textlocalizat
      }  
    },
})
</script>
