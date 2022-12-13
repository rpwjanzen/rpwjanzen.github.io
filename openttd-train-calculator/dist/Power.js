export class Power {
    constructor(_kWh) {
        this._kWh = _kWh;
    }
    static KilowattHour(kWh) {
        return new Power(kWh);
    }
    // Imperial HP
    static Hp(hp) {
        return new Power(hp / 1.34102209);
    }
    tokWh() { return this._kWh; }
    toHp() { return this._kWh * 1.34102209; }
    valueOf() { return this._kWh; }
    mul(n) {
        return new Power(this._kWh * n);
    }
}
//# sourceMappingURL=Power.js.map