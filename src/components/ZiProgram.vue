<template>
    <div style="min-width:180px;" class="q-pa-sm column">
       <div class="text-subtitle2">{{denumirezi}}</div> 
         <q-timeline layout="dense" side="right" color="secondary">
             <q-timeline-entry
                :key="interval.index"
                v-for="interval in intervale"
                :subtitle="interval.orastart +'-'+ interval.orastop"
                side="right"
                >
                <div>
                   {{interval.numemedic}}
                </div>
                <div class="q-mt-xs">{{interval.grad}}</div>
                <q-btn class="q-mt-xs" dense outline rounded color="green" label="Rezerv !" />
             </q-timeline-entry>


         </q-timeline>
        </div>
</template>
<script>
import { defineComponent,ref } from 'vue'

function addMinutes(time, minsToAdd) {
  function D(J){ return (J<10? '0':'') + J};
  
  var piece = time.split(':');
  
  var mins = piece[0]*60 + +piece[1] + +minsToAdd;

  return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
}  

export default defineComponent({
    name:'ZiProgram',
    props:['zi','liste'],
    setup(props, { emit }) {
       // console.log('Proprietati zi program',props.zi,props.liste)
        let intervale = ref([])

        props.liste.program.map(p=>{
            if(p.ziuadinsaptamina==props.zi.indexzi){
                var date1 = new Date(2015, 1,7,  p.orastart.split(":")[0],p.orastart.split(":")[1]);

                var date2 = new Date(2015, 1,7,  p.orastop.split(":")[0],p.orastop.split(":")[1]);
                var minute=(date2-date1)/60000
                let nrsegmente=minute/p.durata
                let t0=p.orastart.split(":")[0]+':'+p.orastart.split(":")[1]
                for(var i=1;i<=nrsegmente;i++){
                   let t1= addMinutes(t0,p.durata)
                   intervale.value.push({
                       orastart:t0,
                       orastop:t1,
                       idmedic:p.idmedic,
                       numemedic:p.numemedic,
                       idcabinet:p.idcabinet,
                       idserviciumedical:p.idserviciumedical,
                       idspecialitate:p.idspecialitate,
                       idprogram:p.id,
                       stare:'liber',
                       grad:p.grad,
                       index:i-1,
                       indexzi:props.zi.indexzi,
                       data:props.zi.formatata
                   })
                   t0=t1;
                }
                console.log('Am program',intervale.value)
            }
        })

      return {
          denumirezi:props.zi.textlocalizat,
          intervale
      }  
    },
})
</script>
