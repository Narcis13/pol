<template>
<q-page padding>
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

    <div v-if="solicitarevalida" class="q-mt-sm flex flex-center column" style="max-width:90vw">
                    <q-tab-panels v-model="tab" animated>

                        <q-tab-panel name="lista">
                            <div class="row items-start">
                                <q-card v-for="cab in state.cabinete" inline style="width: 300px" class="bg-secondary text-white q-ma-sm" :key="cab.idcabinet">
                                    <q-card-section>
                                        <div class="text-h5">{{cab.cabinet}}</div>
                                       
                                    </q-card-section>

                                    <q-separator dark />

                                    <q-card-actions>
                                        <q-btn flat :key="cab.idcabinet" @click="maprogramez(cab.idcabinet)">Disponibilitati</q-btn>

                                    </q-card-actions>

                                </q-card>
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="editare">
                            <div>
                                        <q-bar dark class="bg-primary text-white">
                                            
                                            <q-btn @click="tab='lista'" dense flat icon="arrow_back" v-close-popup>
                                                <q-tooltip>Inapoi la toate cabinetele</q-tooltip>
                                            </q-btn>
                                            <q-space />
                                            <div class="text-h4">Toate cabinetele</div>

                                        </q-bar>

                                        <div class="row">
                                            <!-- AICI E BUCURIA MARE -->
                                        </div>        
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>    

            <q-page-sticky  position="bottom-right" :offset="[24, 24]">
                    <q-btn v-show="tab=='editare'" fab   icon="east" color="accent" >
                    <q-tooltip anchor="top start" self="center right" class="bg-accent">Zilele urmatoare</q-tooltip>
                    </q-btn>
            </q-page-sticky>
            <q-page-sticky  position="bottom-left" :offset="[24, 24]">
                    <q-btn v-show="tab=='editare'"  fab icon="west" color="accent"  >
                    <q-tooltip anchor="top right" self="center left" class="bg-accent">Zilele anterioare</q-tooltip>
                    </q-btn>
            </q-page-sticky>    
</q-page>
</template>

<script>
import { defineComponent ,reactive,onMounted,ref} from 'vue';
import { useRoute } from "vue-router";
import axios from 'axios'

const state = reactive({
  solicitare:{},
  cabinete:[]
})
export default defineComponent({
  name: 'Programare',
  setup(){
    let solicitarevalida=ref(true)
    let tab=ref('lista')
    const route =useRoute()
    console.log('Ruta este...',route.params.token)
  
             let idc=0;
              axios.get(process.env.host+`solicitari/${route.params.token}`).then(

                  res => {
                  console.log('Raspuns la o solicitare',res.data.solicitare_q[0]);
                  idc=res.data.solicitare_q[0].idspecialitate;
                  if(res.data.solicitare){
                   state.solicitare=res.data.solicitare_q[0]
                   solicitarevalida.value=true

                                 axios.get(process.env.host+`program/${idc}`).then(

                                        res => {
                                        console.log('Cabinete pe specialitate',idc,res.data);
                                        state.cabinete=[];
                                          res.data.cabinete.map(c=>{
                                            state.cabinete.push(c)
                                          })
                                        }
                                        ).catch(err =>{})


                  }
                  else
                  {
                    solicitarevalida.value=false
                  }

                  }
                  ).catch(err =>{})
                        

                  
                  
           

            function maprogramez(idcab){
            
                  console.log('Ma programez ....',idcab)
                  tab.value='editare'
            }
           
    return {
       state,
       solicitarevalida,
       tab,
       maprogramez
    }
  }
})
</script>