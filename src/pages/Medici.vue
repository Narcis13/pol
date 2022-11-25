<template>
    <q-page padding>
                <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>
        <div v-if="global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                <q-banner inline-actions rounded class="bg-orange text-white">
                    Medici platforma programare online
                    <template v-slot:action>
                        <q-btn @click="tab='adaugare';reset()" flat label="Adauga" />
                    </template>
                </q-banner>
                <q-card class="q-mt-sm">
                    <q-card-section v-show="tab!=='lista'">
                        <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{actiune}}</div>
                            <div class="text-subtitle2">medic</div>
                        </div>

                        <div class="col-auto">
                            <q-btn round  icon="cancel" @click="tab='lista'" />
                        </div>
                        </div>
                    </q-card-section>

                    <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="lista">
                            <q-slide-item v-for="medic in state.medici" :key="medic.id" @left="onLeft(medic.id)" @right="onRight(medic.id)" left-color="purple" right-color="red" style="width: 380px">
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
                                    <q-item-section top avatar>
                                        <q-avatar size="64px">
                                            <img :src="host+medic.urlpoza">
                                        </q-avatar>
                                    </q-item-section>

                                    <q-item-section>
                                        <q-item-label>{{medic.nume}}</q-item-label>
                                        <q-item-label caption>{{medic.grad}}</q-item-label>
                                        <q-item-label caption>{{medic.specialitate}}</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                        <q-badge :label="medic.codparafa" />
                                    </q-item-section>
                                </q-item>


                            </q-slide-item>
                    </q-tab-panel>

                    <q-tab-panel name="editare">
                        <div class=" q-gutter-sm" column style="width: 380px">
                            <q-card class="my-card flex flex-center" style="max-width: 380px" bordered>
                                <q-item>

                                    <q-avatar size='120px'>
                                     <img :src="calePozaImplicita">
                                    </q-avatar>

                             </q-item>
                             <q-uploader
                                   :url="uploadURL"
                                    auto-upload
                                    :form-fields="ff"
                                    field-name="pozamedic"
                                    max-file-size="1048576"
                                    accept=".jpg,.png, image/*"
                                    color="teal"
                                    label="Schimba poza"
                                    flat
                                    bordered
                                    no-thumbnails
                                    @uploaded="pozaUrcata"
                                    @rejected="onRejected"
                                    style="max-width: 300px"
                            />
                            </q-card>
                            <q-input v-model="nume" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Nume medic *" dense/>
                            <q-input v-model="grad" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Grad profesional *" dense/>
                            <q-input v-model="codparafa" no-error-icon bottom-slots error-message="Codul de parafa trebuie sa fie unic!" :error="!parafaUnica" label="Cod parafa *" dense/>
                             <q-select v-model="specialitate" :rules="[val => !!val || 'Cimp obligatoriu']" :options="specialitati" label="Specialitate *" dense/>
                            <q-input v-model="competente" label="Competente" dense/>

                            <q-input v-model="mail"  label="Adresa e-mail" dense/>  
                            <div class="q-mt-sm flex flex-center"><q-btn :disable="!parafaUnica" outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="adaugare">
                        <div class="q-pa-sm q-gutter-md" column style="width: 380px">


                            <q-input v-model="nume" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Nume medic *" dense/>
                            <q-input v-model="grad" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Grad profesional *" dense/>
                            <q-input v-model="codparafa" no-error-icon bottom-slots error-message="Codul de parafa trebuie sa fie unic!" :error="!parafaUnica" label="Cod parafa *" dense/>
                            <q-select v-model="specialitate" :rules="[val => !!val || 'Cimp obligatoriu']" :options="specialitati" label="Specialitate *" dense/>
                            <q-input v-model="competente" label="Competente" dense/>
                             <q-input v-model="mail"  label="Adresa e-mail" dense/>
                            <div class="q-mt-sm flex flex-center"><q-btn :disable="!parafaUnica" outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
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
    medici : []  ,
    medicselectat:null
  }
  )

