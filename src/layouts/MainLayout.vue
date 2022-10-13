<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
            <div>
            Programari online servicii medicale
            </div>
        </q-toolbar-title>
        <div>v. 0.9.7</div>
    
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1 "

    >
    <div class="column items-center">
       <q-input v-show="!global.state.user.autentificat" class="q-mt-md" v-model="username" filled dense label="Utilizator" />
       <q-input v-show="!global.state.user.autentificat" class="q-mt-md" v-model="password" filled dense type="password" label="Parola" />
       <q-btn v-show="!global.state.user.autentificat" class="q-ma-md col" outline rounded color="primary" label="Autentificare" @click="autentificare"/>
    
      <q-card class="col my-card" v-show="global.state.user.autentificat">
        <q-card-section>
          <div class="text-h6">{{global.state.user.nume}}</div>
          <div class="text-subtitle2">{{global.state.user.rol}}</div>
          <div class="text-subtitle2">{{global.state.user.nume_intreg}}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical>
          <q-btn :to="'/'+slug" flat @click="global.actions.deconectare">Deconectare!</q-btn>

        </q-card-actions>
    </q-card>

         <Meniu v-show="global.state.user.autentificat" class="q-mt-md col"/>
    </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Meniu from 'components/Meniu.vue'
import { defineComponent, ref ,inject} from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Meniu
  },

  setup () {
    const leftDrawerOpen = ref(false)
   
    const username = ref("")
    const password = ref("")
    const global=inject('global');
    const bus = inject('bus') 
    const $q = useQuasar()
    let slug=ref('')
      console.log('MainLayout!')
      bus.on('ruta-stabilita',s=>{
        console.log('Receptionat ruta-stabilita in MainLayout',s)
        slug.value=s;
      })
    return {
     
      leftDrawerOpen,
      username,
      password,
      global,
      slug,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      autentificare(){
        console.log('Tentativa de autentificare...',process.env.host)

                  axios.post(process.env.host+'login',{nume:username.value,password:password.value,slug:slug.value}).then(
                      res => {
                        console.log('Raspuns la autentificare ',res)
                        username.value=''
                        password.value=''
                        if(res.data.loggeduser){
                         $q.notify({
                                  message:'Utilizator autentificat cu succes!',
                                  timeout:2000,
                                  position:'top',
                                  color:'positive'
                                }) 

                            global.actions.autentificare(res.data.loggeduser,res.data.token.token,res.data.clinica)
                            bus.emit('succes-autentificare',res.data.loggeduser,res.data.clinica)
                            slug.value=res.data.clinica.slug
                        }
                        else
                        {
                          $q.notify({
                                  message:'Credentiale incorecte!',
                                  timeout:2000,
                                  position:'top',
                                  color:'negative'
                                }) 
                        }

                      }
              ).catch(err=>{
                username.value=''
                password.value=''
                    $q.notify({
                              color: 'negative',
                              timeout:1500,
                              position:'top',
                              icon: 'delete',
                              message: `User sau parola incorecte...`
                            })
                console.log('Eroare autentificare',err);
              });
      },
    
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>