export class Health {
    constructor(
        public readonly status: string,
        public readonly timestamp: Date,
        public readonly version: string,
    ) { }
}
