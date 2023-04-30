<script setup>
const props = defineProps(['detailId', 'type', 'dropDownOption', 'actions']);
const emit = defineEmits(['onDeleteRecord']);
const show = ref(false);
const user = useCurrentUser();

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
      :delete-id="props.detailId"
      @onDeleteRecord="onDeleteRecord"
      @hideModal="hideModal"
    ></DeleteRecord>

    <div class="dropdown relative text-right">
      <ul
        class="list-none ml-auto w-[140px] flex items-center justify-center text-gray-900"
      >
        <li v-if="props.dropDownOption.isView" class="p-2">
          <NuxtLink
            :to="{
              path:
                props.actions.view
                  ?.replace('[module]', props.type)
                  ?.replace('[id]', props.detailId) ||
                `${$route.path.split('/').slice(0, -1).join('/')}/${
                  props.type
                }/${props.detailId}`,
            }"
            title="View"
          >
            <svg
              id="Layer_1"
              class="w-[20px]"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 122.88 68.18"
            >
              <path
                class="cls-1"
                d="M61.44,13.81a20.31,20.31,0,1,1-14.34,6,20.24,20.24,0,0,1,14.34-6ZM1.05,31.31A106.72,106.72,0,0,1,11.37,20.43C25.74,7.35,42.08.36,59,0s34.09,5.92,50.35,19.32a121.91,121.91,0,0,1,12.54,12,4,4,0,0,1,.25,5,79.88,79.88,0,0,1-15.38,16.41A69.53,69.53,0,0,1,63.43,68.18,76,76,0,0,1,19.17,53.82,89.35,89.35,0,0,1,.86,36.44a3.94,3.94,0,0,1,.19-5.13Zm15.63-5A99.4,99.4,0,0,0,9.09,34,80.86,80.86,0,0,0,23.71,47.37,68.26,68.26,0,0,0,63.4,60.3a61.69,61.69,0,0,0,38.41-13.72,70.84,70.84,0,0,0,12-12.3,110.45,110.45,0,0,0-9.5-8.86C89.56,13.26,74.08,7.58,59.11,7.89S29.63,14.48,16.68,26.27Zm39.69-7.79a7.87,7.87,0,1,1-7.87,7.87,7.86,7.86,0,0,1,7.87-7.87Z"
              />
            </svg>
          </NuxtLink>
        </li>

        <li v-if="props.dropDownOption.isEdit" class="p-2">
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
            title="Edit"
          >
            <svg
              class="w-[20px]"
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 506 511.95"
            >
              <path
                fill-rule="nonzero"
                d="M400.08 26.04c-1.82-1.81-3.72-3.14-5.7-3.97-1.89-.8-4.05-1.2-6.47-1.2-2.38 0-4.52.41-6.4 1.21-1.95.83-3.83 2.15-5.63 3.96l-36.73 36.73 104.11 104.57 37.22-37.22c1.55-1.54 2.69-3.29 3.44-5.18l.15-.38c.71-1.96 1.06-4.17 1.06-6.56 0-2.49-.4-4.82-1.22-6.89l-.22-.62c-.74-1.64-1.79-3.16-3.16-4.52l-80.45-79.93zM69.03 332.8l105.03 103.23 215.22-215.22-104.09-104.17L69.03 332.8zm86.27 113.97-96.28-94.62-27.86 99.15c-4.45 15.91-7.46 28.06-9.05 36.44 19.79-5.98 40.2-11.61 59.73-18.29 10.75-3.39 21.78-6.87 39.25-12.28l24.1-7.34 10.11-3.06zM402.45 2.91c4.5 1.89 8.61 4.69 12.3 8.37l80.45 79.93c3.35 3.33 5.9 7.12 7.68 11.27l.43.96c1.81 4.57 2.69 9.48 2.69 14.56 0 4.87-.8 9.56-2.45 13.97l-.23.63c-1.79 4.53-4.47 8.67-8.08 12.28l-44.64 44.6c-4.07 4.05-10.66 4.03-14.71-.04L317.04 70.11c-4.07-4.07-4.07-10.68 0-14.76l44.08-44.07c3.65-3.66 7.72-6.45 12.23-8.36C377.92.98 382.77 0 387.91 0c5.1 0 9.94.97 14.54 2.91zM174.77 462.66l-23.54 7.07-24.03 7.32c-30.42 9.57-60.67 18.96-91.16 28.28-10.56 3.19-17.58 5.27-20.89 6.17-1.41.4-2.83.54-4.3.39-6.12-.62-9.68-4.3-10.63-11.06-.33-2.28-.28-5.21.13-8.77 1.03-9 4.62-24.47 10.75-46.39l32.27-114.82c.5-1.78 1.43-3.33 2.66-4.55L277.79 94.52c4.07-4.07 10.68-4.07 14.76 0l118.84 118.97c4.05 4.07 4.03 10.65-.02 14.7l-231.66 231.7a10.373 10.373 0 0 1-4.94 2.77z"
              />
            </svg>
          </NuxtLink>
        </li>

        <li v-if="props.type === 'groups' && user.hasRole('admin')" class="p-2">
          <NuxtLink
            :to="{
              path:
                props.actions.edit
                  ?.replace('[module]', props.type)
                  ?.replace('[id]', props.detailId) ||
                `${$route.path.split('/').slice(0, -1).join('/')}/${
                  props.type
                }/edit/${props.detailId}`,
              query: { type: 'clone' },
            }"
            title="Clone"
          >
            <svg
              class="w-[20px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 16.75H6C5.27065 16.75 4.57118 16.4603 4.05546 15.9445C3.53973 15.4288 3.25 14.7293 3.25 14V6C3.25 5.27065 3.53973 4.57118 4.05546 4.05546C4.57118 3.53973 5.27065 3.25 6 3.25H14C14.7293 3.25 15.4288 3.53973 15.9445 4.05546C16.4603 4.57118 16.75 5.27065 16.75 6V14C16.75 14.7293 16.4603 15.4288 15.9445 15.9445C15.4288 16.4603 14.7293 16.75 14 16.75ZM6 4.75C5.66848 4.75 5.35054 4.8817 5.11612 5.11612C4.8817 5.35054 4.75 5.66848 4.75 6V14C4.75 14.3315 4.8817 14.6495 5.11612 14.8839C5.35054 15.1183 5.66848 15.25 6 15.25H14C14.3315 15.25 14.6495 15.1183 14.8839 14.8839C15.1183 14.6495 15.25 14.3315 15.25 14V6C15.25 5.66848 15.1183 5.35054 14.8839 5.11612C14.6495 4.8817 14.3315 4.75 14 4.75H6Z"
                fill="#000000"
              />
              <path
                d="M18 20.75H10C9.27065 20.75 8.57118 20.4603 8.05546 19.9445C7.53973 19.4288 7.25 18.7293 7.25 18V16H8.75V18C8.75 18.3315 8.8817 18.6495 9.11612 18.8839C9.35054 19.1183 9.66848 19.25 10 19.25H18C18.3315 19.25 18.6495 19.1183 18.8839 18.8839C19.1183 18.6495 19.25 18.3315 19.25 18V10C19.25 9.66848 19.1183 9.35054 18.8839 9.11612C18.6495 8.8817 18.3315 8.75 18 8.75H16V7.25H18C18.7293 7.25 19.4288 7.53973 19.9445 8.05546C20.4603 8.57118 20.75 9.27065 20.75 10V18C20.75 18.7293 20.4603 19.4288 19.9445 19.9445C19.4288 20.4603 18.7293 20.75 18 20.75Z"
                fill="#000000"
              />
            </svg>
          </NuxtLink>
        </li>

        <li v-if="props.dropDownOption.isDelete" class="p-2">
          <button
            class="bg-transparent border-none cursor-pointer"
            type="button"
            @click="deleteShow()"
            title="Delete"
          >
            <svg
              id="Layer_1"
              class="w-[15px]"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 105.16 122.88"
            >
              <path
                class="cls-1"
                d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"
              />
            </svg>
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
