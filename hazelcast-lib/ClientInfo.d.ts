import { Address } from './Address';
import { UUID } from './core/UUID';
export declare class ClientInfo {
    /**
     * Unique id of this client instance.
     */
    uuid: UUID;
    /**
     * Local port address that is used to communicate with cluster.
     */
    localAddress: Address;
    /**
     * Type of this client. It is always NodeJS.
     */
    type: string;
    /**
     * Name of the client.
     */
    name: string;
    /**
     * Set of all labels of this client.
     */
    labels: Set<string>;
}