export default defineComponent({
    name:'Medici',
    setup() {
        const $q = useQuasar()
        const global=inject('global');
        const token = global.state.user.token;
        let uploadURL = ref(process.env.host+'uploadpozamedic')
        let tab=ref('lista')
        let nume=ref('')
        let grad=ref('')
        let host=ref(process.env.host)
        let calePozaImplicita=ref(process.env.host+'/medici/doctor.png')
        let competente=ref('')
        let urlpoza = ref('')
        let mail = ref('')
        let codparafa = ref('')
        let specialitate=ref(null)
        let specialitati=[]
        let ff=ref([{name: 'idmedic', value: 0}])
     //  let durata=ref(5);
        
     function pozaUrcata(info){
          console.log('Poza urcata',JSON.parse(info.xhr.response).numefisier)
          let numefisier=JSON.parse(info.xhr.response).numefisier
          calePozaImplicita.value=process.env.host+'/medici/'+numefisier;
          totimedicii();
        }

        function onRejected (rejectedEntries) {

                $q.notify({
                    type: 'negative',
                    message: `Imagine invalida sau dimensiune fisier > 1Mb!`
                })
    }
//computed zone
        let actiune = computed(()=>{
            return tab.value=='editare'? 'Actualizare' : tab.value=='lista'? '':'Adaugare' 
        })

         axios.get(process.env.host+`toatespecialitatile`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                res => {
           
                    res.data.map(s=>{
                        specialitati.push({
                        label:s.denumire,
                        value:s.id
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})


        function totimedicii(){
                axios.get(process.env.host+`totimedicii`,{headers:{"Authorization" : `Bearer ${token}`,'idclinica':global.state.user.idclinica}}).then(

                res => {
                   
                    state.medici=[];
                    res.data.medici.map(m=>{
                        state.medici.push({
                        nume:m.nume,
                        grad:m.grad,
                        codparafa:m.codparafa,
                        idspecialitate:m.idspecialitate,
                        competente:m.competente,
                        urlpoza:m.urlpoza,
                        mail:m.mail,
                        id:m.id,
                        specialitate:m.denumire
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})
                
        }

       totimedicii();

       function reset(){
              nume.value=''
              grad.value=''
              competente.value=''
              urlpoza.value=''
              mail.value=''
              codparafa.value=''
              specialitate.value = {label:'',value:0};
             state.medicselectat=null;
            
       }

        function sterg(id){

                state.medici.map(m=>{
                    if(m.id==id) state.medicselectat=m
                })

                      $q.dialog({
                            title: 'Confirmati',
                            message: 'Sunteti sigur ca doriti stergerea inregistrarii? Vor fi efecte in lant si asupra altor componente ale aplicatiei care depind de inregistrarea ce urmeaza a fi stearsa!',
                            cancel: true,
                            persistent: true
                        }).onOk(() => {
                             console.log('>>>> Sterg ',id,arguments)
                               //EFECTE IN CASCADA !!!!!!!!!!
                             axios.delete(process.env.host+`medici/${id}`,{headers:{"Authorization" : `Bearer ${token}`}}).then(

                                res => {
                                            $q.notify({
                                                message:'Medic inactivat cu succes!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                                totimedicii(); 
                                      
                            }
                                ).catch(err =>{})
                        }).onOk(() => {
                            // console.log('>>>> second OK catcher')
                        }).onCancel(() => {
                            state.medici = state.medici.filter(function(el) { return el.id !== id }); 
                            totimedicii();
                            // console.log('>>>> Cancel')
                        }).onDismiss(() => {
                            // console.log('I am triggered on both OK and Cancel')
                        })
        }

        function editeaza(p){
                
             //   let userselectat={}
                state.medici.map(m=>{
                    if(m.id==p) state.medicselectat=m
                })

              ff.value[0]={name: 'idmedic', value: state.medicselectat.id}
              nume.value=state.medicselectat.nume
               grad.value=state.medicselectat.grad
                codparafa.value=state.medicselectat.codparafa
                 competente.value=state.medicselectat.competente
                  urlpoza.value=state.medicselectat.urlpoza
                  calePozaImplicita.value=process.env.host+state.medicselectat.urlpoza
                 
                   mail.value=state.medicselectat.mail
                   specialitati.map(s=>{
                       if(s.value==state.medicselectat.idspecialitate ) specialitate.value={value:state.medicselectat.idspecialitate,label:s.label}
                   })
                          console.log('editez...',p,specialitati,state.medicselectat,specialitate.value)
                   //specialitate.value={value:state.medicselectat.id,label:}
             // durata.value=state.serviciuselectat.durata
        }

       function salveaza(){
           if(tab.value=='editare'){
               let med_modificat = {
                        nume:nume.value,
                        grad:grad.value,
                        codparafa:codparafa.value,
                        idspecialitate:specialitate.value.value,
                     //   urlpoza:urlpoza.value,
                        mail:mail.value,
                        competente:competente.value
                      /* durata:durata.value*/
                  
               }
            //   console.log('patch',user_modificat,state.userselectat.id)
            axios.patch(process.env.host+`medici/${state.medicselectat.id}`,med_modificat,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                   console.log('Am editat med ',res.data)
                                totimedicii();
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
                                        message:'Medic actualizat cu succes!',
                                        timeout:2000,
                                        position:'top',
                                        color:'positive'
                                        }) 

                                            }).catch(err=>{
                                                console.log(err)
                                                     $q.notify({
                                                        message:'EROARE! Cod: '+res.data.errors.errors[0].message,
                                                        timeout:3000,
                                                        position:'top',
                                                        color:'negative'
                                                        }) 
                                            })

           } else {
                    let medic_nou={
                        nume:nume.value,
                        grad:grad.value,
                        codparafa:codparafa.value,
                        idspecialitate:specialitate.value.value,
                        urlpoza:'/medici/doctor.png',
                        mail:mail.value,
                        competente:competente.value,
                        idclinica:global.state.user.idclinica
                      //  durata:durata.value
                   
                    } 
                    console.log('salvez medic',medic_nou)

                    axios.post(process.env.host+'medici',medic_nou,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
                                
                                //   console.log('Am salvat utilizator nou',res.data)
                                totimedicii();
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
                                        message:'Medic adaugat cu succes!',
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

       let parafaUnica=computed(()=>{
                 let existaDeja=false;

                 state.medici.map(m=>{
                    //if (m.codparafa==codparafa.value) existaDeja=true
                    if(state.medicselectat){
                        if (m.codparafa==codparafa.value&&m.codparafa!==state.medicselectat.codparafa) existaDeja=true
                    } else{
                        if (m.codparafa==codparafa.value) existaDeja=true
                    }
                 })
                return  !existaDeja&&codparafa.value.length>2
             })

        return {
            tab,
            uploadURL,
            global,
            host,
            calePozaImplicita,
             state,
             nume,
            grad,
            codparafa,
            competente,
            urlpoza,
            ff,
            mail,
            parafaUnica,
            specialitate,
            specialitati,
            pozaUrcata,
            onRejected,
             salveaza,
             actiune,
             reset,
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