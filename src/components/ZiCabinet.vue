<template>
<div class="column">
    <q-timeline layout="dense" side="right" color="secondary">
      <q-timeline-entry ><div class="text-h5">{{denumirezi}}</div></q-timeline-entry>

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
        <q-slide-item >
        <template v-slot:right>
          <q-icon name="alarm" />
        </template>

        <q-item>
                        <q-item-section>
                                    <q-item-label>{{interval.numemedic}}</q-item-label>
                                    <q-item-label caption>{{interval.spec_medic}}</q-item-label>
                                    <q-item-label caption>( {{interval.durataserviciu}} min. )</q-item-label>
                        </q-item-section>

               
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
                          <q-btn  flat label="Abandon" v-close-popup />
                          <q-space />
                          <q-btn @click="adaugainterval" flat label="Adauga"  />
               </q-card-actions>
            </q-card>  
     </q-dialog> 

</div>

</template>
<script>
import { defineComponent, ref ,reactive} from 'vue'

const state=reactive({
  intervale:[]
})

export default defineComponent({
    name:'ZiCabinet',
    props:['zi','liste'],
    setup(props, { emit }){
       console.log('Props...', props.liste)
       let adaug_interval=ref(false)
       let orastart=ref('10:00')
       let orastop=ref('10:00')
       let medic=ref(null)
       let serviciu=ref(null)
      let medici=[]
      let servicii=[]
       let intervalele = ref([])
      props.liste.medici.map(item=>{
          medici.push({
            value:item.id,
            label:item.nume,
            specialitate:item.specialitate
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

       function adaugainterval(){
   
         intervalele.value.push({
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
            // console.log(orastart.value.toString().replace(':','')+'00')
             let info = {
               idcabinet:props.liste.cabinet.id,
               idmedic:medic.value.value,
               idserviciumedical:serviciu.value.value,
               orastart:orastart.value.toString().replace(':','')+'00',
               orastop:orastop.value.toString().replace(':','')+'00',
               stare:"test",
              ziuadinsaptamina:props.zi.zidinsaptamina
             }
               console.log('Adauga interval',info)
               adaug_interval.value=false;
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
          intervalele
        }
    }
})
</script>