<script setup lang="ts">
import Select from '@vueform/multiselect';
import '~~/services/recipient.service';
import { useToasterStore } from '~~/store/toaster';

const config = useRuntimeConfig();
const { setMessage } = useToasterStore();
const { id: recipientId } = useRoute().params;
const router = useRouter();

interface GroupData {
  id: number;
  groupName: string;
  status: boolean;
}

interface initialStateData {
  name: string;
  cellVoice: string;
  cellText: string;
  homeNumber: string;
  workNumber: string;
  emailAddress: string;
  alternateEmail: string;
  status: boolean;
  location: 0;
  notes: string;
}

const { data: recipientDetail } = await useFetch<any>(
  () => `recipients/${recipientId}`,
  {
    baseURL: config.public.API_SMARTSUITE_BASEURL,
  },
);

const locations = await $fetch<{ data: any[]; total: number }>(`/locations`, {
  baseURL: useRuntimeConfig().public.API_SMARTSUITE_BASEURL,
});

const record = recipientDetail.value;
const recipientService = useService('recipient');

const initialState: initialStateData = {
  name: record.name,
  cellVoice: record.cellVoice,
  cellText: record.cellText,
  homeNumber: record.homeNumber,
  workNumber: record.workNumber,
  emailAddress: record.emailAddress,
  alternateEmail: record.alternateEmail,
  location: record.location?.id,
  status: record.status,
  notes: record.notes,
};

const data = reactive({ ...initialState });
const groups = ref<GroupData[] | []>(
  record.groups.map(({ id, groupName, status }: GroupData) => ({
    id,
    groupName,
    status,
  })),
);

function resetForm() {
  Object.assign(data, initialState);
  groups.value = [];
}

const submitUpdate = async () => {
  try {
    const request = {
      ...data,
      groups: groups.value.map(({ id }) => ({
        id,
      })),
      location: {
        id: data.location,
      },
    };
    const response = await recipientService.update(
      Number(recipientId),
      request,
    );
    if (response) {
      setMessage('Recipient updated successfully.', 'success');
      resetForm();
      router.push('/recipients-and-groups/recipients');
    } else {
      setMessage('Error updating recipient data.', 'error');
      router.push(`/recipients-and-groups/recipients/edit/${recipientId}`);
    }
  } catch (error) {
    setMessage('Error updating recipient data.', 'error');
  }
};

const setGroups = (groupSelected: GroupData[]) => {
  groups.value = groupSelected;
};
</script>

<template>
  <div>
    <div class="mb-10">
      <div>
        <h4 class="mb-4 text-carbon">Recipients</h4>
        <p class="text-silver">
          Smart Suite / Communicator / Recipients /
          <span class="text-primary"> Edit Recipient </span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
          <h5 text-stone>Edit Recipient</h5>
          <FormKit type="form" :actions="false" @submit="submitUpdate">
            <div grid lg:grid-cols-2 grid-cols-1 gap-5 my-8>
              <FormKit
                v-model="data.name"
                name="First Name"
                type="text"
                placeholder="First Name"
                input-class="form-control"
                validation="required"
              />
              <FormKit
                v-model="data.cellVoice"
                name="Cell Voice"
                type="tel"
                placeholder="Mobile phone for voice calls"
                validation="required"
                input-class="form-control"
              />
              <FormKit
                v-model="data.cellText"
                name="Cell Text"
                type="tel"
                placeholder="Mobile phone for SMS"
                input-class="form-control"
              />
              <FormKit
                v-model="data.homeNumber"
                name="Home Number"
                type="tel"
                placeholder="Home phone number"
                input-class="form-control"
                validation="required"
              />
              <FormKit
                v-model="data.workNumber"
                name="Work Number"
                type="tel"
                placeholder="Work phone number"
                input-class="form-control"
                validation="required"
              />
              <FormKit
                v-model="data.emailAddress"
                name="Primary Email"
                type="email"
                validation="required|email"
                placeholder="Primary Email"
                input-class="form-control"
              />
              <FormKit
                v-model="data.alternateEmail"
                name="Alternate Email"
                type="email"
                validation="required|email"
                placeholder="Alternate Email"
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
            </div>
            <div mb-5>
              <h6 class="text-carbon mb-4">Groups Added</h6>
              <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                <span
                  v-for="group in groups"
                  :key="group.id"
                  class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                >
                  {{ group.groupName }}
                </span>
              </div>
            </div>
            <FormKit
              input-class="btn btn-primary"
              type="submit"
              label="Update"
              wrapper-class="flex justify-end"
            />
          </FormKit>
        </div>
        <div>
          <ViewGroupsList :groups="groups" @set-groups="setGroups" />
        </div>
      </div>
    </div>
  </div>
</template>
