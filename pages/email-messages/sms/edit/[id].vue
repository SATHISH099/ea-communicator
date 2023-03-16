<script lang="ts" setup>
const smsService = useService('sms');
interface EditData {
  title: string;
  message: string;
}
const config = useRuntimeConfig();
const { id: smsId } = useRoute().params;
const { data: smsDetail } = await useFetch<any>(() => `sms/${smsId}`, {
  baseURL: config.public.API_BASEURL,
});

const record = smsDetail.value;
const successResponse = ref({ id: null });
const title = ref(record.title);
const message = ref(record.message);

const submitHandler = async (formData: EditData) => {
  const response = await smsService.update(Number(smsId), {
    title: formData.title,
    message: formData.message,
  });
  successResponse.value = response;
};
</script>

<template>
  <div>
    <FormKit
      type="form"
      id="updateTemplate"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <div class="flex flex-wrap justify-between items-center mb-10">
        <div class="md:mb-0 mb-10">
          <h4 class="mb-4 text-stone">Predefined Templates</h4>
          <p class="text-silver">
            Communicator / Email/Messages / Predefined Templates /
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
