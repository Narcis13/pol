<template>
<q-page padding>
        <q-banner v-if="!solicitarevalida" dense inline-actions class="text-white bg-red">
          Ne pare rau! Solicitare invalida!
          <template v-slot:action>
            <q-btn flat color="white" label="Solicita programare online" />
          </template>
         </q-banner>

         <div v-if="state.cabinete.length>0" class="row justify-center q-pa-sm q-mb-lg shadow-8 ">
            <q-img
             :src="urlsigla"
             ratio="4/3"
             fit="contain"
             style="height: 90px; max-width: 120px"
             class="col-12 col-sm-4 q-mr-lg"
             />
             <div class="col-12 col-sm-8 column items-center justify-center" style="min-width:300px">
              <div class="text-subtitle1 text-weight-bold">{{numeclinica}}</div>
              <div>Email: {{emailclinica}}</div>
             </div>
           </div>

    <div v-if="solicitarevalida" class="q-mt-xs flex flex-center column" style="max-width:90vw">

            <q-item v-if="solicitarevalida&&tab=='lista'&&state.cabinete.length>0" class="q-mt-xs q-mb-lg">
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
                            <div v-if="state.cabinete.length>0" class="row justify-center q-gutter-xl">

                               <div v-for="cab in state.cabinete"  :key="cab.idcabinet">
                                   <cabinet-programari @vreau-disponibilitati="vreauDisponibilitati" :cab="cab" :medici="state.medici" />
                               </div>

<!--                                 <q-card v-for="cab in state.cabinete"  style="min-width:300px" :key="cab.idcabinet">
                                  
                                    <q-carousel
                                                animated
                                                v-model="slide"
                                                navigation
                                                swipeable
                                                navigation-icon="radio_button_unchecked"
                                                control-type="regular"
                                                control-color="orange"
                                                control-text-color="grey-8"
                                                navigation-position="right"
                                                height="200px"
                                                infinite
                                              >
                                                <q-carousel-slide :name="1" :img-src="cab.urlpoza"></q-carousel-slide>
                                                <q-carousel-slide :name="2" :disable="!cab.servicii" class="q-pa-xs">
                                                  <q-scroll-area class="fit">
                                                    <div class="column no-wrap flex-center ">
                                                      
                                                      <div class="q-mt-sm" v-html="cab.servicii">
                                                       
                                                      </div>
                                                    
                                                    </div>
                                                  </q-scroll-area>
                                                </q-carousel-slide>
                                          <q-carousel-slide :name="3" :disable="!cab.dotare" class="q-pa-xs">
                                                  <q-scroll-area class="fit">
                                                    <div class="column no-wrap flex-center ">
                                                    
                                                      <div class="q-mt-md" v-html="cab.dotare">
                                                      
                                                      </div>
                                                    
                                                    </div>
                                                  </q-scroll-area>
                                                </q-carousel-slide>

                                                
                                                  <q-carousel-slide :name="4" class="q-pa-xs" :disable="!cab.orar">
                                                  
                                                    <div class="column no-wrap flex-center q-carousel--padding">
                                                    
                                                      <div class="q-mt-md" v-html="cab.orar">
                                                      
                                                      </div>
                                                    
                                                    </div>
                                                </q-carousel-slide>
                                              </q-carousel>
                                    <q-card-section>
                                      <q-btn
                                        fab
                                        color="grey-6"
                                        size="xs"
                                        icon="unfold_more"
                                        class="absolute"
                                        @click="medicivizibili=!medicivizibili"
                                        style="top: 0; right: 12px; transform: translateY(-50%);"
                                      ></q-btn>

                                      <div class="row no-wrap items-center">
                                        <div class="col text-subtitle1 text-weight-bold ellipsis text-indigo q-mt-sm">
                                          {{cab.cabinet}}
                                        </div>
                                    </div>

                                    <q-item v-show="medicivizibili&&medic.idcabinet==cab.idcabinet"  v-for="medic in state.medici" :key="medic.idmedic" style="max-width:275px">
                                          <q-item-section top avatar>
                                              <q-avatar size="64px">
                                                  <img :src="medic.urlpoza">
                                              </q-avatar>
                                          </q-item-section>

                                          <q-item-section>
                                              <q-item-label>{{medic.numemedic}}</q-item-label>
                                              <q-item-label caption>{{medic.gradmedic}}</q-item-label>
                                              <q-item-label caption>{{medic.specialitate}}</q-item-label>
                                          </q-item-section>

                                          <q-item-section side top>
                                              <q-badge :label="medic.parafa" />
                                          </q-item-section>
                                   </q-item>
                                    </q-card-section>

                                  

                                    <q-separator></q-separator>

                                    <q-card-actions>
                                    
                                      <q-btn class="q-pa-sm" icon="event" color="primary" flat @click="maprogramez(cab.idcabinet)">
                                      <span class="q-ml-md">Disponibilitati</span> 
                                      </q-btn>
                                    </q-card-actions>
                                  </q-card> -->

                            </div>
                            <div v-else>
                              <q-banner  class="text-white bg-red">
                                Ne pare rau, niciun cabinet nu este disponibil conform solicitarii dumneavoastra!

                              </q-banner>
                               
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
                                         
                                            <div :key="zi.formatata" v-for="zi in zileperpagina" class="q-pa-md col-12 col-sm-6 col-md-3 col-lg">
                                                   <zi-program v-if="zi.pagina==paginacurenta" :zi="zi" :liste="state.liste" :solicitare="state.solicitare"/>
                                            </div>
                                        </div>        
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>    

            <q-page-sticky  position="bottom-right" :offset="[24, 24]">
                    <q-btn v-show="paginacurenta!==limitamaximapaginacurenta&&tab=='editare'" @click="paginaUrmatoare"  fab   icon="east" color="accent" >
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
import CabinetProgramari from 'components/CabinetProgramari.vue'
import { defineComponent ,reactive,onMounted,ref} from 'vue';
import { useRoute } from "vue-router";
import axios from 'axios'

