<template>
<div style="min-width:160px;" class="column">
    <q-timeline layout="dense" side="right" color="secondary">
      <q-timeline-entry ><div class="text-h6">{{denumirezi}}</div></q-timeline-entry>

      <!--<q-timeline-entry
        title="Consultatie chirurgie generala"
        subtitle="08.00 - 10.30"
        side="right"
      >
        <div>
          Lorem ipsum dolor 
        </div>
      </q-timeline-entry>
-->
      <q-timeline-entry
        :key="interval.orastart+interval.orastop"
        v-for="interval in intervalele"
   
        :title="interval.numeserviciu"
        :subtitle="interval.orastart +'-'+ interval.orastop"
        side="right"
      
      >
        <q-slide-item @right="onLeft(interval.id)">
        <template v-slot:right>
                                 <div class="row items-center">
                                   Sterge <q-icon right name="delete_forever" />
                                </div>
        </template>

        <q-item>
                        <q-item-section>
                                    <q-item-label>{{interval.numemedic}}</q-item-label>
                                    <q-item-label caption>{{interval.spec_medic}}</q-item-label>
                                    <q-item-label caption>( {{interval.durataserviciu}} min. )</q-item-label>
                        </q-item-section>
                        <q-tooltip anchor="top start" self="center right" class="bg-accent">Gliseaza stinga pentru stergere</q-tooltip>
               
        </q-item>
      </q-slide-item>
      </q-timeline-entry>


    </q-timeline>
    <div class="row justify-center">
            <q-btn  @click="show_adauga_interval(zidinsaptamina)" icon="add" color="accent"  >
              <q-tooltip anchor="top start" self="center right" class="bg-accent">Adauga interval orar</q-tooltip>
            </q-btn>
    </div>

    <q-dialog  v-model="adaug_interval" persistent >
            <q-card class="q-pa-md" style="width: 350px; max-width: 80vw;">
               <q-card-section>
                          <div class="text-h6">Adaugare interval orar</div><!--   sau suplimentare angajament -->
               </q-card-section>

                <q-card-section>
                        <q-badge v-show="serviciu.durata>1" color="orange">
                            <q-icon name="access_time" color="white" class="q-mt-xs q-mb-xs q-mr-sm" />{{serviciu.durata}} minute.
                         </q-badge>
                            <q-select v-model="serviciu" :options="servicii" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Serviciu *" />
                            <q-select v-model="medic" :options="medici" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Medic *" />
                            <q-input  label="Ora start" v-model="orastart" mask="time" :rules="['time']">
                              <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="orastart" >
                                      <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                      </div>
                                    </q-time>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                           </q-input>
                            <q-input  label="Ora stop" v-model="orastop" mask="time" :rules="['time']">
                              <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="orastop">
                                      <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                      </div>
                                    </q-time>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                           </q-input>
              

                </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                          <q-btn @click="reset()" flat label="Abandon" v-close-popup />
                          <q-space />
                          <q-btn :disable="!interval_valid" @click="adaugainterval" flat label="Adauga"  />
               </q-card-actions>
            </q-card>  
     </q-dialog> 

</div>

</template>
<script>
import { defineComponent, ref ,reactive,computed,inject} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
const state=reactive({
  intervale:[]
})

