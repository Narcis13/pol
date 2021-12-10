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
                            <div class="text-subtitle2">cabinet</div>
                        </div>

                        <div class="col-auto">
                            <q-btn round  icon="cancel" @click="tab='lista'" />
                        </div>
                        </div>
                    </q-card-section>

                    <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="lista">
                            <q-slide-item v-for="cabinet in state.cabinete" :key="cabinet.id" @left="onLeft(cabinet.id)" @right="onRight(cabinet.id)" left-color="purple" right-color="red">
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
                                    <q-item-label>{{cabinet.denumire}}</q-item-label>
                                    <q-item-label caption>Operator: {{cabinet.operator}}</q-item-label>

                                    </q-item-section>

                                </q-item>


                            </q-slide-item>
                    </q-tab-panel>

                    <q-tab-panel name="editare">
                        <div class="q-pa-sm q-gutter-md" column style="max-width: 540px">
                            <q-input v-model="denumire" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Denumire cabinet *" />

                             <q-select v-model="operator" :rules="[val => !!val || 'Cimp obligatoriu']" :options="operatori" label="Operator *" />
                             <q-input
                                v-model="dotare"
                                label="Dotare"
                                filled
                                autogrow
                                ></q-input>   
                                <q-input
                                v-model="servicii"
                                label="Servicii"
                                filled
                                autogrow
                                ></q-input>   
                                <q-input
                                v-model="orar"
                                label="Orar"
                                filled
                                autogrow
                                ></q-input>   
                            <div class="q-mt-sm flex flex-center"><q-btn outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="adaugare">
                        <div class="q-pa-sm q-gutter-md" column style="max-width: 540px">
                            <q-input v-model="denumire" :rules="[val => !!val || 'Cimp obligatoriu']"  label="Denumire cabinet *" />

                             <q-select v-model="operator" :rules="[val => !!val || 'Cimp obligatoriu']" :options="operatori" label="Operator *" />
                             <q-input
                                v-model="dotare"
                                label="Dotare"
                                filled
                                autogrow
                                ></q-input>   
                                <q-input
                                v-model="servicii"
                                label="Servicii"
                                filled
                                autogrow
                                ></q-input>   
                                <q-input
                                v-model="orar"
                                label="Orar"
                                filled
                                autogrow
                                ></q-input>   
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
    cabinete : []  ,
    cabinetselectat:{}
  }
  )

export default defineComponent({
    name:'Cabinete',
    setup() {
        const $q = useQuasar()
        const global=inject('global');
        let tab=ref('lista')
        let denumire=ref('')
        let dotare=ref('')
        let servicii=ref('')
        let orar = ref('')

        let operator=ref(null)
        let operatori=[]
     //  let durata=ref(5);
        

//computed zone
        let actiune = computed(()=>{
            return tab.value=='editare'? 'Actualizare' : tab.value=='lista'? '':'Adaugare' 
        })

         axios.get(process.env.host+`allusers`).then(

                res => {
           
                    res.data.map(u=>{
                        operatori.push({
                        label:u.nume,
                        value:u.id
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})


        function toatecabinetele(){
                axios.get(process.env.host+`cabinete`).then(

                res => {
                   
                    state.cabinete=[];
                    res.data.cabinete.map(c=>{
                        state.cabinete.push({
                        denumire:c.denumire,
                        dotare:c.dotare,
                        servicii:c.servicii,
                        idoperator:c.idoperator,
                        orar:c.orar,
                        id:c.id,
                        operator:c.nume
                        
                        })
                    })
                
                })
            
            
                .catch(err =>{})
                
        }

       toatecabinetele();

       function reset(){
              denumire.value=''
              dotare.value=''
              orar.value=''
              servicii.value=''

              operator.value = {label:'',value:0};
       
            
       }

        function sterg(id){

                state.cabinete.map(c=>{
                    if(c.id==id) state.cabinetselectat=c
                })

                      $q.dialog({
                            title: 'Confirmati',
                            message: 'Sunteti sigur ca doriti stergerea acestui cabinet?',
                            cancel: true,
                            persistent: true
                        }).onOk(() => {
                             console.log('>>>> Sterg ',id,arguments)
                             axios.delete(process.env.host+`cabinete/${id}`,).then(

                                res => {
                                            $q.notify({
                                                message:'Cabinet sters cu succes!',
                                                timeout:2000,
                                                position:'top',
                                                color:'positive'
                                                }) 
                                                toatecabinetele(); 
                                      
                            }
                                ).catch(err =>{})
                        }).onOk(() => {
                            // console.log('>>>> second OK catcher')
                        }).onCancel(() => {
                            state.cabinete = state.cabinete.filter(function(el) { return el.id !== id }); 
                            toatecabinetele();
                            // console.log('>>>> Cancel')
                        }).onDismiss(() => {
                            // console.log('I am triggered on both OK and Cancel')
                        })
        }

        function editeaza(p){
                
             //   let userselectat={}
                state.cabinete.map(c=>{
                    if(c.id==p) state.cabinetselectat=c
                })

         
              denumire.value=state.cabinetselectat.denumire
               orar.value=state.cabinetselectat.orar
                dotare.value=state.cabinetselectat.dotare
                 servicii.value=state.cabinetselectat.servicii

                   operatori.map(o=>{
                       if(o.value==state.cabinetselectat.idoperator ) operator.value={value:state.cabinetselectat.idoperator,label:o.label}
                   })
                        //  console.log('editez...',p,specialitati,state.medicselectat,specialitate.value)
                   //specialitate.value={value:state.medicselectat.id,label:}
             // durata.value=state.serviciuselectat.durata
        }

       function salveaza(){
           if(tab.value=='editare'){
               let cab_modificat = {
                        denumire:denumire.value,
                        dotare:dotare.value,
                        servicii:servicii.value,
                        idoperator:operator.value.value,
                        orar:orar.value,

                      /* durata:durata.value*/
                  
               }
            //   console.log('patch',user_modificat,state.userselectat.id)
            axios.patch(process.env.host+`cabinete/${state.cabinetselectat.id}`,cab_modificat).then(res =>{
                                
                                   console.log('Am editat med ',res.data)
                                toatecabinetele();
                                reset();
                                tab.value='lista';
                                $q.notify({
                                        message:'Cabinet actualizat cu succes!',
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
                    let cabinet_nou={
                        denumire:denumire.value,
                        dotare:dotare.value,
                        servicii:servicii.value,
                        idoperator:operator.value.value,
                        orar:orar.value,
       
                      //  durata:durata.value
                   
                    } 
                    console.log('salvez cabinet',cabinet_nou)

                    axios.post(process.env.host+'cabinete',cabinet_nou).then(res =>{
                                
                                //   console.log('Am salvat utilizator nou',res.data)
                                toatecabinetele();
                                reset();
                                tab.value='lista';
                                $q.notify({
                                        message:'Cabinet adaugat cu succes!',
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
             denumire,
            dotare,
            servicii,
            orar,

            operator,
            operatori,
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