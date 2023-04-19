<script lang="ts" setup>
interface RecipientData {
  id: number;
  name: string;
}

interface GroupData {
  id: number;
  groupName: string;
}

interface initialStateData {
  recipients: RecipientData[];
  groups: GroupData[];
}

const props = defineProps(['recipients', 'groups']);
defineEmits(['setGroupsRecipients']);
const { setLoader } = useLoader();

const recipientService = useService('recipient');
if (process.client) {
  recipientService.setAuth();
}

const groupService = useService('group');
if (process.client) {
  groupService.setAuth();
}

const searchRecipient = ref('');
const searchGroup = ref('');
const groupPageNumber = ref(1);
const groupPageSize = ref(10);
const recipientPageNumber = ref(1);
const recipientPageSize = ref(10);
const type = ref<string>('recipients');

setLoader(true);
const { data: recipients, refresh: refreshRecipient } = await useAsyncData(
  () =>
    recipientService.getAll({
      search: searchRecipient.value,
      pageSize: recipientPageSize.value,
      pageNumber: recipientPageNumber.value,
    }),
  {
    server: false,
  },
);

const { data: groups, refresh: refreshGroup } = await useAsyncData(
  () =>
    groupService.getAll({
      search: searchRecipient.value,
      pageSize: groupPageSize.value,
      pageNumber: groupPageNumber.value,
    }),
  {
    server: false,
  },
);

setLoader(false);
const initialState: initialStateData = {
  recipients: props.recipients || [],
  groups: props.groups || [],
};
const form = reactive({ ...initialState });

const searchRecipients = () => {
  type.value = 'recipients';
  refreshRecipient();
};

const searchGroups = () => {
  type.value = 'groups';
  refreshGroup();
};

const removeFromRecipient = (id: number) => {
  form.recipients = form.recipients.filter(function (recipient: RecipientData) {
    return recipient.id !== id;
  });
};

const removeFromGroup = (id: number) => {
  form.groups = form.groups.filter(function (group) {
    return group.id !== id;
  });
};

const viewMoreRecipient = () => {
  if (
    Math.ceil(recipients.value.total / recipientPageSize.value) >
    recipientPageNumber.value
  ) {
    recipientPageNumber.value++;
    recipientPageSize.value += 10;
    --recipientPageNumber.value;
    refreshRecipient();
  }
};

const viewMoreGroup = () => {
  if (
    Math.ceil(groups.value.total / groupPageSize.value) > groupPageNumber.value
  ) {
    groupPageNumber.value++;
    groupPageSize.value += 10;
    --groupPageNumber.value;
    refreshGroup();
  }
};
</script>

<template>
  <div>
    <div grid md:grid-cols-2 grid-cols-1 gap-4 mb-5>
      <div w-full>
        <FormKit
          v-model="searchRecipient"
          prefix-icon="search"
          type="search"
          placeholder="Search Recipient"
          input-class="form-control pl-[3.5rem]"
          prefix-icon-class="search-icon"
          @change="searchRecipients"
        />
      </div>
      <div w-full>
        <FormKit
          v-model="searchGroup"
          prefix-icon="search"
          type="search"
          placeholder="Search Group"
          input-class="form-control pl-[3.5rem]"
          prefix-icon-class="search-icon"
          @change="searchGroups"
        />
      </div>
    </div>
    <div>
      <!--  -->
      <div
        id="recipientsDiv"
        class="grid grid-cols-2 gap-4 shadow-[0_6px_12px_#F7F7F7] border-solid border border-[#F5F7FA] rounded-[4px] pb-5 max-h-[313px] overflow-y-auto"
      >
        <div>
          <h6 class="text-[#B42424] font-medium mb-4 px-[1rem] pt-[1rem]">
            Recipients
          </h6>
          <FormKit
            v-model="form.recipients"
            type="checkbox"
            :options="
                  recipients.data.map((recipientItem: RecipientData) => {
                    return {
                      value: recipientItem,
                      label: `${recipientItem.name}`,
                    };
                  })
                "
            outer-class="recipient-list"
            input-class="form-check-input mr-2"
          />
          <span
            class="text-primary hover:no-underline mt-2 cursor-pointer flex justify-center"
            @click="viewMoreRecipient"
          >
            View More</span
          >
        </div>
        <div>
          <h6 class="text-[#B42424] font-medium mb-4 px-[1rem] pt-[1rem]">
            Groups
          </h6>
          <FormKit
            v-model="form.groups"
            type="checkbox"
            :options="
                  groups.data.map((groupItem: GroupData) => {
                    return {
                      value: groupItem,
                      label: `${groupItem.groupName}`,
                    };
                  })
                "
            outer-class="recipient-list"
            input-class="form-check-input mr-2"
          />
          <span
            class="text-primary hover:no-underline mt-2 cursor-pointer flex justify-center"
            @click="viewMoreGroup"
          >
            View More</span
          >
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3 mt-10">
        <span
          v-for="recipient in form.recipients"
          :key="recipient.id"
          class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
        >
          {{ recipient.name }}
          <button
            class="border-none outline-none bg-transparent text-primary mr-2"
            type="button"
            @click="removeFromRecipient(recipient.id)"
          >
            X
          </button>
        </span>

        <span
          v-for="group in form.groups"
          :key="group.id"
          class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] mr-3 text-primary"
        >
          {{ group.groupName }}
          <button
            type="button"
            class="border-none outline-none bg-transparent text-primary mr-2"
            @click="removeFromGroup(group.id)"
          >
            X
          </button>
        </span>
      </div>
    </div>
    <div flex justify-end mt-5>
      <button
        class="btn btn-primary"
        type="button"
        @click="$emit('setGroupsRecipients', form.recipients, form.groups)"
      >
        Add
      </button>
    </div>
  </div>
</template>