export default defineComponent({
    name:'ZiCabinet',
    props:['zi','liste'],
    setup(props, { emit }){
    // console.log('setup zi cabinet')
       const $q = useQuasar()
       const global=inject('global');
        const token = global.state.user.token;
       let adaug_interval=ref(false)
       let orastart=ref('10:00')
       let orastop=ref('11:00')
       let medic=ref(null)
       let serviciu=ref({durata:1,value:0,label:''})
      let medici=[]
      let servicii=[]
       let intervalele = ref([])

       let programulzilei=[];

       //computed
         let interval_valid=computed(()=>{
            // console.log('verific interval valid',intervalele.value)
             var date1 = new Date(2015, 1,7,  orastart.value.split(":")[0],orastart.value.split(":")[1]);

             var date2 = new Date(2015, 1,7,  orastop.value.split(":")[0],orastop.value.split(":")[1]);
             var minute=(date2-date1)/60000
             var durataserviciu = serviciu.value.durata;
             var rest = minute % durataserviciu
             
             var interval_nesuprapus=true
             intervalele.value.map((i)=>{
                 
                  var d1 = new Date(2015, 1,7,  i.orastart.split(":")[0],i.orastart.split(":")[1]);
                  var d2 = new Date(2015, 1,7,  i.orastop.split(":")[0],i.orastop.split(":")[1]);
                  //console.log('Date1',date1,'Date2',date2,'d1',d1,'d2',d2)
                  if((date1>d1&&date1<d2)||(date2>d1&&date2<d2)||(date1.toISOString()==d1.toISOString())||(date2.toISOString()==d2.toISOString())) interval_nesuprapus=false
             })
             
             return minute>0&&rest==0&&minute>=durataserviciu&&interval_nesuprapus&&medic.value&&serviciu.value.durata>1
         })

       props.liste.program.map(p=>{
         //console.log(p)
         if(p.idcabinet==props.liste.cabinet.id&&p.ziuadinsaptamina==props.zi.zidinsaptamina) programulzilei.push(p)
       }) 

     //  console.log('Programul zilei',programulzilei,props.liste)
       programulzilei.map(prog=>{
         intervalele.value.push({
                                          id:prog.id,
                                          idmedic:prog.idmedic,
                                          numemedic:prog.numemedic,
                                          spec_medic:prog.specialitate,
                                          idserviciumedical:prog.idserviciumedical,
                                          numeserviciu:prog.serviciu,
                                          durataserviciu:prog.durata,
                                          orastart:prog.orastart,
                                          orastop:prog.orastop,
                                          idcabinet:prog.idcabinet,
                                          ziuadinsaptamina:prog.ziuadinsaptamina
         })
       })

      props.liste.medici.map(item=>{
          medici.push({
            value:item.id,
            label:item.nume,
            specialitate:item.specialitate,
            idspecialitate:item.idspecialitate
          })
      })

      props.liste.servicii.map(item=>{
          servicii.push({
            value:item.id,
            label:item.denumire,
            durata:item.durata
          })
      })

       function show_adauga_interval(zisaptamina){
         console.log(zisaptamina)
         adaug_interval.value=true;

       }

       function reset(){
         medic.value=null;
         serviciu.value={durata:1,value:0,label:''};
         orastart.value='10:00'
         orastop.value='11:00'
         intervalele.value.sort((a,b) => (a.orastart > b.orastart) ? 1 : ((b.orastart > a.orastart) ? -1 : 0))
        // console.log('reset intervalele',intervalele.value)
       }

       function adaugainterval(){
   
    
            // console.log(orastart.value.toString().replace(':','')+'00')
             let info = {
               idcabinet:props.liste.cabinet.id,
               idmedic:medic.value.value,
               idspecialitate:medic.value.idspecialitate,
               idserviciumedical:serviciu.value.value,
               orastart:orastart.value.toString().replace(':','')+'00',
               orastop:orastop.value.toString().replace(':','')+'00',
               stare:"activ",
              ziuadinsaptamina:props.zi.zidinsaptamina,
              idclinica:global.state.user.idclinica
             }

             var date1 = new Date(2015, 1,7,  orastart.value.split(":")[0],orastart.value.split(":")[1]);

             var date2 = new Date(2015, 1,7,  orastop.value.split(":")[0],orastop.value.split(":")[1]);
             var minute=(date2-date1)/60000
              // console.log('Adauga interval',minute,info)
               

              axios.post(process.env.host+'program',info,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                 //console.log('Am adaugat interval nou',props.liste.program)
                                emit('interval-adaugat',{id:res.data.id})
                              
                               adaug_interval.value=false;
                              intervalele.value.push({
                                          id:res.data.id,
                                          idmedic:medic.value.value,
                                          numemedic:medic.value.label,
                                          spec_medic:medic.value.specialitate,
                                          idserviciumedical:serviciu.value.value,
                                          numeserviciu:serviciu.value.label,
                                          durataserviciu:serviciu.value.durata,
                                          orastart:orastart.value,
                                          orastop:orastop.value,
                                          idcabinet:props.liste.cabinet.id,
                                          ziuadinsaptamina:props.zi.zidinsaptamina
                                        })
                                          reset();
                                $q.notify({
                                        message:'Interval adaugat cu succes!',
                                        timeout:2000,
                                        position:'top',
                                        color:'positive'
                                        }) 
                                      //  console.log('Am adaugat interval nou',props.liste.program)
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
          state,
          denumirezi:props.zi.denumire,
          zidinsaptamina:props.zi.zidinsaptamina,
          show_adauga_interval,
          adaug_interval,
          serviciu,
          medic,
          orastart,
          orastop,
          medici,
          servicii,
          adaugainterval,
          intervalele,
          reset,
          interval_valid,
          onLeft(id){
            console.log('Sterg interval cu id',id)

                              axios.delete(process.env.host+`program/${id}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                                res => {
                                   intervalele.value = intervalele.value.filter((item) => item.id !== id);
                                   emit('interval-sters',{id})
                                            $q.notify({
                                                message:'Interval sters cu succes!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                 
                                      
                            }
                                ).catch(err =>{})
           
          }
        }
    }
})
</script>