<script lang="ts" setup>
const props = defineProps<{ show?: boolean; deleteId?: boolean; data: any }>();
const emit = defineEmits(['confirm', 'close']);
const current = ref<any>(props.data);

watch(props.data, () => {
  current.value = props.data;
});

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div>
    <div v-if="props.show">
      <div
        class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 z-10"
      >
        <div
          class="overflow-y-auto h-[91%] md:w-[50%] w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white pt-[2.5rem] rounded-[0.25rem] shadow-[0_0_10px_rgba(0,0,0,0.1)] px-[3rem]"
        >
          <div w-full>
            <div flex justify-between right-0 top-1 mb-8>
              <div>
                <h4 class="text-stone">View Details</h4>
              </div>
              <button
                @click="closeModal"
                bg-transparent
                border-0
                cursor-pointer
                p-0
              >
                <img src="/close.png" alt="close" />
              </button>
            </div>
            <div class="md:flex gap-24 modal-border pb-8">
              <div>
                <div class="mb-10">
                  <h5 text-stone mb-3>First Name</h5>
                  <p class="text-stone text-[16px]">{{ data.name }}</p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Last Name</h5>
                  <p class="text-stone text-[16px]">
                    {{ data.name }}
                  </p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Mobile Phone For Last Call</h5>
                  <p class="text-stone text-[16px]">{{ data.cellVoice }}</p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Home Phone Number</h5>
                  <p class="text-stone text-[16px]">{{ data.homeNumber }}</p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Primary Email</h5>
                  <p class="text-stone text-[16px]">
                    {{ data.alternateEmail }}
                  </p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Address</h5>
                  <p class="text-stone text-[16px]">
                    {{ data.emailAddress }}
                  </p>
                </div>
              </div>
              <div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Middle Name</h5>
                  <p class="text-stone text-[16px]">
                    {{ data.name }}
                  </p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Nick Name</h5>
                  <p class="text-stone text-[16px]">
                    {{ data.alternateEmail }}
                  </p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Mobile Phone For SMS</h5>
                  <p class="text-stone text-[16px]">{{ data.cellText }}</p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Work Phone Number</h5>
                  <p class="text-stone text-[16px]">{{ data.workNumber }}</p>
                </div>
                <div class="mb-10">
                  <h5 text-stone mb-4>Alternate Email</h5>
                  <p class="text-stone text-[16px]">
                    {{ data.alternateEmail }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex justify-end mt-8 mb-8">
              <NuxtLink
                :to="{
                  path: `/recipients-and-groups/recipients/edit/${data.id}`,
                }"
                class="btn btn-primary"
                >Edit</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-border {
  border-bottom: 1px solid #cdcdcd;
}
</style>
