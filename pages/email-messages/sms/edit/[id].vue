<script lang="ts" setup>
import { useToasterStore } from '~~/store/toaster';
const router = useRouter();

const { setMessage } = useToasterStore();
interface EditData {
  title: string;
  message: string;
}
const { $trpc } = useNuxtApp();
const params = useRoute().params;
const smsId: number = parseInt(params.id as string);
const record = await $trpc.sms.show.query(smsId);

const successResponse = ref({ id: null });
const errorBody = ref(false);
const title = ref(record.title);
const message = ref(record.message);

const setField = (data: string) => {
  errorBody.value = false;
  message.value = data;
};

const checkvalidation = () => {
  if (!message.value) {
    errorBody.value = true;
    return false;
  }

  return true;
};

const submitHandler = async (formData: EditData) => {
  if (checkvalidation()) {
    const response = await $trpc.sms.update.mutate({
      id: smsId,
      data: {
        title: formData.title,
        message: message.value,
      },
    });
    try {
      if (response) {
        setMessage('Template Successfully Updated', 'success');
        router.push('/email-messages/predefined-templates');
      } else {
        setMessage(
          'Something went wrong unable to create update template.',
          'error',
        );
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
      id="updateTemplate"
      type="form"
      :actions="false"
      @submit="submitHandler"
    >
      <div class="flex flex-wrap justify-between items-center mb-0 md:mb-10">
        <div class="md:mb-0 mb-10">
          <h4 class="mb-4 text-stone">Predefined Templates</h4>
          <p class="text-silver">
            <NuxtLink to="/" class="text-silver sub-heading"
              >Communicator</NuxtLink
            >
            <span class="text-silver">/</span>
            <NuxtLink to="/" class="text-silver sub-heading">
              Email/Messages</NuxtLink
            >
            <span class="text-silver">/</span>
            <NuxtLink to="/" class="text-silver sub-heading">
              Predefined Templates</NuxtLink
            >
            <span class="text-silver">/</span>
            <span class="text-primary"> Edit Predefined Template</span>
          </p>
        </div>
      </div>
      <DashboardCard title="Edit Predefined Template">
        <div class="p-6">
          <div class="max-w-[50rem]">
            <div class="success alert-success" v-if="successResponse.id">
              Template Successfully Updated
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
            <div mb-5>
              <FormKit
                type="textarea"
                name="message"
                v-model="message"
                rows="10"
                placeholder="Message*"
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
