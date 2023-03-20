<script lang="ts" setup>
const config = useRuntimeConfig();

interface RecipientData {
  id: number;
  name: string;
}

interface initialStateData {
  groupName: string;
  status: boolean;
  notes: string;
  location: number;
  deviceId: string;
}

const groupService = useService('group');
if (process.client) {
  groupService.setAuth();
}
const { id: groupId } = useRoute().params;
const statuses = ['Inactive', 'active'];

const locations = await $fetch<{ data: any[]; total: number }>(`/locations`, {
  baseURL: useRuntimeConfig().public.API_SMARTSUITE_BASEURL,
});

const { data: groupDetail } = await useFetch<any>(() => `groups/${groupId}`, {
  baseURL: config.public.API_SMARTSUITE_BASEURL,
});

const record = groupDetail.value;
const initialState: initialStateData = {
  groupName: record.groupName,
  status: record.status,
  notes: record.notes,
  location: record.location?.id,
  deviceId: record.deviceId,
};
const data = reactive({ ...initialState });

const statusText = ref<string>('active');
const successResponse = ref({ data: { id: null } });
const recipients = ref<RecipientData[] | []>(
  record.recipients.map(({ id, name }: RecipientData) => ({
    id,
    name,
  })),
);

function resetForm() {
  Object.assign(data, initialState);
  recipients.value = [];
}

const submitHandler = async () => {
  data.status = statusText.value === 'active';

  const request = {
    ...data,
    status: statusText.value === 'active',
    recipients: recipients.value.map(({ id }) => ({
      id,
    })),
    location: {
      id: data.location,
    },
  };
  const response = await groupService.update(Number(groupId), request);
  successResponse.value = response;
  resetForm();
};

const setRecipients = (recipientSelected: RecipientData[]) => {
  recipients.value = recipientSelected;
};
</script>

<template>
  <div>
    <FormKit
      type="form"
      id="updateGroup"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <div class="flex flex-wrap justify-between items-center mb-0 md:mb-10">
        <div mb-5>
          <h4 class="mb-4 text-carbon">Groups</h4>
          <p class="text-silver">
            Smart Suite / Communicator / Groups /
            <span class="text-primary">Create New Group</span>
          </p>
        </div>
      </div>
      <div w-full>
        <div class="success alert-success" v-if="successResponse.data.id">
          Group Successfully Updated
        </div>
        <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
          <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
            <h5 text-stone>Create New Group</h5>
            <div grid md:grid-cols-2 grid-cols-1 gap-5 my-8 md:w-auto w-full>
              <FormKit
                v-model="data.groupName"
                type="text"
                name="name"
                validation="required"
                placeholder="Group Name"
                input-class="form-control"
              />

              <FormKit
                v-model="statusText"
                type="select"
                validation="required"
                name="status"
                input-class="form-control"
                placeholder="Select Status"
                :options="statuses"
              />

              <FormKit
                v-model="data.location"
                type="select"
                validation="required"
                name="location"
                input-class="form-control"
                placeholder="Select Location"
                :options="[
                  { value: '', label: 'Select Location' },
                  ...locations.data.map((location) => ({
                    value: location.id,
                    label: `${location.city} ${location.country}`,
                  })),
                ]"
              />

              <FormKit
                v-model="data.notes"
                name="notes"
                validation="required"
                type="textarea"
                rows="10"
                placeholder="Note"
                input-class="form-control"
                outer-class="md:col-span-2 col-span-1"
              />
            </div>
            <div>
              <h6 class="text-carbon">Recipient Added</h6>
              <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                <span
                  class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                  v-for="recipient in recipients"
                  :key="recipient.id"
                >
                  {{ recipient.name }}
                </span>
              </div>
            </div>
            <div class="flex justify-end items-center mt-5 md:w-auto w-full">
              <button class="btn btn-primary md:w-auto w-full">
                Update Group
              </button>
            </div>
          </div>
          <ViewRecipients
            :recipients="recipients"
            @set-recipients="setRecipients"
          ></ViewRecipients>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<style lang="scss"></style>
