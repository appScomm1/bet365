export declare class MemoryService {
    static HASH: string;
    storage: Storage;
    constructor();
    getAndSet(key: string, value?: string): void;
    getAll(): any;
    removeAll(): any;
}
