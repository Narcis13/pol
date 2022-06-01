<template>
    <div style="min-width:180px;" class="q-pa-sm column">
       <div class="text-subtitle2">{{denumirezi}}</div> 
       <div class="bg-blue-grey-7 text-white text-h6 fit row wrap justify-center items-center content-start q-pa-md q-mt-md" v-if="intervale.length==0" style="width:180px;height:180px;">INCHIS</div>
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
                 <q-chip v-if="interval.stare!=='liber'" color="red" text-color="white"  :label="interval.stare" />
                <q-btn v-if="interval.stare=='liber'" icon="event" class="q-mt-xs" dense outline rounded color="green" label="Rezervare !" @click="salvez_programare(interval.index)"/>
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
        let d=new Date(props.zi.iso)
        let zicodata='d'+d.getDate().toString()+'m'+(d.getMonth()+1).toString()
        let sarbatoare=false;
        props.liste.sarbatori.map(s=>{
            if(s==zicodata) sarbatoare=true
        })
       console.log('Proprietati zi program',props.liste.sarbatori,props.zi,sarbatoare)
        let intervale = ref([])
        const $q = useQuasar()

        //programari per cabinet
        if(!sarbatoare){

     
        let programari=[]
        axios.get(process.env.host+`programarecabinet/${props.liste.idc}`).then(

                                        res => {
                                        console.log('Program pe cabinet',props.liste.program);
                                        programari=res.data.programari
                                           let idx=0;
                                                props.liste.program.map(p=>{
                                                        if(p.ziuadinsaptamina==props.zi.indexzi){
                                                            //aici e buba.... nu aflu corect numarul de segmente
                                                            var date1 = new Date(2015, 1,7,  p.orastart.split(":")[0],p.orastart.split(":")[1]);

                                                            var date2 = new Date(2015, 1,7,  p.orastop.split(":")[0],p.orastop.split(":")[1]);
                                                            var minute=(date2-date1)/60000
                                                            let nrsegmente=minute/p.durata
                                                            let t0=p.orastart.split(":")[0]+':'+p.orastart.split(":")[1]
                                                            for(var i=1;i<=nrsegmente;i++){
                                                              //  console.log('Ciclu Segmente '+nrsegmente+' i '+i)
                                                            let t1= addMinutes(t0,p.durata)
                                                            let stare='liber'
                                                            //aici ma intreb daca intervalul este ocupat sau indisponibil
                                                            programari.map(prog=>{
                                                                if(prog.idprogram==p.id&&prog.data==props.zi.formatata&&prog.indexslot==idx){
                                                                    stare='OCUPAT'
                                                                }
                                                                
                                                            })

                                                            props.liste.indis.map(ind=>{
                                                                let dataprogram=new Date(props.zi.iso)
                                                                //console.log('Verific indisponibilitati',dataprogram,ind.datastart,ind.datastop);
                                                                let inintervalindisponibilitate=dataprogram>=ind.datastart&&dataprogram<=ind.datastop
                                                                if(ind.idmedic==p.idmedic&&inintervalindisponibilitate){
                                                                    stare='INDISPONIBIL'
                                                                }
                                                            })
                                                            
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
                                                                stare,
                                                                grad:p.grad,
                                                                index:idx,
                                                                indexzi:props.zi.indexzi,
                                                                data:props.zi.formatata
                                                            })
                                                              idx++
                                                            t0=t1;
                                                            }
                                                            console.log('Am program',intervale.value)
                                                          
                                                        }
                                             })

                                        }
                                        ).catch(err =>{})
                }



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
 console.log('Rezerv index',info,index)
         
          
              axios.post(process.env.host+'programare',info).then(res =>{
                                
                                console.log('Programare noua',res.data)
                if(res.data.data){
                                let token= btoa('pentru data '+res.data.data+' la ora '+res.data.orastart+' ')
                                this.$router.push(`./${token}/succes`)
                                $q.notify({
                                        message:'Programare efectuata cu succes!',
                                        timeout:2000,
                                        position:'top',
                                        color:'positive'
                                        }) 
                }
                else
                {
                                                    $q.notify({
                                                        message:'EROARE! Slotul a fost rezervat de alt pacient cu citeva secunde in urma! ',
                                                        timeout:5000,
                                                        position:'top',
                                                        color:'negative'
                                                        })
                                                      //  window.location.reload();
                }


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
