export class Mass {
    // short ton
    constructor(_tons) {
        this._tons = _tons;
    }
    static Ton(ton) {
        return new Mass(ton);
    }
    static Tonne(tonne) {
        return new Mass(tonne * 1.10231131);
    }
    static Kg(kg) {
        return new Mass(kg / 907.18474);
    }
    toTon() {
        return this._tons;
    }
    toTonne() {
        return this._tons / 1.10231131;
    }
    toKg() {
        return this._tons * 907.18474;
    }
    mul(n) {
        return new Mass(this._tons * n);
    }
    add(o) {
        return new Mass(this._tons + o._tons);
    }
}
//# sourceMappingURL=Mass.js.map