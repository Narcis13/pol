<template>
<q-page padding>
        <q-banner v-if="!solicitarevalida" dense inline-actions class="text-white bg-red">
          Ne pare rau! Solicitare invalida!
          <template v-slot:action>
            <q-btn flat color="white" label="Solicita programare online" />
          </template>
         </q-banner>



    <div v-if="solicitarevalida" class="q-mt-xs flex flex-center column" style="max-width:90vw">

            <q-item v-if="solicitarevalida" class="q-mt-xs">
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

                    <q-tab-panels v-model="tab" animated>

                        <q-tab-panel name="lista">
                            <div class="row items-start">
                                <q-card v-for="cab in state.cabinete" inline style="width: 300px" class="bg-secondary text-white q-ma-xs" :key="cab.idcabinet">
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
                                         
                                            <div :key="zi.formatata" v-for="zi in zileperpagina" class="q-pa-md col-12 col-md">
                                                   <zi-program v-if="zi.pagina==paginacurenta" :zi="zi" :liste="state.liste"/>
                                            </div>
                                        </div>        
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>    

            <q-page-sticky  position="bottom-right" :offset="[24, 24]">
                    <q-btn v-show="paginacurenta!==5&&tab=='editare'" @click="paginaUrmatoare"  fab   icon="east" color="accent" >
                    <q-tooltip anchor="top start" self="center right" class="bg-accent">Zilele urmatoare</q-tooltip>
                    </q-btn>
            </q-page-sticky>
            <q-page-sticky  position="bottom-left" :offset="[24, 24]">
                    <q-btn v-show="paginacurenta!==1&&tab=='editare'" @click="paginaAnterioara"   fab icon="west" color="accent"  >
                    <q-tooltip anchor="top right" self="center left" class="bg-accent">Zilele anterioare</q-tooltip>
                    </q-btn>
            </q-page-sticky>    
</q-page>
</template>

<script>
import ZiProgram from 'components/ZiProgram.vue'
import { defineComponent ,reactive,onMounted,ref} from 'vue';
import { useRoute } from "vue-router";
import axios from 'axios'

const state = reactive({
  solicitare:{},
  cabinete:[],
  liste:{}
})
export default defineComponent({
  name: 'Programare',
  components:{
    ZiProgram
  },
  setup(){
    let solicitarevalida=ref(true)
    let tab=ref('lista')
    let zile=ref([])
    let zileperpagina=ref([])
    let paginacurenta=ref(1)
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
                                        zile.value=res.data.zile
                                        zileperpagina.value=[]
                                        zile.value.map(z=>{
                                          if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                                        })
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
            
                  console.log('Ma programez ....',idcab,zile)
                  //aici interoghez programul specific cabinetului idcab si actualizez state cu asta....
                  axios.get(process.env.host+`programcabinet/${idcab}`).then(

                   res => {
                   
                        console.log('Orar cabinet ',res.data)
                        state.liste.program=[]
                        res.data.program_cabinet.map(p=>{
                            state.liste.program.push(p)
                        })
                
                         tab.value='editare'

                   })

                 .catch(err =>{})  

               
            }
           
    return {
       state,
       solicitarevalida,
       tab,
       zile,
       zileperpagina,
       paginacurenta,
       maprogramez,
       paginaUrmatoare(){
           if(paginacurenta.value<6) paginacurenta.value ++   
       
          
           zileperpagina.value=[]
                      zile.value.map(z=>{
                       if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                         })
                       
         


       },
       paginaAnterioara(){
           if(paginacurenta.value>1) paginacurenta.value --      
           
           
           zileperpagina.value=[]
                      zile.value.map(z=>{
                       if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                         })
                   
           


       }
    }
  }
})
</script>