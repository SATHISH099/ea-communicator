<script lang="ts" setup>
import '~~/services/group.service';
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

definePageMeta({
  middleware: 'permission',
});

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

const statuses = ['In Active', 'Active'];

const initialState: initialStateData = {
  groupName: '',
  status: true,
  notes: '',
  location: undefined,
  deviceId: 'deviceId',
};

const locations = ref();
onMounted(async () => {
  locations.value = await $fetch<{ data: any[]; total: number }>(`/locations`, {
    baseURL: useRuntimeConfig().public.API_SMARTSUITE_BASEURL,
    headers: {
      Authorization: `bearer ${localStorage?.getItem('ss_token')}`,
    },
  });
});

const data = reactive({ ...initialState });
const statusText = ref<string>('');
const successResponse = ref({ data: { id: null } });
const recipients = ref<RecipientData[] | []>([]);

const submitHandler = async () => {
  data.status = statusText.value.toLowerCase() === 'active';

  const request = {
    ...data,
    recipients: recipients.value.map(({ id }) => ({
      id,
    })),
  };
  try {
    const response = await groupService.createGroup(request);
    if (response) {
      setMessage('Group created successfully', 'success');
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

const removeFromRecipient = (id: number) => {
  recipients.value = recipients.value.filter(function (
    recipient: RecipientData,
  ) {
    return recipient.id !== id;
  });
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
                validation="required|length:5,50"
                placeholder="Group Name*"
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
                  ...locations?.data.map((location: any) => ({
                    value: location.id,
                    label: `${location.city} ${location.country}`,
                  })) || [],
                ]"
              />

              <FormKit
                v-model="data.notes"
                name="notes"
                validation="required"
                type="textarea"
                rows="10"
                placeholder="Note*"
                input-class="form-control"
                outer-class="md:col-span-2 col-span-1"
              />
            </div>
            <div v-if="recipients.length > 0" class="mb-5">
              <h6 class="text-carbon mb-4">Recipient Added</h6>
              <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                <span
                  v-for="recipient in recipients"
                  :key="recipient.id"
                  class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary flex"
                >
                  {{ recipient.name }}
                  <button
                    class="border-none outline-none bg-transparent text-primary"
                    type="button"
                    @click="removeFromRecipient(recipient.id)"
                  >
                    <span
                      class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-white bg-primary rounded-full ml-3"
                      >x</span
                    >
                  </button>
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
