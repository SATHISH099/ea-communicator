<script lang="ts" setup>
import Select from '@vueform/multiselect';
import type { Group } from '~~/services/group.service';
import '~~/services/group.service';
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

interface CitiesData {
  name: string;
}
interface StateData {
  name: string;
  cities: CitiesData[];
}

interface CountryData {
  name: string;
  states: StateData[];
}

interface RecipientData {
  id: number;
  firstName: string;
  lastName: string;
}

interface initialStateData {
  groupName: string;
  status: boolean;
  notes: string;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  selectedCountry: CountryData;
  selectedState: StateData;
  deviceId: string;
}

const groupService = useService('group');
const statuses = ['Inactive', 'active'];

const { data: location } = await useFetch<any>(() => `/json/locations.json`);
const initialState: initialStateData = {
  groupName: '',
  status: true,
  notes: '',
  location: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  selectedCountry: { name: '', states: [{ name: '', cities: [{ name: '' }] }] },
  selectedState: { name: '', cities: [{ name: '' }] },
  deviceId: 'deviceId',
};
const data = reactive({ ...initialState });
const statusText = ref<string>('active');
const successResponse = ref({ data: { id: null } });
const recipients = ref<RecipientData[] | []>([]);

function resetForm() {
  Object.assign(data, initialState);
  recipients.value = [];
}
const selectCountry = () => {
  const selectLocation = location.value.filter(function (country: StateData) {
    return country.name === data.country;
  });

  data.selectedCountry = selectLocation[0] || initialState.selectedCountry;
};

const selectState = () => {
  const selectLocation = data.selectedCountry.states.filter(function (state) {
    return state.name === data.state;
  });

  data.selectedState = selectLocation[0] || initialState.selectedState;
};

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
      setMessage('Something went wrong unable to create Recipient.', 'error');
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
    <FormKit
      type="form"
      id="createGroup"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <div class="flex flex-wrap justify-between items-center mb-10">
        <div mb-5>
          <h4 class="mb-4 text-carbon">Groups</h4>
          <p class="text-silver">
            <NuxtLink to="/" class="text-silver sub-heading"
              >Communicator</NuxtLink
            >
            <span class="text-silver">/</span>
            <NuxtLink
              to="/recipients-and-groups"
              class="text-silver sub-heading"
            >
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
        <div class="success alert-success" v-if="successResponse.data.id">
          Group Successfully Created
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
                v-model="data.country"
                type="select"
                validation="required"
                name="country"
                input-class="form-control"
                placeholder="Select Country"
                :options="
                  location.map((item: StateData) => {
                    return item.name;
                  })
                "
                @change="selectCountry"
              />

              <FormKit
                v-model="data.state"
                type="select"
                validation="required"
                name="state"
                input-class="form-control"
                placeholder="Select State / Territory"
                :options="
                  data.selectedCountry.states
                    ? [...data.selectedCountry.states.map((item: StateData) => {
                        return item.name;
                      }), {value: '', label:'Select State / Territory'}]
                    : []
                "
                @change="selectState"
              />

              <FormKit
                v-model="data.city"
                type="select"
                validation="required"
                name="city"
                input-class="form-control"
                placeholder="Select City"
                :options="
                  data.selectedState.cities
                    ? [...data.selectedState.cities.map((item: CitiesData) => {
                        return item.name;
                      }), {value: '', label:'Select City'}]
                    : []
                "
              />

              <FormKit
                v-model="data.zipCode"
                name="zip"
                validation="required"
                type="number"
                placeholder="Zip Code"
                input-class="form-control"
              />
              <FormKit
                v-model="data.location"
                name="location"
                validation="required"
                type="text"
                placeholder="Location"
                input-class="form-control"
                outer-class="md:col-span-2 col-span-1"
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
              <!-- <h6 class="text-carbon">Recipient Added</h6> -->
              <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                <span
                  class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                  v-for="recipient in recipients"
                  :key="recipient.id"
                >
                  {{ recipient.firstName }} {{ recipient.lastName }}
                </span>
              </div>
            </div>
            <div class="flex justify-end items-center mt-5 md:w-auto w-full">
              <button class="btn btn-primary md:w-auto w-full">
                Create Group
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
