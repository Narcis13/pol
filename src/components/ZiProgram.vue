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
                <q-btn class="q-mt-xs" dense outline rounded color="green" label="Rezerv !" @click="salvez_programare(interval.index)"/>
             </q-timeline-entry>


         </q-timeline>
        </div>
</template>
<script>
import { defineComponent,ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

function addMinutes(time, minsToAdd) {
  function D(J){ return (J<10? '0':'') + J};
  
  var piece = time.split(':');
  
  var mins = piece[0]*60 + +piece[1] + +minsToAdd;

  return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
}  

export default defineComponent({
    name:'ZiProgram',
    props:['zi','liste','solicitare'],
    setup(props, { emit }) {
       // console.log('Proprietati zi program',props.zi,props.liste)
        let intervale = ref([])
        const $q = useQuasar()
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
                       idsolicitare:props.solicitare.id,
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

      function salvez_programare(index){
         
          let interval=intervale.value[index];

          let info={
                data: interval.data,
               
                idcabinet: interval.idcabinet,
                idmedic: interval.idmedic,
                idprogram: interval.idprogram,
                idserviciumedical: interval.idserviciumedical,
                idsolicitare: interval.idsolicitare,
               
                indexslot: interval.index,
                indexzi: interval.indexzi,

                orastart: interval.orastart,
                orastop: interval.orastop,
                stare: "activ"
          }
 //console.log('Rezerv index',info)
         
          
              axios.post(process.env.host+'programare',info).then(res =>{
                                
                                console.log('Programare noua',res.data)
                   
                                $q.notify({
                                        message:'Programare efectuata cu succes!',
                                        timeout:2000,
                                        position:'top',
                                        color:'positive'
                                        }) 

                                            }).catch(err=>{
                                                console.log(err)
                                                    $q.notify({
                                                        message:'EROARE!',
                                                        timeout:2000,
                                                        position:'top',
                                                        color:'negative'
                                                        })                  
                                            })    
         

      }

      return {
          denumirezi:props.zi.textlocalizat,
          intervale,
          salvez_programare
      }  
    },
})
</script>
