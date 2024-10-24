import getData from './lib/service.js';

const runApp = async () => {
  const userId = 1;
  const result = await getData(userId);
  console.log(result);
};

runApp();
