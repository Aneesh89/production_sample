const wait = interval => new Promise(resolve => setTimeout(resolve, interval));
async function retryPromise(fn, retriesLeft = 3, interval = 200) {
  try {
    return await fn;
  } catch (error) {
    await wait(interval);
    if (retriesLeft === 0) {
      throw new Error(error);
    }
    console.log('retriesLeft: ', retriesLeft);

    return await retryPromise(fn, --retriesLeft, interval);
  };
}
export default retryPromise;