<template>
    <q-timeline layout="dense" side="right" color="secondary">
      <q-timeline-entry heading>Luni</q-timeline-entry>

      <q-timeline-entry
        title="Event Title"
        subtitle="February 22, 1986"
        side="left"
      >
        <div>
          Lorem ipsum dolor 
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Event Title"
        subtitle="February 21, 1986"
        side="right"
        icon="delete"
      >
        <div>
          Lorem ipsum dolor 
        </div>
      </q-timeline-entry>

     
    </q-timeline>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name:'ZiCabinet',
    setup(){
        
    }
})
</script>