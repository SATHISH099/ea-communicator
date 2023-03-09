<script setup>
import Select from '@vueform/multiselect';
import '~~/services/recipient.service';
import { useToasterStore } from '~~/store/toaster';

const { setMessage } = useToasterStore();
const { id } = useRoute().params;
const router = useRouter();

const recipientService = useService('recipient');
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
  zipCode: '',
  location: '',
  status: '',
};

const data = reactive({ ...initialState });

const submitUpdate = async () => {
  try {
    const response = await recipientService.update(id, data);
    if (response) {
      setMessage('Recipient updated successfully.', 'success');
      router.push('/recipients-and-groups/recipients');
    } else {
      setMessage('Error updating recipient data.', 'error');
      router.push(`/recipients-and-groups/recipients/edit/${id}`);
    }
  } catch (error) {
    setMessage('Error updating recipient data.', 'error');
  }
};

onMounted(async () => {
  try {
    const { data: recipients } = await recipientService.getAll();
    const recipient = recipients.find(
      (recipient) => recipient.id === Number(id),
    );
    if (recipient) {
      Object.assign(data, recipient);
    } else {
      setMessage('Recipient not found.', 'error');
    }
  } catch (error) {
    setMessage('Error retrieving recipient data.', 'error');
  }
});
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
                v-model="data.firstName"
                name="First Name"
                type="text"
                placeholder="First Name"
                input-class="form-control"
                validation="required"
              />
              <FormKit
                v-model="data.middleName"
                name="Middle Name"
                type="text"
                placeholder="Middle Name"
                input-class="form-control"
              />
              <FormKit
                v-model="data.lastName"
                name="Last Name"
                type="text"
                placeholder="Last Name"
                input-class="form-control"
                validation="required"
              />
              <FormKit
                v-model="data.nickName"
                name="Nick Name"
                type="text"
                placeholder="Nick Name"
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
              <Select
                v-model="data.status"
                placeholder="Select Status"
                :options="[
                  { value: true, label: 'Completed' },
                  { value: false, label: 'Uncompleted' },
                ]"
              />
              <Select
                v-model="data.country"
                placeholder="Select Country"
                :options="['USA', 'Canada', 'Mexico']"
              />
              <Select
                v-model="data.state"
                placeholder="Select State / Territory"
                :options="['California', 'Texas', 'Florida']"
              />
              <Select
                v-model="data.city"
                placeholder="Select City"
                :options="['Los Angeles', 'Houston', 'Miami']"
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
            <FormKit
              input-class="btn btn-primary"
              type="submit"
              label="Update"
              wrapper-class="flex justify-end"
            />
          </FormKit>
        </div>
        <div>
          <ViewGroupsList />
        </div>
      </div>
    </div>
  </div>
</template>
