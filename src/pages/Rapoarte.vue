<template>
    <q-page padding>
                    <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                        <q-banner inline-actions rounded class="bg-red text-white">
                            Acces neautorizat !!!
    
                        </q-banner>
                    </div>
    
        <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column" style="max-width:90vw">
                <div class="row flex flex-center ">
                        <q-input class="col q-ml-md q-mt-md" style="width: 200px;" dense outlined v-model="dataraport" mask="date" :rules="['date']">
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
                         <q-input class="col q-ml-md q-mt-md"  style="width: 200px;" dense outlined v-model="dataraportstop" mask="date" :rules="['date']">
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
    
    
                          
                </div>

                <div class="row  q-pa-sm">
                    <q-select class="col  q-ml-md" style="min-width: 200px;" outlined v-model="numaicabinetul" :options="state.cabinete" label="Cabinete" />
                    <q-badge class="gt-xs q-ml-md " color="purple">
                            <q-icon name="dataset" color="white" />
                         </q-badge>
                    <q-select class="col q-ml-md"  style="min-width: 200px;" outlined v-model="numaimedicul" :options="state.medici" label="Medici" />
                </div>


    

        </div>
        <div class="row flex flex-center q-pa-sm">
            <q-btn   style="max-width:200px" class="col q-ml-md q-mt-md"  @click="reset"   color="primary" icon="cached" label="RESET" /> 
            <q-select dense class="col q-ml-md q-mt-md" style="max-width: 140px;" outlined v-model="tippro" :options="options" label="Tip programare" />
                    <q-btn style="max-width:200px" :disable="dataraportstop<dataraport" class="col q-ml-md q-mt-md" @click="raport"    color="primary" icon="mail" label="RAPORT" /> 
        </div>
    </q-page>    
    </template>
    <script>
    import { defineComponent,ref,inject ,reactive} from 'vue'
    import axios from 'axios'
    import { date } from 'quasar'


    const state = reactive(
  {
    medici : []  ,
    cabinete:[]
  }
  )
    
    export default defineComponent({
        name:'Rapoarte',

        setup() {
            const global=inject('global');
            let userid= global.state.user.rol=='admin'? 0:global.state.user.idutilizator
            let numaicabinetul=ref({label:'TOATE...',value:0})
            let numaimedicul = ref({label:'TOTI...',value:0})
            let tippro=ref('Toate') 
            let token = global.state.user.token;
            axios.get(process.env.host+`mediciperoperator/${userid}`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                res => {
                    state.medici=[]
                    res.data.medici.map(m=>{
                        state.medici.push({
                        label:m.nume,
                        value:m.id
                        
                        })
                    })
                 //   console.log('medici per operator',medici)

                })


                .catch(err =>{})

                axios.get(process.env.host+`toatecabinetele`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                    res => {
                    
                        state.cabinete=[];
                        res.data.cabinete.map(c=>{
                            if(global.state.user.rol=='admin'||global.state.user.idutilizator==c.idoperator)
                                    state.cabinete.push({
                                       value:c.id,
                                       label:c.denumire
                                    })
                        })

                    })


                    .catch(err =>{})


            let dataraport = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))
            let dataraportstop = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))
    
            function raport(){
                let d=date.formatDate(dataraport.value,'YYYY-MM-DD')
                let dbis=date.formatDate(dataraportstop.value,'YYYY-MM-DD')
               // console.log(dbis,dataraportstop.value>=dataraport.value)
               let tip=0
                if(tippro.value=='Numai online') 
                    tip=1
                    else if(tippro.value=='Numai offline') tip=2

               if(dataraportstop.value>=dataraport.value) {
                window.open(process.env.host+'raportprogramari?d='+d+'&userid='+userid+'&stop='+dbis+'&clin='+global.state.user.idclinica+'&cab='+numaicabinetul.value.value+'&med='+numaimedicul.value.value+'&tip='+tip,'_blank');
                reset()
               } 
            }
    
    
            function reset(){
         
              //  console.log('reset',tip)
                 dataraport.value = date.formatDate(new Date(), 'YYYY/MM/DD')
                 dataraportstop.value = date.formatDate(new Date(), 'YYYY/MM/DD')
                 numaicabinetul.value={label:'TOATE...',value:0}
                 numaimedicul.value = {label:'TOTI...',value:0}
                 tippro.value='Toate'
            }
    

    

    
            return {
                dataraport,
                dataraportstop,
                global,
                numaicabinetul,
                numaimedicul,
                raport,
                reset,
                tippro,
                state,
                options: [
        'Toate', 'Numai online', 'Numai offline'
      ]
            }
        }
    })
    </script>