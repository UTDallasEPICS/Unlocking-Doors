<template lang="pug">
.container
  .sidebar
    .logo
      img(src='~/assets/logo.png' width='150')
    .search-column
      .search-through
        sstrong Tags
        Multiselect(
          v-model="filters.tag",
          :options="tags",
          :close-on-select="false",
          placeholder="Select tags",
          multiple,
        )
    .search-column
      .search-through
        strong Date
        select(v-model="selectedDateRange")
          option(value="lastMonth") Last Month
          option(value="last2Weeks") Last 2 Weeks
          option(value="lastWeek") Last Week
          option(value="custom") Custom
          option(value="allcontacts") All Contacts
          div(v-if="selectedDateRange === 'custom'")
            //VueDatePicker(v-model="filters.startDate" :max-date="new Date()" enable-time-picker="false")
            //VueDatePicker(v-model="filters.endDate" :max-date="new Date()")
  .body
    .top-bar
      .account-bar
        a.logout-link(href='/api/logout') Logout
        img(src='~/assets/account.png')
      .title
        strong Contact Database
      a.search-page-button(@click="navigateTo('/')") Search Page
      a.text |
      NuxtLink.add-contact-button(v-if='isEditor || isAdmin' to='addContact') Add New Contact
      a.text(v-if='isEditor || isAdmin') |
      NuxtLink.admin-page-button(v-if='isAdmin' to='admin') Admin Page
      NuxtLink.admin-page-button(v-if='isAdmin' to='manageTags') Manage Tags
      button(@click="downloadContacts()") Download Contacts
    .search-container
      .search-bar
        input(type='text' placeholder='Search...' v-model='searchQuery')
        button(@click='contacts = search(searchQuery)') Search
      table
        tbody(v-if="searchResults.length")
          tr(v-for='contact in searchResults' :key='contact.id' @click='isEditor || isAdmin ? editContact(contact): null')
            td.center-text #[strong {{ (contact.firstName && contact.lastName) ? (contact.firstName + ' ' + contact.lastName) : (contact.firstName || contact.lastName || '') }} ]
            td #[strong EMAIL]
              br
              br
              |{{ contact.emailAddress ? contact.emailAddress : '' }}
            td #[strong PHONE]
              br
              br
              |{{ contact.mainPhone ? contact.mainPhone : (contact.directPhone ? contact.directPhone : (contact.mobilePhone ? contact.mobilePhone : 'N/A')) }}
            td {{ contact.company ? contact.company : '' }}
            .actions-container
              img.edit-contact-icon(src='~/assets/edit-icon.png' alt='Edit Contact' @click="editContact(contact)")
              img.delete-button(src='~/assets/remove.png' alt='Remove' @click="confirmAction(contact, 'delete')")

      .pagination
        button(@click="prevPage()" :disabled="currentPage === 0") Previous
        span Page {{currentPage + 1}} of {{totalPages}}
        button(@click="nextPage()" :disabled="currentPage + 1 === totalPages") Next

</template>

<script lang='ts' setup>
//connect search button to fetch results
/*
Not able throw an event when the tag selected is changed, thats the root cause.
*/
import type { User } from '@/types.d';
import { ref, computed, watch, } from "vue";
import Multiselect from 'vue-multiselect';
import { useFetch } from "nuxt/app";
import { useRouter } from 'vue-router';
//import VueDatePicker from '@vuepic/vue-datepicker';

const selectedDateRange = ref('allcontacts');
const searchQuery = ref('');

const filters = ref({
  startDate: new Date(0),
  endDate: new Date(),
  tag: []
});

const router = useRouter();
const user = useCookie<User>('cvuser');
const id_info = computed(() => user.value?.id);
const id = id_info.value as number;

const isViewer = computed(() => user.value?.permission == "VIEWER");
const isEditor = computed(() => user.value?.permission == "EDITOR");
const isAdmin = computed(() => user.value?.permission == "ADMIN");
const searchResults = ref([]);
const cursors = ref([0]);
const cursor = ref(0);
const count = ref(0);
const currentPage = ref(0);
const pageSize = ref(10); //current.pagesize out of all(count)
// replace 10 with searchResults.value.length
const totalPages = computed(() => {
  return searchResults.value ? Math.ceil(count.value / pageSize.value) : 0;
});


