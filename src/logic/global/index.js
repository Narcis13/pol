import {reactive} from 'vue'

const state = reactive({
    user:{
        autentificat:false,
        nume:'',
        nume_intreg:'',

        rol:null,
        
        idutilizator:0,
        idclinica:0

    }
})

const actions = {
     autentificare(user){
         console.log('!Autentificare: ',user)

         state.user.autentificat=true;
        
         state.user.nume=user.nume;
         state.user.nume_intreg=user.numeintreg;
         state.user.rol=user.rol;
         state.user.idutilizator=user.id;
         state.user.idclinica=user.idclinica;
   
     },
     deconectare(){
        state.user.autentificat=false
     }
}

export default {
    state,
    actions
}