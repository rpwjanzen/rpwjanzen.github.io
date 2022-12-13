import { SpeedUnits } from './SpeedUnits.js';
export class Speed {
    constructor(_kmPerHour) {
        this._kmPerHour = _kmPerHour;
    }
    static KmPerHour(kmPerHour) {
        return new Speed(kmPerHour);
    }
    static Value(value) {
        return new Speed(value);
    }
    static MilesPerHour(milesPerHour) {
        return new Speed(milesPerHour * 1.6);
    }
    toKmPerHour() { return this._kmPerHour; }
    toMilesPerHour() { return this._kmPerHour / 1.6; }
    toTilesPerDay() { return this._kmPerHour / 28; }
    toMetersPerSecond() { return this._kmPerHour / 3.6; }
    toSpeedUnit(speedUnits) {
        switch (speedUnits) {
            case SpeedUnits.kmPerHour:
                return this.toKmPerHour();
            case SpeedUnits.milesPerHour:
                return this.toMilesPerHour();
            case SpeedUnits.metersPerSecond:
                return this.toMetersPerSecond();
            case SpeedUnits.tilesPerDay:
                return this.toTilesPerDay();
            default:
                throw new Error();
        }
    }
    toText(speedUnits) {
        switch (speedUnits) {
            case SpeedUnits.kmPerHour:
                return this.toKmPerHour().toFixed(0) + ' km/h';
            case SpeedUnits.milesPerHour:
                return this.toMilesPerHour().toFixed(0) + 'mph';
            case SpeedUnits.metersPerSecond:
                return this.toMetersPerSecond().toFixed(1) + ' m/s';
            case SpeedUnits.tilesPerDay:
                return this.toTilesPerDay().toFixed(1) + ' tiles/day';
            default:
                throw new Error();
        }
    }
    valueOf() { return this._kmPerHour; }
    greaterThan(a) {
        return this._kmPerHour > a._kmPerHour;
    }
    lessThanOrEqualTo(o) {
        return this._kmPerHour <= o._kmPerHour;
    }
    mul(n) {
        return new Speed(this._kmPerHour * n);
    }
    div(n) {
        return new Speed(this._kmPerHour / n);
    }
    divSpeed(s) {
        return this._kmPerHour / s._kmPerHour;
    }
    sub(s) {
        return new Speed(this._kmPerHour - s._kmPerHour);
    }
    add(s) {
        return new Speed(this._kmPerHour + s._kmPerHour);
    }
    static max(a, b) {
        return b._kmPerHour > a._kmPerHour ? b : a;
    }
    static min(a, b) {
        return b._kmPerHour < a._kmPerHour ? b : a;
    }
}
Speed.Zero = new Speed(0);
//# sourceMappingURL=Speed.js.map