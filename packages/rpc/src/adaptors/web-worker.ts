import type {MessageEndpoint} from '../types';

export function fromWebWorker(worker: Worker): MessageEndpoint {
  return worker;
}
