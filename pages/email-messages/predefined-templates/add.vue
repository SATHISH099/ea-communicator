<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';
import type { Sms } from '~~/services/sms.service';
import type { Email } from '~~/services/email.service';
import '~~/services/email.service';
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

const smsService = useService('sms');
const emailService = useService('email');
const type = ref('emails');
const successResponse = ref({ id: null });
const errorBody = ref(false);
const title = ref('');
const message = ref('');
const body = ref('');

const setField = (data: string) => {
  errorBody.value = false;
  body.value = data;
};

const resetForm = () => {
  message.value = '';
  title.value = '';
};

const checkvalidation = () => {
  if (!body.value && type.value === 'emails') {
    errorBody.value = true;
    return false;
  }

  return true;
};
const saveEmail = (formData: any) => {
  const data = {
    subject: formData.title,
    sender: 'test',
    importanceLevel: 'low',
    body: body.value,
    isPredefined: true,
    recipients: [],
    groups: [],
  };
  return emailService.sendEmail(data);
};

const saveSms = (formData: any) => {
  const data = {
    title: formData.title,
    message: message.value,
    sender: 'test',
    importanceLevel: 'low',
    tenantId: 'test',
    isPredefined: true,
    recipients: [],
    groups: [],
  };
  return smsService.sendSms(data);
};
const submitHandler = async (formData: any) => {
  if (checkvalidation()) {
    try {
      const response =
        type.value === 'emails'
          ? await saveEmail(formData)
          : await saveSms(formData);
      if (response) {
        setMessage('Template created successfully.', 'success');
        resetForm();
        router.push('/email-messages/email');
      } else {
        router.push('/email-messages/email/add');
        setMessage('Something went wrong unable to create Email.', 'error');
      }
    } catch (error) {
      console.error(new Error('Whoops, something went wrong.'));
    }
  }
};
</script>

<template>
  <div>
    <FormKit
      type="form"
      id="sendTemplate"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <div class="flex flex-wrap justify-between items-center mb-10">
        <div class="md:mb-0 mb-10">
          <h4 class="mb-4 text-stone">Predefined Templates</h4>
          <p class="text-silver">
            Communicator / Email/Messages / Predefined Templates /
            <span class="text-primary"> Add New Predefined Template</span>
          </p>
        </div>
      </div>
      <DashboardCard title="Add New Predefined Template">
        <div class="p-6">
          <div class="max-w-[50rem]">
            <div class="success alert-success" v-if="successResponse.id">
              Template Successfully Saved
            </div>
            <FormKit
              type="text"
              name="title"
              v-model="title"
              validation="required"
              placeholder="Title of the message"
              input-class="form-control"
              outer-class="mb-5"
            />
            <Multiselect
              v-model="type"
              placeholder="Predefined message type"
              :options="[
                { value: 'emails', label: 'Email' },
                { value: 'sms', label: 'SMS' },
              ]"
              class="mb-5"
            />
            <div mb-5 v-if="type == 'emails'">
              <ClientOnly>
                <RichTextEditor
                  v-model="body"
                  :contentValue="body"
                  @update:contentValue="
                    (newValue) => {
                      setField(newValue);
                    }
                  "
                />
              </ClientOnly>
              <span class="error" v-if="errorBody">Please Enter Body</span>
            </div>

            <div mb-5 v-if="type == 'sms'">
              <FormKit
                type="textarea"
                name="message"
                v-model="message"
                rows="10"
                placeholder="Message"
                validation="required"
                outer-class="w-full"
                input-class="form-control"
              />
            </div>
            <div class="flex justify-end">
              <FormKit
                type="submit"
                input-class="btn btn-primary md:w-auto w-full"
              >
                Save
              </FormKit>
            </div>
          </div>
        </div>
      </DashboardCard>
    </FormKit>
  </div>
</template>
