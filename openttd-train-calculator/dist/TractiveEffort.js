export class TractiveEffort {
    constructor(_kN) {
        this._kN = _kN;
    }
    static LbF(lbf) {
        return new TractiveEffort(lbf / 224.808943);
    }
    static KgF(kgF) {
        return new TractiveEffort(kgF / 101.971621);
    }
    static Kn(kN) {
        return new TractiveEffort(kN);
    }
    toKn() {
        return this._kN;
    }
    toLbF() {
        return this._kN * 224.808943;
    }
    toKgF() {
        return this._kN * 101.971621;
    }
    mul(n) {
        return new TractiveEffort(this._kN * n);
    }
}
//# sourceMappingURL=TractiveEffort.js.map