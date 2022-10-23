<template>
    <q-page padding>
                <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
        <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                <q-banner inline-actions rounded class="bg-orange text-white">
                    Specialitati medicale
                    <template v-slot:action>
                        <q-btn @click="tab='adaugare';reset()" flat label="Adauga" />
                    </template>
                </q-banner>
                <q-card class="q-mt-sm">
                    <q-card-section v-show="tab!=='lista'">
                        <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{actiune}}</div>
                            <div class="text-subtitle2">specialitate</div>
                        </div>

                        <div class="col-auto">
                            <q-btn round  icon="cancel" @click="tab='lista'" />
                        </div>
                        </div>
                    </q-card-section>

                    <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="lista">
                            <q-slide-item v-for="spec in state.specialitati" :key="spec.id" @left="onLeft(spec.id)" @right="onRight(spec.id)" left-color="purple" right-color="red">
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
                                            <q-item-label>{{spec.denumire}} </q-item-label>
                                           
                                      </q-item-section>     
                                </q-item>
                            </q-slide-item>
                    </q-tab-panel>

                    <q-tab-panel name="editare">
                        <div class="q-gutter-md" style="max-width: 480px">
                            <q-input autofocus no-error-icon v-model="denumire" bottom-slots error-message="Denumirea specialitatii trebuie sa fie unica!" :error="!denumireUnica"  label="Specialitate medicala *" />

                            <div class="q-mt-lg flex flex-center"><q-btn outline :disable="!denumireUnica" rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="adaugare">
                        <div class="q-gutter-md" style="max-width: 480px">
                            <q-input autofocus no-error-icon v-model="denumire" bottom-slots error-message="Denumirea specialitatii trebuie sa fie unica!" :error="!denumireUnica"  label="Specialitate medicala *" />

                            <div class="q-mt-lg flex flex-center"><q-btn :disable="!denumireUnica" outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>
                    </q-tab-panels>
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
    specialitati : []  ,
    specialitateselectata:{}
  }
  )

export default defineComponent({
    name:'Specialitati',
    setup() {
        const $q = useQuasar()
        const global=inject('global');
        let tab=ref('lista')
        let denumire=ref('')
        let token = global.state.user.token;

//computed zone
        let actiune = computed(()=>{
            return tab.value=='editare'? 'Actualizare' : tab.value=='lista'? '':'Adaugare' 
        })

        function toatespecialitatile(){
                axios.get(process.env.host+`toatespecialitatile`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                res => {
                   
                    state.specialitati=[];
                    res.data.map(s=>{
                        state.specialitati.push({
                        denumire:s.denumire,
                        id:s.id
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})
                
        }

       toatespecialitatile();

       function reset(){
              denumire.value=''
            
       }

        function sterg(id){

                state.specialitati.map(s=>{
                    if(s.id==id) state.specialitateselectata=s
                })

                      $q.dialog({
                            title: 'Confirmati',
                            message: 'Sunteti sigur ca doriti stergerea inregistrarii?',
                            cancel: true,
                            persistent: true
                        }).onOk(() => {
                             console.log('>>>> Sterg ',id,arguments)
                             //EFECTE IN CASCADA !!!!!!!!!!
                             axios.delete(process.env.host+`specialitati/${id}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                                res => {
                                            $q.notify({
                                                message:'Specialitate inactivata cu succes!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                                toatespecialitatile(); 
                                      
                            }
                                ).catch(err =>{})
                        }).onOk(() => {
                            // console.log('>>>> second OK catcher')
                        }).onCancel(() => {
                            state.specialitati = state.specialitati.filter(function(el) { return el.id !== id }); 
                            toatespecialitatile();
                            // console.log('>>>> Cancel')
                        }).onDismiss(() => {
                            // console.log('I am triggered on both OK and Cancel')
                        })
        }

        function editeaza(p){
                console.log('editez...',p)
             //   let userselectat={}
                state.specialitati.map(s=>{
                    if(s.id==p) state.specialitateselectata=s
                })
              denumire.value=state.specialitateselectata.denumire
        }

       function salveaza(){
           if(tab.value=='editare'){
               let spec_modificat = {
                        denumire:denumire.value,
                  
               }
            //   console.log('patch',user_modificat,state.userselectat.id)
            axios.patch(process.env.host+`specialitati/${state.specialitateselectata.id}`,spec_modificat,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                   console.log('Am editat spe c ',res.data)
                                toatespecialitatile();
                                reset();
                                tab.value='lista';
                                $q.notify({
                                        message:'Specialitate actualizata cu succes!',
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
                    let spec_nou={
                        denumire:denumire.value,
                        idclinica:global.state.user.idclinica
                    } 
                    console.log('salvez spec',spec_nou)

                    axios.post(process.env.host+'specialitati',spec_nou,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                //   console.log('Am salvat utilizator nou',res.data)
                                toatespecialitatile();
                                reset();
                                tab.value='lista';
                                $q.notify({
                                        message:'Specialitate adaugata cu succes!',
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

                 state.specialitati.map(s=>{
                    if (s.denumire==denumire.value) existaDeja=true
                 })
                return  !existaDeja&&denumire.value.length>2
             })


        return {
            tab,
            global,
             state,
             denumire,
             denumireUnica,
       reset,
             salveaza,
             actiune,
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
