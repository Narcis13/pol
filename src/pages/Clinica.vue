<template>
    <q-page padding >
        <div v-if="!global.state.user.autentificat" class="q-mt-sm flex flex-center column">
                    <q-banner inline-actions rounded class="bg-red text-white">
                        Acces neautorizat !!!

                    </q-banner>
                </div>

            <div v-if="global.state.user.autentificat" class="row justify-center q-gutter-lg">
             
             <q-img
                 :src="caleSigla"
                 class="col-6 col-md-5"
                 spinner-color="white"
                 style="height: 140px; max-width: 150px">
             
                 <div class="absolute-bottom text-subtitle1 text-center">
                         Sigla
                  </div>
             </q-img>
               
                 
        
         
             <q-uploader
                 :url="uploadURL"
                 :form-fields="ff"
                 auto-upload
                 field-name="sigla"
                 class="col-6 col-md-5"
                 max-file-size="1048576"
                 accept=".jpg,.png, image/*"
                 color="secondary"
                 label="Schimba sigla"
                 flat
                 bordered
                 @uploaded="siglaUrcata"
                 @rejected="onRejected"
                 style="max-width: 200px"
          />
        
         </div>

            <div v-if="global.state.user.autentificat"  class="shadow-9  q-mt-lg q-pa-sm  ">       


        <div  class="row justify-center q-gutter-sm q-mt-md">
            <div class="col-12 col-md-4">
                <q-input style="max-width: 300px;" v-model="denumireclinica" label="Denumire clinica" />
            </div>
            <div class="col-12 col-md-4">
                <q-input style="max-width: 250px;" v-model="sediuclinica" label="Adresa sediu" />
            </div>
            <div class="col-12 col-md-3">
                <q-input style="max-width: 250px;" v-model="emailclinica" label="Email clinica" />
            </div>
    </div>

    <div class="row justify-center q-gutter-sm q-mt-md">
            <div class="col-12 col-md-4">
                <q-input style="max-width: 250px;" v-model="facebook" label="Adresa Facebook" />
            </div>
            <div class="col-12 col-md-4">
                <q-input style="max-width: 250px;" v-model="instagram" label="Adresa Instagram" />
            </div>
            <div class="col-12 col-md-3">
                <q-input style="max-width: 250px;" v-model="website" label="Site web" />
            </div>
    </div>

    <div class="q-gutter-y-md q-mt-xl" >
        <q-card>
            <div class="row">

          
<q-tabs
          v-model="tab"
          dense
          vertical
          class="q-mt-md lt-sm text-grey col-xs-4"
          active-color="primary"
          indicator-color="primary"
          
          
        >
          <q-tab name="c1" label="Conducere 1" />
          <q-tab name="c2" label="Conducere 2" />
          <q-tab name="c3" label="Conducere 3" />
          <q-tab name="pr" label="Relatii publice" />
        </q-tabs>

       
        <q-banner class="col-12 gt-xs bg-grey-3">
            <template v-slot:avatar>
                <q-icon name="swipe_left" color="primary" />
            </template>
            Swipe pentru mai mult ...
            
         </q-banner>
        <q-tab-panels v-model="tab" swipeable animated infinite class="col-xs-8">
          <q-tab-panel name="c1">
            <div class="text-h6">Conducere 1</div>
            <div class="row q-gutter-sm q-mt-sm">
                <div class="col-12 col-md-4 ">
                    <q-input  dense v-model="numeconducere1" label="Nume" />
                </div>
                <div class="col-12 col-md-4 ">
                    <q-input dense v-model="emailconducere1" label="Adresa email" />
                </div>
                <div class="col-12 col-md-3 ">
                    <q-input  dense v-model="telconducere1" label="Telefon" />
                </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="c2">
            <div class="text-h6">Conducere 2</div>
            <div class="row q-gutter-sm q-mt-sm">
                <div class="col-12 col-md-4">
                    <q-input v-model="numeconducere2" label="Nume" />
                </div>
                <div class="col-12 col-md-4">
                    <q-input v-model="emailconducere2" label="Adresa email" />
                </div>
                <div class="col-12 col-md-3">
                    <q-input v-model="telconducere2" label="Telefon" />
                </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="c3">
            <div class="text-h6">Conducere 3</div>
            <div class="row q-gutter-sm q-mt-sm">
                <div class="col-12 col-md-4">
                    <q-input v-model="numeconducere3" label="Nume" />
                </div>
                <div class="col-12 col-md-4">
                    <q-input v-model="emailconducere3" label="Adresa email" />
                </div>
                <div class="col-12 col-md-3">
                    <q-input v-model="telconducere3" label="Telefon" />
                </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="pr">
            <div class="text-h6">Relatii publice</div>
            <div class="row q-gutter-sm q-mt-sm">
                <div class="col-12 col-md-4">
                    <q-input v-model="numepr" label="Nume" />
                </div>
                <div class="col-12 col-md-4">
                    <q-input v-model="emailpr" label="Adresa email" />
                </div>
                <div class="col-12 col-md-3">
                    <q-input v-model="telpr" label="Telefon" />
                </div>
            </div>
          </q-tab-panel>

        </q-tab-panels>
    </div>
      </q-card>
    </div>
    <div class="q-mt-xl flex flex-center"><q-btn  outline rounded color="primary" label="Salveaza!" @click="salveaza" /></div>
    </div>
    </q-page>
       
   
    

