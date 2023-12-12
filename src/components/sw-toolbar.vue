<template>
    <div class='text-semi-bold username'>
      <div>Hello, {{ formattedName }}</div>
    </div>
    <div class='avatar' data-cy='avatar' @click='emitOpenSetting'>
      <q-avatar v-if='imgSrc' size='70px'>
        <img :src='imgSrc' />
      </q-avatar>
    </div>
  </template>
  
  <script lang='ts'>

  import { defineComponent, computed } from 'vue'
  
  export default defineComponent({
    name: 'swToolbar',
    props: {
      cyname: {
        type: String,
        required: true
      },
      imgSrc: {
        type: String,
        required: false
      },
      username: {
        type: String,
        required: true
      },
    },
    emits: ['click', 'openSetting'],
    setup(props, { emit }) {
      const dataCySelectName = computed(() =>
        props.cyname.length ? props.cyname : undefined
      )
      const formattedName = computed(() => {
        return props.username
      })
  
      const emitOpenSetting = () => {
        emit('openSetting')
      }
  
      return {
        formattedName,
        dataCySelectName,
        emitOpenSetting
      }
    }
  })
  </script>
  