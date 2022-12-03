<template>
    <q-page padding>
                <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
        <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                <q-banner inline-actions rounded class="bg-orange text-white">
                    Servicii medicale
                    <template v-slot:action>
                        <q-btn @click="tab='adaugare';reset()" flat label="Adauga" />
                    </template>
                </q-banner>
                <q-card class="q-mt-sm">
                    <q-card-section v-show="tab!=='lista'">
                        <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{actiune}}</div>
                            <div class="text-subtitle2">serviciu</div>
                        </div>

                        <div class="col-auto">
                            <q-btn round  icon="cancel" @click="tab='lista'" />
                        </div>
                        </div>
                    </q-card-section>

                    <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="lista">
                            <q-slide-item v-for="serv in state.servicii" :key="serv.id" @left="onLeft(serv.id)" @right="onRight(serv.id)" left-color="purple" right-color="red">
                                <template v-slot:left>
                                <div class="row items-center">
                                    <q-icon left name="create" /> Actualizeaza
                                </div>
                                </template>
                                <template v-slot:right>
                                <div class="row items-center">
                                   Sterge <q-icon right name="delete_forever" />
                                </div>
                                </template>

                                <q-item>
                                      <q-item-section>
                                            <q-item-label>{{serv.denumire}} </q-item-label>
                                            <q-item-label>Durata: {{serv.durata}} minute</q-item-label>
                                            <q-item-label>Tarif: {{serv.tarif}} lei</q-item-label>
                                           
                                      </q-item-section>     
                                </q-item>
                            </q-slide-item>
                    </q-tab-panel>

                    <q-tab-panel name="editare">
                        <div class="q-pa-sm q-gutter-md" column style="max-width: 540px">
                            <q-input class="q-mb-lg" autofocus no-error-icon v-model="denumire" bottom-slots error-message="Denumirea serviciului trebuie sa fie unica!" :error="!denumireUnica" label="Denumire serviciu *" />
                            <q-slider class="q-mt-lg" style="max-width: 320px" v-model="durata" :min="5" :step="5" label label-always :label-value="'Durata: ' + durata + 'min'" snap :max="240" color="green"/>
                            <q-input
                                v-model.number="tarif"
                                no-error-icon
                                bottom-slots
                                error-message="Doar valori mai mari ca 0"
                                :error="!tarifMaiMareCaZero"
                                type="number"
                                label="Tarif"
                                filled
                               
                                />
                            <div class="q-mt-sm flex flex-center"><q-btn :disable="!denumireUnica&&!tarifMaiMareCaZero" outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="adaugare">
                        <div class="q-pa-sm q-gutter-md" column style="max-width: 540px">
                            <q-input class="q-mb-lg" autofocus no-error-icon v-model="denumire" bottom-slots error-message="Denumirea serviciului trebuie sa fie unica!" :error="!denumireUnica" label="Denumire serviciu *" />
                            <q-slider class="q-mt-lg" style="max-width: 320px" v-model="durata" :min="5" :step="5" label label-always :label-value="'Durata: ' + durata + 'min'"  snap :max="240" color="green"/>
                            <q-input
                                v-model.number="tarif"
                                no-error-icon
                                bottom-slots
                                error-message="Doar valori mai mari ca 0"
                                :error="!tarifMaiMareCaZero"
                                type="number"
                                label="Tarif"
                                filled
                               
                                />
                            <div class="q-mt-sm flex flex-center"><q-btn :disable="!denumireUnica&&!tarifMaiMareCaZero" outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>
                    </q-tab-panels>
                    <q-page-sticky position="bottom-right" :offset="[18, 18]">
                         <q-btn @click="tab='adaugare';reset()" class="lt-sm" fab icon="add" color="orange" />
                    </q-page-sticky>
                </q-card>
        </div>
    </q-page>
