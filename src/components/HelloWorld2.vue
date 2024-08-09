<template>
  <div>
    <h1>
      <span>
        <label>Project Name: {{ searchFrameworkOptions.projectName }}</label>
        <br />
        <label>Prefix Label I18n: {{ searchFrameworkOptions.prefixLabelI18n }}</label>
      </span>
    </h1>
  </div>
</template>
<script lang="ts">
import {defineComponent, getCurrentInstance} from "vue";
export default defineComponent({
  name: 'HelloWorld2',
  setup() {
    const { appContext } = getCurrentInstance()!;

    const searchFrameworkOptions = appContext.config.globalProperties.$searchFrameworkOptions;

    return {
      searchFrameworkOptions
    };
  }
});
</script>
