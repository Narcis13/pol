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
                        <q-btn @click="tab='adaugare';reset()" flat label="Adauga" />
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
                                      <q-item-section top side>
                                        <div class="text-grey-8 q-gutter-xs">

                                            <q-btn size="16px" flat dense round icon="lock_reset" @click="medium=true">
                                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                      <strong>Reseteaza parola</strong> 
         
                                                 </q-tooltip>
                                            </q-btn>
                                        </div>
                                     </q-item-section>   
                                </q-item>
                            </q-slide-item>
                    </q-tab-panel>

                    <q-tab-panel name="editare">
                        <div class="q-gutter-md" style="max-width: 480px">
                            <q-input autofocus v-model="nume_user" :rules="[val => !!val || 'Cimp obligatoriu (min 5 caractere)',val => val.length > 4 || 'Minimum 5 caractere!']" lazy-rules label="Nume utilizator *" dense/>
                            <q-input v-model="numeintreg" :rules="[val => !!val || 'Cimp obligatoriu (min 5 caractere)',val => val.length > 4 || 'Minimum 5 caractere!']"  lazy-rules label="Nume complet *" dense/>
                            <q-input v-model="rol" readonly label="Rol *" dense/>
                            <q-input v-model="email" label="Adresa e-mail" dense autocomplete="new-password"/>
                           
                            <div class="q-mt-sm flex flex-center"><q-btn outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="adaugare">
                        <div class="q-gutter-md" style="max-width: 480px">
                            <q-input autofocus v-model="nume_user" :rules="[val => !!val || 'Cimp obligatoriu (min 5 caractere)',val => val.length > 4 || 'Minimum 5 caractere!']" lazy-rules label="Nume utilizator *" dense/>
                            <q-input v-model="numeintreg" :rules="[val => !!val || 'Cimp obligatoriu (min 5 caractere)',val => val.length > 4 || 'Minimum 5 caractere!']"  lazy-rules label="Nume complet *" dense/>
                            <q-input v-model="rol" readonly label="Rol *" dense/>
                            <q-input v-model="email" label="Adresa e-mail" dense/>
                            <q-input type="password" no-error-icon v-model="parola_user" hint="Min. 8 caractere " bottom-slots error-message="Folositi litere mari,mici,cifre si semne!" :error="!parolaInvalida" label="Parola *" autocomplete="new-password" dense/>
                            <q-input type="password" no-error-icon v-model="confirmare_parola" bottom-slots error-message="Parola trebuie sa fie aceeasi!" :error="!parolaDiferita" label="Confirmare parola *" autocomplete="new-password" dense/>
                            <div class="q-mt-sm flex flex-center"><q-btn :disable="!formularValid" outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>
                    </q-tab-panels>
                </q-card>
        </div>

    <q-dialog
      v-model="medium"
    >
      <q-card style="width: 400px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Resetare parola utilizator</div>
        </q-card-section>
        <q-card-section>
            <q-input type="password" no-error-icon v-model="parola_user" hint="Min. 8 caractere " bottom-slots error-message="Folositi litere mari,mici,cifre si semne!" :error="!parolaInvalida" label="Parola *" autocomplete="new-password" dense/>
            <q-input type="password" no-error-icon v-model="confirmare_parola" bottom-slots error-message="Parola trebuie sa fie aceeasi!" :error="!parolaDiferita" label="Confirmare parola *" autocomplete="new-password" dense/>
       
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn   flat label="Reseteaza" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
        let token = global.state.user.token;
        let tab=ref('lista')
        let nume_user=ref('')
        let numeintreg=ref('')
        let medium=ref(false)
        let rol=ref('operator')
        let email=ref('')
        let parola_user=ref('')
        let confirmare_parola=ref('')

//computed zone
        let actiune = computed(()=>{
            return tab.value=='editare'? 'Actualizare' : tab.value=='lista'? '':'Adaugare' 
        })

        function totiuserii(){
                axios.get(process.env.host+`allusers`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

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
                             axios.delete(process.env.host+`users/${id}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

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
                        email:email.value ,
                       // numeunic:state.userselectat.nume_user+global.state.user.idclinica
               }
               if(state.userselectat.nume_user!==nume_user.value) user_modificat.numeunic=nume_user.value+global.state.user.idclinica
             // console.log('patch',user_modificat,state.userselectat,nume_user.value)
            axios.patch(process.env.host+`users/${state.userselectat.id}`,user_modificat,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                   console.log('Am editat utilizator ',res.data)
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
                        email:email.value ,
                        idclinica:global.state.user.idclinica,
                        numeunic:nume_user.value+global.state.user.idclinica,
                        createdby:global.state.user.idutilizator


                    } 
                    console.log('salvez user',user_nou)

                    axios.post(process.env.host+'registeruser',user_nou,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
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
        let parolaInvalida=computed(()=>{
                const hasUpperCase = /[A-Z]/.test(parola_user.value);
                const hasLowerCase = /[a-z]/.test(parola_user.value);
                const hasNumbers = /\d/.test(parola_user.value);
                const hasNonalphas = /\W/.test(parola_user.value);
                return parola_user.value.length>7&&(hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas ==4)
             })
        let parolaDiferita=computed(()=>{
                return  parola_user.value==confirmare_parola.value
             })

        return {
            tab,
            global,
             state,
             nume_user,
             numeintreg,
             rol,
             email,
             parola_user,
             confirmare_parola,
             salveaza,
             medium,
             actiune,
             reset,
             parolaInvalida,
             parolaDiferita,
             formularValid:computed(()=>{
                  return parolaInvalida&&parolaDiferita&&nume_user.value.length>4&&numeintreg.value.length>4
             }),
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
