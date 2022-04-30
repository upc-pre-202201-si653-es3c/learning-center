<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { label: "Home", to: "/home" },
        { label: "About", to: "/about" },
        { label: "Tutorials", to: "/tutorials" },
      ],
    };
  },
};
</script>

<template>
  <pv-toast/>
  <header>
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button class="p-button-text text-white" icon="pi pi-bars" @click="drawer=!drawer"></pv-button>
        <h3>ACME Learning Center</h3>
      </template>
      <template #end>
        <div class="flex-column">
          <router-link v-for="item in items" :to="item.to" custom v-slot="{ navigate, href }" :key="item.label">
            <pv-button class="p-button-text text-white" :href="href" @click="navigate">{{ item.label }}</pv-button>
          </router-link>
        </div>
      </template>
    </pv-toolbar>
  </header>
  <pv-sidebar v-model:visible="drawer"></pv-sidebar>
  <RouterView />
</template>