</template>
<script>
import { defineComponent,ref , reactive,inject,computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

const state = reactive(
  {
    servicii : []  ,
    serviciuselectat:null
  }
  )

export default defineComponent({
    name:'Servicii',
    setup() {
        const $q = useQuasar()
        const global=inject('global');
        let tab=ref('lista')
        let denumire=ref('')
        let durata=ref(5);
        let tarif = ref(0)
        let token = global.state.user.token;

//computed zone
        let actiune = computed(()=>{
            return tab.value=='editare'? 'Actualizare' : tab.value=='lista'? '':'Adaugare' 
        })

        function toateserviciile(){
                axios.get(process.env.host+`toateserviciile`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                res => {
                   
                    state.servicii=[];
                    res.data.map(s=>{
                        state.servicii.push({
                        denumire:s.denumire,
                        durata:s.durata,
                        tarif:s.tarif,
                        id:s.id
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})
                
        }

       toateserviciile();

       function reset(){
              denumire.value=''
              durata.value=5
              state.serviciuselectat=null;
              tarif.value=0
            
       }

        function sterg(id){

                state.servicii.map(s=>{
                    if(s.id==id) state.serviciuselectat=s
                })

                      $q.dialog({
                            title: 'Confirmati',
                            message: 'Sunteti sigur ca doriti stergerea inregistrarii? Vor fi efecte in lant si asupra altor componente ale aplicatiei care depind de inregistrarea ce urmeaza a fi stearsa!',
                            cancel: true,
                            persistent: true
                        }).onOk(() => {
                             console.log('>>>> Sterg ',id,arguments)
                             axios.delete(process.env.host+`servicii/${id}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                                res => {
                                            $q.notify({
                                                message:'Serviciu inactivat cu succes!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                                toateserviciile(); 
                                      
                            }
                                ).catch(err =>{})
                        }).onOk(() => {
                            // console.log('>>>> second OK catcher')
                        }).onCancel(() => {
                            state.servicii = state.servicii.filter(function(el) { return el.id !== id }); 
                            toateserviciile();
                            // console.log('>>>> Cancel')
                        }).onDismiss(() => {
                            // console.log('I am triggered on both OK and Cancel')
                        })
        }

        function editeaza(p){
                console.log('editez...',p)
             //   let userselectat={}
                state.servicii.map(s=>{
                    if(s.id==p) state.serviciuselectat=s
                })
              denumire.value=state.serviciuselectat.denumire
              durata.value=state.serviciuselectat.durata
              tarif.value=state.serviciuselectat.tarif
        }

       function salveaza(){
           if(tab.value=='editare'){
               let serv_modificat = {
                        denumire:denumire.value,
                        durata:durata.value,
                        tarif:tarif.value
                  
               }
            //   console.log('patch',user_modificat,state.userselectat.id)
            axios.patch(process.env.host+`servicii/${state.serviciuselectat.id}`,serv_modificat,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                   console.log('Am editat serv ',res.data)
                                toateserviciile();
                                reset();
                                tab.value='lista';
                                $q.notify({
                                        message:'Serviciu actualizat cu succes!',
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

           } else {
                    let serv_nou={
                        denumire:denumire.value,
                        durata:durata.value,
                        tarif:tarif.value,
                        idclinica:global.state.user.idclinica,
                   
                    } 
                    console.log('salvez serv',serv_nou)

                    axios.post(process.env.host+'servicii',serv_nou,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                //   console.log('Am salvat utilizator nou',res.data)
                                toateserviciile();
                                reset();
                                tab.value='lista';
                                $q.notify({
                                        message:'Serviciu adaugat cu succes!',
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

       }

       let denumireUnica=computed(()=>{
                 let existaDeja=false;
                 //console.log('denumireUnica',state.serviciuselectat)
                 state.servicii.map(s=>{
                    if(state.serviciuselectat){
                        if (s.denumire==denumire.value&&s.denumire!==state.serviciuselectat.denumire) existaDeja=true
                    } else{
                        if (s.denumire==denumire.value) existaDeja=true
                    }
                   
                 })
                return  !existaDeja&&denumire.value.length>2
             })
         let tarifMaiMareCaZero = computed(()=>{
              return tarif.value>=0
         })

        return {
            tab,
            global,
             state,
             denumire,
             durata,
             salveaza,
             tarif,
             actiune,
             reset,
             denumireUnica,
             tarifMaiMareCaZero,
            onLeft (p) {
                tab.value='editare'
                editeaza(p);
            },

            onRight (id) {
                sterg(id)
              }
          }
    },
})
</script>