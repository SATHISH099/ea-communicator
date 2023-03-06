<script setup>
import Select from '@vueform/multiselect';
import '~~/services/recipient.service';
import { useToasterStore } from '~~/store/toaster';

const { setMessage } = useToasterStore();

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

const resetForm = () => {
  Object.assign(data, initialState);
};
const submitCreate = async () => {
  try {
    await recipientService.create(data);
    resetForm();
    setMessage('Recipient Created Successfully.', 'success');
  } catch (error) {
    setMessage('Error Creating Recipient.', 'error');
  }
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
                validation="required|email|ends_with:.com"
                placeholder="Primary Email"
                input-class="form-control"
              />
              <FormKit
                v-model="data.alternateEmail"
                name="Alternate Email"
                type="email"
                validation="required|email|ends_with:.com"
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
              label="Create Recipient"
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

<style lang="scss"></style>