</template>

<script>
import { defineComponent,ref , reactive,inject,computed,onMounted} from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar'

const state = reactive({
   
    oClinica:{}
})

export default defineComponent({
    name:'Clinica',
    setup(){
        const global=inject('global');
        const bus=inject('bus');
        const token = global.state.user.token;
        const $q = useQuasar()
        const router =useRouter()
        let caleSigla=ref(process.env.host+global.state.user.clinica.fisiersigla)
        let uploadURL = ref(process.env.host+'uploadsigla')
        let denumireclinica=ref('');
        let sediuclinica=ref('');
        let emailclinica=ref('');
        let facebook=ref('');
        let instagram=ref('');
        let website=ref('');

        let numeconducere1=ref('');
        let telconducere1=ref('');
        let emailconducere1=ref('');

        let numeconducere2=ref('');
        let telconducere2=ref('');
        let emailconducere2=ref('');

        let numeconducere3=ref('');
        let telconducere3=ref('');
        let emailconducere3=ref('');

        let numepr=ref('');
        let telpr=ref('');
        let emailpr=ref('');

       let ff=ref([{name: 'idclinica', value: global.state.user.idclinica}])

       onMounted(()=>{
       // console.log('Detalii clinica mounted...',global.state.user.clinica.slug)
            axios.get(process.env.host+`clinici/${global.state.user.idclinica}`).then(

                        res => {
                        
                            denumireclinica.value=res.data.denumire;
                            sediuclinica.value=res.data.adresa;
                            emailclinica.value=res.data.email;
                            facebook.value=res.data.facebook;
                            instagram.value=res.data.instagram;
                            website.value=res.data.website;

                            numeconducere1.value=res.data.numeconducere1;
                            telconducere1.value=res.data.telconducere1;
                            emailconducere1.value=res.data.emailconducere1;

                            numeconducere2.value=res.data.numeconducere2;
                            telconducere2.value=res.data.telconducere2;
                            emailconducere2.value=res.data.emailconducere2;

                            numeconducere3.value=res.data.numeconducere3;
                            telconducere3.value=res.data.telconducere3;
                            emailconducere3.value=res.data.emailconducere3;

                            numepr.value=res.data.numepr;
                            telpr.value=res.data.telpr;
                            emailpr.value=res.data.emailpr;

                        })


                        .catch(err =>{})
         })

        function siglaUrcata(info){
          console.log('Sigla urcata',JSON.parse(info.xhr.response).numefisier)
          let numefisier=JSON.parse(info.xhr.response).numefisier
          caleSigla.value=process.env.host+'/sigle/'+numefisier;
        }

        function onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
                $q.notify({
                    type: 'negative',
                    message: `Imagine invalida sau dimensiune fisier > 1Mb!`
                })
    }

        function salveaza(){
         
       
           let clinica_modificata={
            adresa: sediuclinica.value,
            denumire: denumireclinica.value,
            email:  emailclinica.value,
            emailconducere1: emailconducere1.value,
            emailconducere2: emailconducere2.value,
            emailconducere3: emailconducere3.value,
            emailpr: emailpr.value,
            facebook: facebook.value,
            instagram: instagram.value,
            numeconducere1: numeconducere1.value,
            numeconducere2: numeconducere2.value,
            numeconducere3: numeconducere3.value,
            numepr: numepr.value,
            telconducere1: telconducere1.value,
            telconducere2: telconducere2.value,
            telconducere3: telconducere3.value,
            telpr: telpr.value,
            website: website.value,
           }
         
          console.log('SALVEZ MODIFICARI CLINICA!')
          axios.patch(process.env.host+`clinici/${global.state.user.idclinica}`,clinica_modificata,{headers:{"Authorization" : `Bearer ${token}`}}).then(res =>{
           
                             if(res.data.errors)
                                      {$q.notify({
                                                     message:'EROARE! Cod: '+res.data.errors.errors[0].message,
                                                     timeout:3000,
                                                     position:'top',
                                                     color:'negative'
                                                     }) }
                                else
                                 {$q.notify({
                                     message:'Clinica actualizata cu succes!',
                                     timeout:2000,
                                     position:'top',
                                     color:'positive'
                                     }) 
                                     bus.emit('succes-autentificare',{},global.state.user.clinica)
                                    router.push('/'+global.state.user.clinica.slug)
                                    }

                                         }).catch(err=>{
                                             console.log(err)
                                                  $q.notify({
                                                     message:'EROARE! Cod: '+res.data.errors.errors[0].message,
                                                     timeout:3000,
                                                     position:'top',
                                                     color:'negative'
                                                     }) 
                                         })
        }

        return {
            global,
            state,
            caleSigla,
            uploadURL,
            tab:ref('c1'),
            siglaUrcata,
            ff,
            onRejected,
            salveaza,
            denumireclinica,
            sediuclinica,
            emailclinica,
            facebook,
            instagram,
            website,
            numeconducere1,
            telconducere1,
            emailconducere1,
            numeconducere2,
            telconducere2,
            emailconducere2,
            numeconducere3,
            telconducere3,
            emailconducere3,
            numepr,
            telpr,
            emailpr
        }
    }
})
</script>
<style>
.peri {
    border: 1px solid black;
}
</style>