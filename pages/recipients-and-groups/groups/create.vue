<script lang="ts" setup>
import '~~/services/group.service';
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

interface RecipientData {
  id: number;
  name: string;
}

interface initialStateData {
  groupName: string;
  status: boolean;
  notes: string;
  location?: number;
  deviceId: string;
}

const groupService = useService('group');
if (process.client) {
  groupService.setAuth();
}

const statuses = ['Inactive', 'active'];

const initialState: initialStateData = {
  groupName: '',
  status: true,
  notes: '',
  location: undefined,
  deviceId: 'deviceId',
};

const locations = await $fetch<{ data: any[]; total: number }>(`/locations`, {
  baseURL: useRuntimeConfig().public.API_SMARTSUITE_BASEURL,
});

const data = reactive({ ...initialState });
const statusText = ref<string>('');
const successResponse = ref({ data: { id: null } });
const recipients = ref<RecipientData[] | []>([]);

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
  };
  try {
    const response = await groupService.createGroup(request);
    if (response) {
      setMessage('Group created successfully.', 'success');
      resetForm();
      router.push('/recipients-and-groups/groups');
    } else {
      router.push('/recipients-and-groups/groups/add');
      setMessage('Something went wrong unable to create Group.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
  }
};

const setRecipients = (recipientSelected: RecipientData[]) => {
  recipients.value = recipientSelected;
};
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between items-center mb-0 md:mb-10">
      <div mb-5>
        <h4 class="mb-4 text-carbon">Groups</h4>
        <p class="text-silver">
          <NuxtLink to="/" class="text-silver sub-heading"
            >Communicator</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink to="/recipients-and-groups" class="text-silver sub-heading">
            Recipients and Groups</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink
            to="/recipients-and-groups/groups"
            class="text-silver sub-heading"
          >
            Groups</NuxtLink
          >
          <span class="text-silver">/</span>
          <span class="text-primary"> Create New Group</span>
        </p>
      </div>
    </div>
    <div w-full>
      <div v-if="successResponse.data.id" class="success alert-success">
        Group Successfully Created
      </div>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
          <FormKit
            id="createGroup"
            v-slot="{ value }"
            type="form"
            :actions="false"
            @submit="submitHandler"
          >
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
            <div v-if="recipients.length > 0" class="mb-5">
              <h6 class="text-carbon">Recipient Added</h6>
              <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                <span
                  v-for="recipient in recipients"
                  :key="recipient.id"
                  class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                >
                  {{ recipient.name }}
                </span>
              </div>
            </div>
            <div class="flex justify-end items-center mt-5 md:w-auto w-full">
              <button class="btn btn-primary md:w-auto w-full">
                Create Group
              </button>
            </div>
          </FormKit>
        </div>
        <ViewRecipients
          :recipients="recipients"
          @set-recipients="setRecipients"
        ></ViewRecipients>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
