<script setup>
const props = defineProps(['detailId', 'type', 'dropDownOption', 'actions']);
const emit = defineEmits(['onDeleteRecord']);
const isOpen = ref(false);
const show = ref(false);

const deleteShow = () => {
  show.value = true;
};

const hideModal = () => {
  show.value = false;
};

const onDeleteRecord = (deleteId) => {
  hideModal();
  if (typeof props.actions.delete === 'function') {
    props.actions.delete(deleteId);
  }

  emit('onDeleteRecord', deleteId);
};
</script>

<template>
  <div>
    <DeleteRecord
      v-if="props.dropDownOption.isDelete"
      :entity="`${props.type}`"
      :show="show"
      :deleteId="props.detailId"
      @onDeleteRecord="onDeleteRecord"
      @hideModal="hideModal"
    ></DeleteRecord>

    <div class="dropdown relative text-right">
      <img
        tabindex="0"
        class="cursor-pointer"
        src="/EditIcon.png"
        @click="isOpen = !isOpen"
        v-click-away="($event) => (isOpen = false)"
      />
      <ul
        v-show="isOpen"
        class="dropdown-menu z-10 absolute top-[30px] -right-[30px] bg-stone px-[12px] py-[4px] rounded-[4px] cursor-pointer text-white list-style-none"
      >
        <NuxtLink
          v-if="props.dropDownOption.isView"
          :to="{
            path:
              props.actions.view
                ?.replace('[module]', props.type)
                ?.replace('[id]', props.detailId) ||
              `${$route.path.split('/').slice(0, -1).join('/')}/${props.type}/${
                props.detailId
              }`,
          }"
          class="p-2 text-white"
          >View</NuxtLink
        >

        <li class="p-2" v-if="props.dropDownOption.isEdit">
          <NuxtLink
            :to="{
              path:
                props.actions.edit
                  ?.replace('[module]', props.type)
                  ?.replace('[id]', props.detailId) ||
                `${$route.path.split('/').slice(0, -1).join('/')}/${
                  props.type
                }/edit/${props.detailId}`,
            }"
            class="p-2 text-white"
            >Edit</NuxtLink
          >
        </li>
        <li class="p-2" v-if="props.dropDownOption.isDelete">
          <button
            @click="deleteShow()"
            class="bg-transparent border-none text-white cursor-pointer"
            type="button"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.dropdown-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #555555;
  color: white;
  border: 1px solid white;
  border-radius: 6px;
  padding: 4px 8px 4px 8px;
  position: absolute;
  cursor: pointer;
  list-style: none;
}
.dropdown-menu:after {
  position: absolute;
  content: '';
  left: 50%;
  top: -4px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #555555;
  transform: translate(-50%, -50%);
}
</style>
