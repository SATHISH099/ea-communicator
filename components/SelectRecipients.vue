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
const searchRecipient = ref('');
const searchGroup = ref('');
const type = ref<string>('recipients');
const config = useRuntimeConfig();

const { data: recipients, refresh: refreshRecipient } = await useFetch<any>(
  () => `recipients?search=${searchRecipient.value}&pageNumber=1&pageSize=10`,
  {
    baseURL: config.public.API_SMARTSUITE_BASEURL,
  },
);

const { data: groups, refresh: refreshGroup } = await useFetch<any>(
  () => `groups?search=${searchGroup.value}&pageNumber=1&pageSize=10`,
  {
    baseURL: config.public.API_SMARTSUITE_BASEURL,
  },
);

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
      <div
        class="shadow-[0_6px_12px_#F7F7F7] border-solid border border-[#F5F7FA] rounded-[4px] pb-5 max-h-[313px] overflow-y-auto"
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
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3 mt-10">
        <span
          class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
          v-for="recipient in form.recipients"
          :key="recipient.id"
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
          class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] mr-3 text-primary"
          v-for="group in form.groups"
          :key="group.id"
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
