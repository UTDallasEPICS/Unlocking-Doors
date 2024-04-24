<template lang="pug">
.container
    .sidebar
        .logo
            img(src='~/assets/logo.png' width='150')
    .body
        .top-bar
            .account-bar
                a.logout-link(href='/api/logout') Logout
                img(src='~/assets/account.png')
            .title
                strong Tag Management
            a.search-page-button(@click="navigateTo('/')") Search Page
            a.text |
            NuxtLink.add-contact-button(to='addContact') Add New Contact
            a.text |
            NuxtLink.admin-page-button(to='admin') Admin Page
            a.text |
            NuxtLink.manage-tags-button(to='manageTags') Manage Tags
            a.text |
            button(@click="downloadContacts()") Download Contacts
            //need to make these buttons conditional and work like the rest^
        .search-container
            table
                tbody
                    tr
                        th Current Tags
                    tr(v-for="(tag, index) in filteredTags" :key="tag.id")
                        td
                            template(v-if="editIndex !== index")
                                input(
                                    type="text",
                                    v-model="editedTags[index]",
                                    @keydown.enter="saveTag(tag, index)",
                                    @keydown.esc="cancelEdit(index)"
                                )
                                button(@click="saveTag(tag, index)") Save
                                button(@click="cancelEdit(index)") Cancel
                                button(@click="deleteTag(tag, index)") Delete
                            template(v-else)
                                input(
                                    type="text",
                                    v-model="editedTags[index]",
                                    @keydown.enter="saveTag(tag, index)",
                                    @keydown.esc="cancelEdit(index)"
                                )
                                button(@click="saveTag(tag, index)") Save
                                button(@click="cancelEdit(index)") Cancel
                                button(@click="deleteTag(tag, index)") Delete
</template>

<script lang="ts" setup>
import type { User, Tag } from '@/types.d';
import { ref, computed } from 'vue';
import { useFetch } from 'nuxt/app';
import { useRouter } from 'vue-router';

const tags = ref<Tag[]>([]);
const editedTags = ref<string[]>([]);
const editIndex = ref<number | null>(null);
let nextTagId = 1;


const fetchData = async () => {
    const { data, error } = await useFetch('/api/tag', {
        method: 'GET',
    });

    if (error.value) {
        console.error('Failed to fetch tags:', error.value.message);
        return;
    }

    if (data.value && Array.isArray(data.value)) {
        console.log(data.value);
        tags.value = data.value.map((item) => ({
            id: item.id,
            name: item.name,

            removed: false,
        }));
        editedTags.value = tags.value.map((tag) => tag.name);
    }
}

fetchData();

const startEdit = (index: number) => {
    editedTags.value[index] = tags.value[index].name;
    editIndex.value = index;
};

const saveTag = async (tag: Tag, index: number) => {
    console.log("making the call",editIndex.value,index);
   // if (editIndex.value === index) {
        tags.value[index].name = editedTags.value[index];
        editIndex.value = null;
        // Update the tag name in the database
        try {
            console.log("making the call");
            await useFetch(`/api/tag/?id=${tag.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name: editedTags.value[index] }),
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error updating tag:', error);
            // Handle error
        }
   // }
};

const cancelEdit = (index: number) => {
    editedTags.value[index] = tags.value[index].name;
    editIndex.value = null;
};

const editTag = (index: number) => {
    startEdit(index);
};

const deleteTag = async (tag: Tag, index: number) => {
    console.log("delete tag call")
    if (confirm(`Are you sure you want to delete the tag "${tag.name}"?`)) {
        const tagIndex = tags.value.findIndex(t => t.id === tag.id);
        if (tagIndex !== -1) {
            tags.value.splice(tagIndex, 1);
            // Update the editedTags array after deleting the tag
            editedTags.value.splice(index, 1);
            // You may want to perform additional actions here, such as deleting the tag from the database
            try {
                console.log("trying to fetch")
                await useFetch(`/api/tag/?id=${tag.id}`, {
                    method: 'DELETE',
                });
            } catch (error) {
                console.error('Error deleting tag:', error);
                // Handle error
            }
        }
    }
};

// Filter out deleted tags
const filteredTags = computed(() => tags.value.filter(tag => !tag.removed));

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
</style>

now that works, just have to actually update the tag name, more backend. how do i do that?
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
</style>