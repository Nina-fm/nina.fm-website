import pkg from "~~/package.json";

export default defineNuxtPlugin(() => {
  const current = pkg.version;
  const version = useCookie("ninafm-app-version");
  
  const isNew = !version.value || current !== version.value;

  if (isNew) {
    version.value = current
  }

  return {
    provide: {
      version: {
        current,
        previous: version,
        isNew,
      },
    },
  };
});
