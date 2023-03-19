<script setup lang="ts">
import Select from '@vueform/multiselect';
import '~~/services/recipient.service';
import { useToasterStore } from '~~/store/toaster';

const { setMessage } = useToasterStore();
const router = useRouter();

interface GroupData {
  id: number;
  groupName: string;
  status: boolean;
}

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

const recipientService = useService('recipient');

const { data: location } = await useFetch<any>(() => `/json/locations.json`);
const initialState = {
  firstName: '',
  middleName: '',
  lastName: '',
  nickName: '',
  cellVoice: '',
  cellText: '',
  homeNumber: '',
  workNumber: '',
  emailAddress: '',
  alternateEmail: '',
  country: '',
  state: '',
  city: '',
  selectedCountry: { name: '', states: [{ name: '', cities: [{ name: '' }] }] },
  selectedState: { name: '', cities: [{ name: '' }] },
  zipCode: '',
  location: '',
  status: false,
};

const data = reactive({ ...initialState });
const groups = ref<GroupData[] | []>([]);

const resetForm = () => {
  Object.assign(data, initialState);
  groups.value = [];
};

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
const submitCreate = async () => {
  try {
    const request = {
      ...data,
      groups: groups.value.map(({ id }) => ({
        id,
      })),
    };
    const response = await recipientService.create(request);
    if (response) {
      setMessage('Recipient created successfully.', 'success');
      resetForm();
      router.push('/recipients-and-groups/recipients');
    } else {
      router.push('/recipients-and-groups/recipients/add');
      setMessage('Something went wrong unable to create Recipient.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
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
          <span class="text-primary"> Create New Recipient </span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
          <h5 text-stone>Create New Recipient</h5>
          <FormKit type="form" :actions="false" @submit="submitCreate">
            <div grid lg:grid-cols-2 grid-cols-1 gap-5 my-8>
              <FormKit
                v-model="data.firstName"
                name="First Name"
                type="text"
                placeholder="First Name"
                input-class="form-control"
                validation="required|length:2,50"
              />
              <FormKit
                v-model="data.middleName"
                name="Middle Name"
                type="text"
                placeholder="Middle Name"
                input-class="form-control"
                validation="length:2,50"
              />
              <FormKit
                v-model="data.lastName"
                name="Last Name"
                type="text"
                placeholder="Last Name"
                input-class="form-control"
                validation="required|length:2,50"
              />
              <FormKit
                v-model="data.nickName"
                name="Nick Name"
                type="text"
                placeholder="Nick Name"
                input-class="form-control"
                validation="required|length:2,50"
              />
              <FormKit
                v-model="data.cellVoice"
                name="Cell Voice"
                type="tel"
                placeholder="Mobile phone for voice calls"
                validation="required|length:7,20"
                input-class="form-control"
              />
              <FormKit
                v-model="data.cellText"
                name="Cell Text"
                type="tel"
                placeholder="Mobile phone for SMS"
                input-class="form-control"
                validation="required|length:7,20"
              />
              <FormKit
                v-model="data.homeNumber"
                name="Home Number"
                type="tel"
                placeholder="Home phone number"
                input-class="form-control"
                validation="required|length:7,20"
              />
              <FormKit
                v-model="data.workNumber"
                name="Work Number"
                type="tel"
                placeholder="Work phone number"
                input-class="form-control"
                validation="required|length:7,20"
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
                type="number"
                name="Zip Code"
                validation="required"
                placeholder="Zip Code"
                input-class="form-control"
                outer-class="col-span-2"
              />
              <FormKit
                v-model="data.location"
                name="Location"
                type="text"
                validation="required"
                placeholder="Location"
                input-class="form-control"
                outer-class="md:col-span-2 col-span-1"
              />
            </div>
            <div v-if="groups.length > 0" mb-5>
              <h6 class="text-carbon">Groups Added</h6>
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
              label="Create Recipient"
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

<style lang="scss"></style>
