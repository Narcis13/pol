<template>
    <q-page padding>

            <div class="row q-gutter-lg">
             
                    <q-img
                        :src="caleSigla"
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
                        color="teal"
                        label="Schimba sigla"
                        flat
                        bordered
                        @uploaded="siglaUrcata"
                        style="max-width: 300px"
                 />
               
            </div>

        <div class="row q-gutter-lg q-mt-md">
            <div class=".col-12 .col-md-4">
                <q-input  label="Denumire clinica" />
            </div>
            <div class=".col-12 .col-md-4">
                <q-input  label="Adresa sediu" />
            </div>
            <div class=".col-12 .col-md-4">
                <q-input  label="Email clinica" />
            </div>
    </div>

    <div class="row q-gutter-lg q-mt-md">
            <div class=".col-12 .col-md-4">
                <q-input  label="Adresa Facebook" />
            </div>
            <div class=".col-12 .col-md-4">
                <q-input  label="Adresa Instagram" />
            </div>
            <div class=".col-12 .col-md-4">
                <q-input  label="Adresa Youtube" />
            </div>
    </div>


    </q-page>
       
   
    

</template>

<script>
import { defineComponent,ref , reactive,inject,computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

const state = reactive({
   
    oClinica:{}
})

export default {
    setup(){
        const global=inject('global');
        let caleSigla=ref(process.env.host+global.state.user.clinica.fisiersigla)
        let uploadURL = ref(process.env.host+'uploadsigla')
       let ff=ref([{name: 'idclinica', value: global.state.user.idclinica}])

        function siglaUrcata(info){
          console.log('Sigla urcata',JSON.parse(info.xhr.response).numefisier)
          let numefisier=JSON.parse(info.xhr.response).numefisier
          caleSigla.value=process.env.host+'/sigle/'+numefisier;
        }

        return {
            state,
            caleSigla,
            uploadURL,
            siglaUrcata,
            ff
        }
    }
}
</script>

/*

`id` int(11) NOT NULL AUTO_INCREMENT,
`denumire` varchar(100) NOT NULL,
`fisiersigla` varchar(45) DEFAULT NULL,
`adresa` varchar(100) NOT NULL,
`email` varchar(45) NOT NULL,
`facebook` varchar(45) DEFAULT NULL,
`instagram` varchar(45) DEFAULT NULL,
`youtube` varchar(45) DEFAULT NULL,
`numeconducere1` varchar(45) DEFAULT NULL,
`numeconducere2` varchar(45) DEFAULT NULL,
`numeconducere3` varchar(45) DEFAULT NULL,
`telconducere1` varchar(15) DEFAULT NULL,
`telconducere2` varchar(15) DEFAULT NULL,
`telconducere3` varchar(15) DEFAULT NULL,
`emailconducere1` varchar(45) DEFAULT NULL,
`emailconducere2` varchar(45) DEFAULT NULL,
`emailconducere3` varchar(45) DEFAULT NULL,
`numePR` varchar(45) DEFAULT NULL,
`telPR` varchar(15) DEFAULT NULL,
`emailPR` varchar(45) DEFAULT NULL,
`website` varchar(45) DEFAULT NULL,
`urlpol` varchar(45) DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`slug` varchar(30) NOT NULL,


*/