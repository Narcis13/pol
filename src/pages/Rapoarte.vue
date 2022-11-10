<template>
    <q-page padding>
                    <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                        <q-banner inline-actions rounded class="bg-red text-white">
                            Acces neautorizat !!!
    
                        </q-banner>
                    </div>
    
        <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column" style="max-width:90vw">
                <div class="row flex flex-center ">
                        <q-input class="col q-ml-md q-mt-md" dense outlined v-model="dataraport" mask="date" :rules="['date']">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="dataraport">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Inchide" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                         </q-input>
                         <q-badge class="q-ml-md " color="purple">
                            <q-icon name="keyboard_double_arrow_right" color="white" />
                         </q-badge>
                         <q-input class="col q-ml-md q-mt-md" dense outlined v-model="dataraportstop" mask="date" :rules="['date']">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="dataraportstop">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Inchide" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                         </q-input>
    
    
                          <q-btn :disable="dataraportstop<dataraport" class="col q-ml-md" @click="raport"    color="primary" icon="mail" label="RAPORT" /> 
                </div>
    

        </div>

    </q-page>    
    </template>
    <script>
    import { defineComponent,ref,inject } from 'vue'

    import { date } from 'quasar'


    
    export default defineComponent({
        name:'Rapoarte',

        setup() {
            const global=inject('global');
            let userid= global.state.user.rol=='admin'? 0:global.state.user.idutilizator
            let dataraport = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))
            let dataraportstop = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))
    
            function raport(){
                let d=date.formatDate(dataraport.value,'YYYY-MM-DD')
                let dbis=date.formatDate(dataraportstop.value,'YYYY-MM-DD')
                console.log(dbis,dataraportstop.value>=dataraport.value)
               if(dataraportstop.value>=dataraport.value)  window.open(process.env.host+'raportprogramari?d='+d+'&userid='+userid+'&stop='+dbis,'_blank');
            }
    
    

    

    

    
            return {
                dataraport,
                dataraportstop,
                global,
                
                raport
            }
        }
    })
    </script>