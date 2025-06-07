<template>
  <div>
    <div class="doctor-card">
      <div class="p-2">
        <h3 class="text-base font-medium text-gray-800">
          {{ doctor.name }}
        </h3>
        <h3 class="text-base text-gray-600 pt-2">
          {{ doctor.role }}
        </h3>
        <h3 class="text-base text-gray-600">
          {{ doctor.profession }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorCard',
  props: {
    doctor: Object,
  },
}
</script>

<style scoped>
.doctor-card {
  display: flex;
  flex-direction: column;
  @media (min-width: 640px) {
    flex-direction: row;
  }
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  height: 7rem; 
  background-color: #ffffff;
  border-radius: 0.5rem;
  margin: 0.5rem;
}
</style>