const state = reactive({
  solicitare:{},
  cabinete:[],
  medici:[],
  liste:{}
})
export default defineComponent({
  name: 'Programare',
  components:{
    ZiProgram,
    CabinetProgramari
  },
  setup(){
    let solicitarevalida=ref(true)
    let tab=ref('lista')
    let numeclinica=ref('')
    let emailclinica=ref('')
    let zile=ref([])
    let zileperpagina=ref([])
    let paginacurenta=ref(1)
    let urlsigla=ref("https://placeimg.com/500/300/nature")
 // aici trebuie sa fie 10 daca vreau 2 lunide programare
    const route =useRoute()
    let elemente=route.params.token.split('-')
   // console.log('Ruta este...',elemente)
    state.liste.mod=elemente[2]
    let limitamaximapaginacurenta=elemente[2]=='e'?5:10
    onMounted(() => {
      // aici aflu sarbatorile legale...
      // console.log('Component Programari is mounted!',state.liste.sarbatori)

        
                
      })

             let idc=0;

              axios.get(process.env.host+`solicitari/${elemente[1]}`).then( //axios.get(process.env.host+`solicitari/${route.params.token}`).then(

                  res => {
                  //console.log('Raspuns la o solicitare',res.data.solicitare_q[0]);
                  idc=res.data.solicitare_q[0].idspecialitate;

                  if(res.data.solicitare_q[0]!=='undefined'&&res.data.solicitare_q[0].confirmat==null&&res.data.solicitare_q[0].hash==elemente[0]){
                   state.solicitare=res.data.solicitare_q[0]
                   solicitarevalida.value=true
                   if(res.data.solicitare_q[0].tip=='Online') res.data.solicitare_q[0].tip='online'
                   state.liste.kind=res.data.solicitare_q[0].tip
                   state.liste.indis=[]
                     urlsigla.value=process.env.host+res.data.solicitare_q[0].calesiglaclinica
                     numeclinica.value=res.data.solicitare_q[0].numeclinica
                     emailclinica.value=res.data.solicitare_q[0].emailclinica
                   state.liste.clinica={idclinica:res.data.solicitare_q[0].idclinica,numeclinica:res.data.solicitare_q[0].numeclinica,emailclinica:res.data.solicitare_q[0].emailclinica}
                   axios.get(process.env.host+`sarbatori`,{headers:{'idclinica':res.data.solicitare_q[0].idclinica}}).then(
                               
                               res => {
                                // console.log('Sarbatori',res.data)
                                 state.liste.sarbatori=[]
                                   res.data.sarbatori.map(s=>{
                                     state.liste.sarbatori.push('d'+s.zi.toString()+'m'+s.luna.toString())
                                   })
                                  //console.log('Component Programari is mounted!',state.liste.sarbatori)
                               })       
                               .catch(err =>{})



                                axios.get(process.env.host+`indis/${idc}`).then(
                               
                                res => {
                                  //console.log('Indisponibilitatile specialitatii',res.data)
                                  state.liste.indis=[]
                                    res.data.indis.map(i=>{
                                      let ds = new Date(i.datastop)
                                      ds.setDate(ds.getDate()+1)
                                      state.liste.indis.push({
                                        idmedic:i.idmedic,
                                        tipindi:i.tipindisponibilitate,
                                        datastart:new Date(i.datastart),
                                        datastop:ds//new Date(i.datastop)
                                      })
                                    })
                                })       
                                .catch(err =>{})

                                 axios.get(process.env.host+`program/${idc}`,{headers:{'idclinica':res.data.solicitare_q[0].idclinica}}).then(

                                        res => {
                                        //console.log('Cabinete pe specialitate',idc,res.data);
                                        zile.value=res.data.zile
                                        zileperpagina.value=[]
                                        zile.value.map(z=>{
                                          if (z.pagina==paginacurenta.value) zileperpagina.value.push(z)
                                        })
                                        state.cabinete=[];
                                          res.data.cabinete.map(c=>{
                                            c.urlpoza=process.env.host+c.urlpoza
                                            state.cabinete.push(c)
                                          })

                                          state.medici=[];
                                          res.data.medici.map(m=>{
                                            m.urlpoza=process.env.host+m.pozamedic
                                            state.medici.push(m)
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
                        

                  
            function vreauDisponibilitati(p){
             // console.log('Vreau sa afisezi disponibilitati pentru cabinetul ',p)
              maprogramez(p.idcabinet)
            }      
           

            function maprogramez(idcab){
            
                  //console.log('Ma programez ....',idcab,elemente[2])
                  state.liste.idc=idcab
                  //aici interoghez programul specific cabinetului idcab si actualizez state cu asta....
                  axios.get(process.env.host+`programcabinet/${idcab}/${elemente[2]}`).then(

                   res => {
                   
                        //console.log('Orar cabinet ',res.data)
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
       vreauDisponibilitati,
       slide:ref(1),
       medicivizibili:ref(false),
       urlsigla,
       numeclinica,
       emailclinica,
       limitamaximapaginacurenta,
       paginaUrmatoare(){
        
           if(paginacurenta.value<limitamaximapaginacurenta+1) paginacurenta.value ++   //if(paginacurenta.value<11) paginacurenta.value ++ daca vreau 2 luni de programare
       
          
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
<style>
.my-card{
  width: 100%;
  max-width: 300px;
}

</style>