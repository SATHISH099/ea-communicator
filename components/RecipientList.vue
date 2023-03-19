<script lang="ts" setup>
const props = defineProps(['recipients', 'groups']);
const recipientService = useService('recipient');
const groupService = useService('group');

interface RecipientData {
  name: string;
}

interface GroupData {
  groupName: string;
  recipientCount: number;
}

const activeTab = ref('recipients');
const recipientHeaders = ['Recipients', 'Email Address'];
const groupHeaders = ['Group Name', 'Member Count'];
const response = ref<RecipientData[] & GroupData[]>([]);

const loadRecipients = async (tab: string) => {
  activeTab.value = tab;

  try {
    const recipientData =
      activeTab.value === 'recipients'
        ? await recipientService.fetch(
            props.recipients.map(
              ({ recipientId }: { recipientId: number }) => recipientId,
            ),
          )
        : await groupService.fetch(
            props.groups.map(({ groupId }: { groupId: number }) => groupId),
          );

    if (recipientData) {
      response.value = recipientData.data;
    }
  } catch (error) {}
};

loadRecipients(activeTab.value);
</script>

<template>
  <div bg-white small-shadow>
    <div px-6 pt-6>
      <h5 text-stone mb-5>Recipient's list</h5>
      <div class="flex items-center lex-wrap">
        <div
          class="tab"
          :class="{ active: activeTab === 'recipients' }"
          @click="loadRecipients('recipients')"
        >
          Recepients
        </div>
        <div
          class="tab"
          :class="{ active: activeTab === 'groups' }"
          @click="loadRecipients('groups')"
        >
          Groups
        </div>
      </div>
    </div>
    <DashboardTable
      v-if="activeTab === 'recipients'"
      mt-3
      mb-8
      :headers="recipientHeaders"
      :rows="response.map(({ name }: RecipientData) => ({
            name
          }))"
    />

    <DashboardTable
      v-if="activeTab === 'groups'"
      mt-3
      mb-8
      :headers="groupHeaders"
      :rows="response.map(({ groupName, recipientCount }: GroupData) => ({
            groupName,
            recipientCount,
          }))"
    />
  </div>
</template>
