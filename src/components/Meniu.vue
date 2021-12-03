+<template>
        <q-card class="my-card">
      <q-card-section>
       <q-list bordered>
          <q-expansion-item
            group="somegroup"
            icon="explore"
            label="CONFIGURARE"
            default-opened
            header-class="text-primary"
          >
            <q-card>
              <q-card-section>
                  <q-btn class="full-width q-ma-xs" color="indigo"  to="a" no-caps>
                    Cabinete
                  </q-btn>
                  <q-btn class="full-width q-ma-xs" color="indigo" to="l" no-caps>
                     Indisponibilitati<br>Medici
                  </q-btn>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item group="somegroup" icon="perm_identity" label="PROGRAMARI" header-class="text-teal">
            <q-card>
              <q-card-section>

                  <q-btn class="full-width q-ma-xs" color="teal" no-caps>
                    Administrare<br>Programari
                  </q-btn>

              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item group="somegroup" icon="shopping_cart" label="ADMINISTRARE" header-class="text-purple">
            <q-card>
              <q-card-section>
                 <q-btn class="full-width q-ma-xs" color="purple" no-caps>
                    Utilizatori
                  </q-btn>
                  <q-btn class="full-width q-ma-xs" color="purple" no-caps>
                    Specialitati
                  </q-btn>
                  <q-btn class="full-width q-ma-xs" color="purple" no-caps>
                    Servicii
                  </q-btn>
                  <q-btn class="full-width q-ma-xs" color="purple" no-caps>
                    Medici
                  </q-btn>
                  <q-btn class="full-width q-ma-xs" color="purple" no-caps>
                    Cabinete
                  </q-btn>
                 <q-btn class="full-width q-ma-xs" color="purple" no-caps>
                   Administrare<br>Solicitari
                  </q-btn>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          
        </q-list>
      </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name:'Meniu'
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>