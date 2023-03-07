<script lang="ts" setup>
interface RecipientData {
  id: number;
  firstName: string;
  lastName: string;
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

const { data, refresh } = await useFetch<any>(
  () =>
    `${type.value}?search=${
      type.value === 'recipients' ? searchRecipient.value : searchGroup.value
    }&pageNumber=1&pageSize=10`,
  {
    baseURL: config.public.API_SMARTSUITE_BASE_URL,
  },
);

const initialState: initialStateData = {
  recipients: props.recipients || [],
  groups: props.groups || [],
};
const form = reactive({ ...initialState });

const searchRecipients = () => {
  type.value = 'recipients';
  refresh();
};

const searchGroups = () => {
  type.value = 'groups';
  refresh();
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
    <div flex items-center gap-3>
      <div px-6 pt-6>
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

      <div px-6 pt-6>
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
      <table class="relative">
        <tbody>
          <tr>
            <td>
              <FormKit
                v-if="type === 'recipients'"
                v-model="form.recipients"
                type="checkbox"
                :options="
                  data.data.map((recipientItem: RecipientData) => {
                    return {
                      value: recipientItem,
                      label: `${recipientItem.firstName} ${recipientItem.lastName}`,
                    };
                  })
                "
                outer-class="radio-fieldset"
                input-class="form-check-input"
              />

              <FormKit
                v-if="type === 'groups'"
                v-model="form.groups"
                type="checkbox"
                :options="
                  data.data.map((groupItem: GroupData) => {
                    return {
                      value: groupItem,
                      label: `${groupItem.groupName}`,
                    };
                  })
                "
                outer-class="radio-fieldset"
                input-class="form-check-input"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <span v-for="recipient in form.recipients" :key="recipient.id">
          {{ recipient.firstName }} {{ recipient.lastName }}
          <button
            @click="removeFromRecipient(recipient.id)"
            class="text-primary hover:underline"
            type="button"
          >
            X
          </button>
        </span>

        <span v-for="group in form.groups" :key="group.id">
          {{ group.groupName }}
          <button
            @click="removeFromGroup(group.id)"
            class="text-primary hover:underline"
            type="button"
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
