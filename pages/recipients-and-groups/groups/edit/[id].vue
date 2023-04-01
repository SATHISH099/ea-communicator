<script lang="ts" setup>
import { useToasterStore } from '~~/store/toaster';

const config = useRuntimeConfig();
const { setMessage } = useToasterStore();
const router = useRouter();

definePageMeta({
  middleware: ['permission'],
});

interface RecipientData {
  id: number;
  name: string;
}

interface initialStateData {
  groupName: string;
  status: boolean;
  notes: string;
  location: number;
}

const groupService = useService('group');
if (process.client) {
  groupService.setAuth();
}
const { id: groupId } = useRoute().params;

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
};

const data = reactive({ ...initialState });
const recipients = ref<RecipientData[] | []>(
  record.recipients.map(({ id, name }: RecipientData) => ({
    id,
    name,
  })),
);

const submitHandler = async () => {
  let response;

  try {
    const request = {
      ...data,
      recipients: recipients.value.map(({ id }) => ({
        id,
      })),
      location: {
        id: data.location,
      },
    };
    if (router.currentRoute.value.query.type === 'clone')
      response = await groupService.createGroup(request);
    else response = await groupService.update(Number(groupId), request);

    if (response) {
      if (router.currentRoute.value.query.type === 'clone')
        setMessage('Group clone successfully', 'success');
      else setMessage('Group updated successfully', 'success');

      router.push('/recipients-and-groups/groups');
    } else {
      setMessage('Error updating group data.', 'error');
      router.push(`/recipients-and-groups/groups/edit/${groupId}`);
    }
  } catch (error) {
    setMessage('Error updating group data.', 'error');
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
            >Smart Suite</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink to="/" class="text-silver sub-heading">
            Communicator</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink
            to="/recipients-and-groups/groups"
            class="text-silver sub-heading"
          >
            Recipients</NuxtLink
          >
          <span class="text-primary">Create New Group</span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
          <h5 text-stone>Create New Group</h5>
          <FormKit type="form" :actions="false" @submit="submitHandler">
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
                v-model="data.status"
                type="select"
                validation="required"
                name="status"
                input-class="form-control"
                placeholder="Select Status"
                :options="[
                  { value: true, label: 'Active' },
                  { value: false, label: 'In-Active' },
                ]"
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
              <h6 class="text-carbon mb-4">Recipient Added</h6>
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
                {{
                  $route.query.type === 'clone' ? 'Clone Group' : 'Update Group'
                }}
              </button>
            </div>
          </FormKit>
        </div>
        <ViewRecipients
          :recipients="recipients"
          @set-recipients="setRecipients"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
