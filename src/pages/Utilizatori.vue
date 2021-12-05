<template>
    <q-page padding>
                <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
        <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                <q-banner inline-actions rounded class="bg-orange text-white">
                    Utilizatori platforma programare online
                    <template v-slot:action>
                        <q-btn @click="tab='adaugare'" flat label="Adauga" />
                    </template>
                </q-banner>
                <q-card class="q-mt-sm">
                    <q-card-section v-show="tab!=='lista'">
                        <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{actiune}}</div>
                            <div class="text-subtitle2">utilizator</div>
                        </div>

                        <div class="col-auto">
                            <q-btn round  icon="cancel" @click="tab='lista'" />
                        </div>
                        </div>
                    </q-card-section>

                    <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="lista">
                            <q-slide-item v-for="user in state.utilizatori" :key="user.id" @left="onLeft(user.id)" @right="onRight(user.id)" left-color="purple" right-color="red">
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
                                            <q-item-label>{{user.numeintreg}} ({{user.rol}})</q-item-label>
                                            <q-item-label overline>{{user.nume_user}}</q-item-label>
                                      </q-item-section>     
                                </q-item>
                            </q-slide-item>
                    </q-tab-panel>

                    <q-tab-panel name="editare">
                        <div class="q-gutter-md" style="max-width: 480px">
                            <q-input v-model="nume_user" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Nume utilizator *" />
                            <q-input v-model="numeintreg" :rules="[val => !!val || 'Cimp obligatoriu']" label="Nume complet *" />
                            <q-input v-model="rol" :rules="[val => !!val || 'Cimp obligatoriu']" label="Rol *" />
                            <q-input v-model="email" label="Adresa e-mail" />
                            <q-input type="password" v-model="parola_user" :rules="[val => !!val || 'Cimp obligatoriu']" label="Parola *" />
                            <div class="q-mt-sm flex flex-center"><q-btn outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="adaugare">
                        <div class="q-gutter-md" style="max-width: 480px">
                            <q-input v-model="nume_user" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Nume utilizator *" />
                            <q-input v-model="numeintreg" :rules="[val => !!val || 'Cimp obligatoriu']" label="Nume complet *" />
                            <q-input v-model="rol" :rules="[val => !!val || 'Cimp obligatoriu']" label="Rol *" />
                            <q-input v-model="email" label="Adresa e-mail" />
                            <q-input type="password" v-model="parola_user" :rules="[val => !!val || 'Cimp obligatoriu']" label="Parola *" />
                            <div class="q-mt-sm flex flex-center"><q-btn outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
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
    utilizatori : []  ,
    userselectat:{}
  }
  )

export default defineComponent({
    name:'Utilizatori',
    setup() {
        const $q = useQuasar()
        const global=inject('global');
        let tab=ref('lista')
        let nume_user=ref('')
        let numeintreg=ref('')
        let rol=ref('operator')
        let email=ref('')
        let parola_user=ref('')

//computed zone
        let actiune = computed(()=>{
            return tab.value=='editare'? 'Actualizare' : tab.value=='lista'? '':'Adaugare' 
        })

        function totiuserii(){
                axios.get(process.env.host+`allusers`).then(

                res => {
                    console.log('Raspuns la toti userii',res.data);
                    state.utilizatori=[];
                    res.data.map(u=>{
                        state.utilizatori.push({
                        numeintreg:u.numeintreg,
                        nume_user:u.nume,
                        rol:u.rol,
                        email:u.email,
                        id:u.id
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})
                
        }

       totiuserii();

       function reset(){
              nume_user.value=''
              numeintreg.value=''
              rol.value='operator'
              parola_user.value=''
              email.value =''
       }

        function sterg(id){

                state.utilizatori.map(u=>{
                    if(u.id==id) state.userselectat=u
                })

                      $q.dialog({
                            title: 'Confirmati',
                            message: 'Sunteti sigur ca doriti stergerea inregistrarii?',
                            cancel: true,
                            persistent: true
                        }).onOk(() => {
                             console.log('>>>> Sterg ',id,arguments)
                             axios.delete(process.env.host+`users/${id}`,).then(

                                res => {
                                            $q.notify({
                                                message:'Utilizator sters cu succes!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                                totiuserii(); 
                                      
                            }
                                ).catch(err =>{})
                        }).onOk(() => {
                            // console.log('>>>> second OK catcher')
                        }).onCancel(() => {
                            state.utilizatori = state.utilizatori.filter(function(el) { return el.id !== id }); 
                            totiuserii();
                            // console.log('>>>> Cancel')
                        }).onDismiss(() => {
                            // console.log('I am triggered on both OK and Cancel')
                        })
        }

        function editeaza(p){
                console.log('editez...',p)
             //   let userselectat={}
                state.utilizatori.map(u=>{
                    if(u.id==p) state.userselectat=u
                })
              nume_user.value=state.userselectat.nume_user
              numeintreg.value=state.userselectat.numeintreg
              rol.value=state.userselectat.rol

              email.value =state.userselectat.email
        }

       function salveaza(){
           if(tab.value=='editare'){
               let user_modificat = {
                        nume:nume_user.value,
                        numeintreg :numeintreg.value,
                        rol:rol.value,
                        email:email.value 
               }
            //   console.log('patch',user_modificat,state.userselectat.id)
            axios.patch(process.env.host+`users/${state.userselectat.id}`,user_modificat).then(res =>{
                                
                                   console.log('Am editat utilizator ',res.data)
                                totiuserii();
                                reset();
                                tab.value='lista';
                                $q.notify({
                                        message:'Utilizator actualizat cu succes!',
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
                    let user_nou={
                        nume:nume_user.value,
                        numeintreg :numeintreg.value,
                        rol:rol.value,
                        password:parola_user.value,
                        email:email.value 

                    } 
                    console.log('salvez user',user_nou)

                    axios.post(process.env.host+'registeruser',user_nou).then(res =>{
                                
                                   console.log('Am salvat utilizator nou',res.data)
                                totiuserii();
                                reset();
                                tab.value='lista';
                                if(res.data.errors)
                                         $q.notify({
                                                        message:'EROARE! Cod: '+res.data.errors.errors[0].message,
                                                        timeout:3000,
                                                        position:'top',
                                                        color:'negative'
                                                        }) 
                                   else
                                    $q.notify({
                                        message:'Utilizator adaugat cu succes!',
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

        return {
            tab,
            global,
             state,
             nume_user,
             numeintreg,
             rol,
             email,
             parola_user,
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