const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
  }
};

// Function to navigate to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

watch(currentPage, () => {
  fetchContacts(); // Re-fetch contacts whenever page or filters change
}, { deep: true });


// Have a watcher (watch selected date) for the selectedDateRange
// Watcher executes function when event changes (replace the const function of onDateRangeChange)
watch(selectedDateRange, (value: string) => {
  const now = new Date();
  filters.value.endDate = new Date(now);
  console.log("enddate: ", filters.value.endDate);
  switch (value) {
    case 'lastWeek':
      now.setMinutes(now.getMinutes() - 1);
      filters.value.startDate = new Date(now);
      break;
    case 'last2Weeks':
      now.setMinutes(now.getMinutes() - 2);
      filters.value.startDate = new Date(now);
      break;
    case 'lastMonth':
      now.setMinutes(now.getMinutes() - 30);
      filters.value.startDate = new Date(now);
      break;
    case 'allcontacts':
      filters.value.startDate = new Date(0);
      break;
  }
  console.log("startdate: ", filters.value.startDate);
});

watch(filters, () => {
  console.log("inside watch");
  currentPage.value = 0;
  cursors.value = [0];
  fetchContacts();
}, { deep: true });

// Ensure that date and tag filters are managed cohesively
// fetchContacts(); // Called when watcher executes; Watcher essentially replaces filterContactbyDates and onTagsChange

const constructQueryParams = () => {
  console.log("construct");
  const tagsQueryParam = Array.isArray(filters.value.tag) ? filters.value.tag.join(',') : filters.value.tag;

  const params = new URLSearchParams({
    startDate: filters.value.startDate.toISOString(),
    endDate: filters.value.endDate.toISOString(),
    searchQuery: searchQuery.value,
    tag: tagsQueryParam,
    cursor: cursors.value[currentPage.value] + ''
  });
  console.log("startdate with isostring", filters.value.startDate);
  console.log("enddate with iostring", filters.value.endDate);
  console.log(params.entries());
  return params.toString();
};

