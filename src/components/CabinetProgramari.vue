<template>
                                    <q-card   style="min-width:300px" >
                                 
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

                                     <q-item v-show="medicivizibili"  v-for="medic in mediciiCabinetului" :key="medic.idmedic" style="max-width:275px">
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
                                    
                                      <q-btn class="q-pa-sm" icon="event" color="primary" flat @click="disponibilitati">
                                      <span class="q-ml-md">Disponibilitati</span> 
                                      </q-btn>
                                    </q-card-actions>
                                  </q-card>
</template>
<script>
import { defineComponent,ref } from 'vue'

export default defineComponent({
    name:'CabinetProgramari',
    props:['cab','medici'],
    setup(props, { emit }) {
     
     let mediciiCabinetului = [] 
     props.medici.map(m=>{
        if (m.idcabinet==props.cab.idcabinet) mediciiCabinetului.push(m)
     })  
     function disponibilitati(){
        // console.log('Disponibilitati ',props.cab.idcabinet,mediciiCabinetului)
        emit('vreau-disponibilitati',{idcabinet:props.cab.idcabinet})
     }

        return {
            medicivizibili:ref(false),
            slide:ref(1),
            cab:props.cab,
            disponibilitati,
            mediciiCabinetului
        }
    }
})
</script>