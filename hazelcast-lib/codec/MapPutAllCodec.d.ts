import { ClientMessage } from '../ClientMessage';
import { Data } from '../serialization/Data';
export declare class MapPutAllCodec {
    static encodeRequest(name: string, entries: Array<[Data, Data]>): ClientMessage;
}