// Function to fetch contacts
const fetchContacts = async () => {
  console.log("fetch");
  const queryParams = constructQueryParams();
  try {
    const response = await fetch(`/api/contacts?${queryParams}`);
    const { data, count: c } = await response.json();
    searchResults.value = data;
    count.value = c;
    cursor.value = data[data.length - 1]?.id || 0;
    if (!cursors.value.includes(cursor.value))
      cursors.value.push(cursor.value);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
// NOTE FOR TAZ: this should ideally be computed coming off a useFetch 
onMounted(() => fetchContacts());
const downloadContacts = async () => {
  const queryParams = constructQueryParams();
  // Using the `query` in the fetch URL
  const response = await fetch(`/api/contacts?${queryParams}`, {
    method: 'GET',
  });

  if (!response.ok) {
    console.error('Failed to fetch contacts');
    return;
  }

  const contacts = await response.json();
  const headers = Object.keys(contacts[0]);

  const reduced = contacts.reduce(
    (acc: string, curr: any) => {
      const newValues = headers.map(h => {
        if (h == "tag") {
          return `"${curr[h].map(({ name }: { name: string; }) => name).join(",")}"`;
        }
        else
          return curr[h];
      }).join(",") + "\n";
      return acc + newValues;
    }, ""
  );

  /*
for every tag in tags (tag array), lastName, 
firstName, middleName, prefix, suffix, company, professionalTitle, 
address1, city1, state1, zipCode1, address1Type, 
address2, city2, state2, zipCode2, address2Type, 
mainPhone, directPhone, mobilePhone, narrative */


  const hMap: Record<string, string> = {
    id: "ID",
    tag: "Tags",
    lastName: "Last Name",
    firstName: "First Name",
    middleName: "Middle Name/Initial",
    prefix: "Prefix",
    suffix: "Suffix",
    company: "Organization",
    professionalTitle: "Title",
    address1: "Address 1",
    city1: "City 1",
    state1: "State 1",
    zipCode1: "Zipcode 1",
    address1Type: "Address 1 Type",
    address2: "Address 2",
    city2: "City 2",
    state2: "State 2",
    zipCode2: "Zipcode 2",
    address2Type: "Address 2 Type",
    emailAddress: "Email",
    mainPhone: "Main Phone",
    directPhone: "Direct Phone",
    mobilePhone: "Mobile Phone",
    narrative: "Notes",
  };

  const prettyHeaders = headers.map((h: string) => hMap[h]).join(",") + "\n";

  // Trigger the download of the CSV file
  const encodedUri = URL.createObjectURL(
    new Blob([prettyHeaders + reduced], {
      type: "text/csv"
    })
  );
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "contacts.csv");

  link.click(); // This will download the file
  document.body.removeChild(link); // Clean up
};

const { data: tags } = await useFetch('/api/tag', {
  method: 'GET',
});

const editContact = (contact: any) => {
  router.push({ path: `/editContact/`, query: { id: contact.id } });
};
</script>

<style scoped>
.body {
  background-color: white;
  width: 80%;
  position: relative;
}

.container {
  display: flex;
  min-width: 1280px;
}

.sidebar {
  height: 97.8vh;
  width: 16%;
  position: relative;
  top: 0;
  left: 0;
}

.top-bar {
  position: relative;
  height: 20%;
  font-family: "Poppins";
  color: #034EA2;
}

.top-bar>.account-bar {
  padding: 7px 30px;
  position: absolute;
  top: -8%;
  right: -1%;
  border-radius: 0 0 0 20px;
  background-color: #D9D9D9;
  display: flex;
  flex-direction: row;
}

.top-bar>.account-bar>a.my-account-button {
  font-family: "Poppins";
  color: black !important;
  margin-right: 20px;
  cursor: pointer;
}

a.logout-link {
  color: #034EA2;
  text-decoration: none;
}

.top-bar>.account-bar>img {
  height: 25px;
  width: 25px;
}

.top-bar>.title {
  padding: 25px 0 0 30px;
  font-size: 28px;
}

.top-bar>a {
  margin-right: 20px;
}

.top-bar>.add-contact-button {
  cursor: pointer;
  text-decoration: none;
  color: #034EA2;
}

.top-bar>.search-page-button {
  padding-left: 30px;
  cursor: pointer;
  text-decoration: underline;
}

.top-bar>.admin-page-button {
  cursor: pointer;
  text-decoration: none;
  color: #034EA2;
}

.logo {
  padding: 25px 0 10px 35px;
}

.search-through {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0 15px;
  font-size: 17px;
  font-weight: bold;
  font-family: 'Poppins';
}

.search-through select {
  margin-top: 10px;
  font: 16px 'Poppins';
  border: transparent;
  border-radius: 10px;
  padding: 5px;
  background-color: #D9D9D9;
}

.filter-communication {
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 15px;
  font: bold 17px 'Poppins';
}

.checkbox {
  display: flex;
  flex-direction: row;
  padding: 6px 0;
}

.checkbox>input {
  cursor: pointer;
  height: 15px;
}

.checkbox-label {
  font: 300 15px 'Poppins';
  padding-left: 10px;
}

.selected-filters {
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0 15px;
  font: bold 17px 'Poppins';
  flex-grow: 1;
}

.filters {
  margin-top: 8px;
  height: 250px;
  border-radius: 10px;
  background-color: #D9D9D9;
}

.search-container {
  background-color: #D9D9D9;
  margin-left: 30px;
  border-radius: 20px 0 0 0;
  box-shadow: inset 0 0 15px #717171;
  height: 150%;
  width: 98%;
  position: absolute;
}

.search-bar {
  display: flex;
  margin-bottom: 25px;
  margin-top: 25px;
  margin-left: 25px;
  align-items: center;
}

.search-bar input {
  width: 85%;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.search-bar button {
  height: 100%;
  margin-left: 10px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

table {
  border-spacing: 0 10px;
  width: 95%;
  max-height: 80%;
  margin-left: 25px;
}

th,
td {
  text-align: left;
  padding: 12px;
  height: 10px;
}

.center-text {
  text-align: center;
}

th {
  background-color: #ddd;
  border: 1px solid black;
}

td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}

tbody tr {
  border: 1px solid black;
  padding: 8px 0;
  background-color: white;
}

tbody tr:hover {
  background-color: #ddd;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.top-bar {
  position: relative;
  height: 20%;
  font-family: "AccidentalPresidency";
  color: #034EA2;
}

.top-bar>.account-bar {
  padding: 7px 30px;
  position: absolute;
  top: -8%;
  right: -1%;
  border-radius: 0 0 0 20px;
  background-color: #D9D9D9;
  display: flex;
  flex-direction: row;
}

.top-bar>.account-bar>a.my-account-button {
  font-family: "AccidentalPresidency";
  color: black !important;
  margin-right: 20px;
  cursor: pointer;
}

a.logout-link {
  color: #034EA2;
  text-decoration: none;
}

.top-bar>.account-bar>img {
  height: 25px;
  width: 25px;
}

.top-bar>.title {
  padding: 25px 0 0 30px;
  font-size: 28px;
}

.top-bar>a {
  margin-right: 20px;
}

.top-bar>.add-contact-button {
  cursor: pointer;
  text-decoration: none;
  color: #034EA2;
}

.top-bar>.search-page-button {
  padding-left: 30px;
  cursor: pointer;
  text-decoration: underline;
}

.top-bar>.admin-page-button {
  cursor: pointer;
  text-decoration: none;
  color: #034EA2;
}

.logo {
  padding: 25px 0 10px 35px;
}

.search-through {
  display: flex;
  flex-direction: column;
  padding: 35px 10px 0 15px;
  font-size: 17px;
  font-weight: bold;
  font-family: 'AccidentalPresidency';
}

.search-through select {
  margin-top: 10px;
  font: 16px 'AccidentalPresidency';
  border: transparent;
  border-radius: 10px;
  padding: 5px;
  background-color: #D9D9D9;
}

.filter-communication {
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 15px;
  font: bold 17px 'AccidentalPresidency';
}

.checkbox {
  display: flex;
  flex-direction: row;
  padding: 6px 0;
}

.checkbox>input {
  cursor: pointer;
  height: 15px;
}

.checkbox-label {
  font: 300 15px 'AccidentalPresidency';
  padding-left: 10px;
}

.selected-filters {
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0 15px;
  font: bold 17px 'AccidentalPresidency';
  flex-grow: 1;
}

.filters {
  margin-top: 8px;
  height: 250px;
  border-radius: 10px;
  background-color: #D9D9D9;
}

.search-container {
  background-color: #D9D9D9;
  margin-left: 30px;
  border-radius: 20px 0 0 0;
  box-shadow: inset 0 0 15px #717171;
  height: 150%;
  width: 98%;
  position: absolute;
}

.search-bar {
  display: flex;
  margin-bottom: 25px;
  margin-top: 25px;
  margin-left: 25px;
  align-items: center;
}

.search-bar input {
  width: 85%;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.search-bar button {
  height: 100%;
  margin-left: 10px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

table {
  border-spacing: 0 10px;
  width: 95%;
  max-height: 80%;
  margin-left: 25px;
}

th,
td {
  text-align: left;
  padding: 12px;
  height: 10px;
}

.center-text {
  text-align: center;
}

th {
  background-color: #ddd;
  border: 1px solid black;
}

td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}

tbody tr {
  border: 1px solid black;
  padding: 8px 0;
  background-color: white;
}

tbody tr:hover {
  background-color: #ddd;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button,
.pagination span {
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.pagination button:hover {
  background-color: #f0f0f0;
}

.pagination span {
  background-color: #f0f0f0;
  cursor: default;
}

.actions-container {
  position: relative;
  margin-left: auto;
}


.edit-contact-icon {
  margin-top: 15px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 15px;
  transition: background-color 0.3s ease;
  border-radius: 50%;
}

.edit-contact-icon:hover {
  background-color: #cecdcd;
}

.delete-button {
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 50%;
}

.delete-button:hover {
  background-color: #cecdcd;
}
</style>
