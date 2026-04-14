import { createWorker } from 'tesseract.js';
console.log("creating worker");
const worker = await createWorker(['eng', 'chi_sim']);
console.log("worker created");
await worker.terminate();
