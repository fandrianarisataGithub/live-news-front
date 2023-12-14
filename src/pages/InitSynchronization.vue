<template>
  <div class="row justify-center">
    <div>
      <div class="col-8 col-sm-6 col-xs-11 q-mt-lg q-mb-lg">
        <div class="row items-center justify-between">
          <sw-toolbar
            cyname="header"
            :username="currentUser"
            :imgSrc="currentUser.img"
            @openSetting="openSetting"
          />
        </div>
      </div>
      <div class="column justify-center">
        <div class="h5 q-mb-lg row items-center justify-center">Loading...</div>
        <q-linear-progress
          class="q-mb-lg"
          size="24px"
          rounded
          :value="itemsLoadingProgressionValue"
          color="primary"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="primary"
              :label="`${itemsLoadingProgression}%`"
            />
          </div>
        </q-linear-progress>
        <div class="h5 row no-wrap items-center justify-center">
          <div>
            Make sure you have good network quality while loading the app data
          </div>
        </div>
        <div class="row q-mt-md justify-center">
          <q-btn
            :label="'Cancel'"
            icon="cancel"
            color="primary"
            @click="cancelSync"
          ></q-btn>
        </div>
      </div>
    </div>
    <OnlineCheck></OnlineCheck>
  </div>
</template>
<script>
import { defineComponent, computed, onMounted, watch } from 'vue';
import SwToolbar from 'src/components/sw-toolbar.vue';
import { useSyncState } from './../stores/sync';
import { SessionStorage } from 'quasar';
import { useRouter } from 'vue-router';
import OnlineCheck from 'src/components/OnlineCheck.vue';

export default defineComponent({
  name: 'initSynchronization',
  components: { SwToolbar, OnlineCheck },

  setup() {
    const syncState = useSyncState();
    const $router = useRouter();

    const currentUser = computed(() => SessionStorage.getItem('loggedUser'));
    const itemsLoadingProgression = computed(
      () => syncState.getItemsLoadingProgression
    );
    const itemsLoadingProgressionValue = computed(
      () => syncState.getItemsLoadingProgressionValue
    );

    watch(itemsLoadingProgression, () => {
      if (itemsLoadingProgression.value == 100) {
        void $router.push('/');
      }
    });
    onMounted(() => {
      syncState.simulateProgression();
    });
    return {
      currentUser,
      itemsLoadingProgression,
      itemsLoadingProgressionValue,
    };
  },
});
</script>
