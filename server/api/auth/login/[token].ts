export default defineEventHandler(async (event) => {
  const token = event.context.params?.token;

  if (token) {
    return { token };
  }

  return {};
});
