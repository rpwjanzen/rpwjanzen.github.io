/// <reference path = "../typings/chartist.d.ts" />
/// <reference path = "../typings/chartist.plugin.legend.d.ts" />
import { Mass } from './Mass.js';
import { Speed } from './Speed.js';
import { Power } from './Power.js';
import { TractiveEffort } from './TractiveEffort.js';
import { Role } from './Role.js';
import { allEngines } from './Engines.js';
function convertToDisplayUnits(speedUnits, speedsByEngineByDay) {
    const results = [[]];
    for (let i = 0; i < speedsByEngineByDay.length; i++) {
        const arr = speedsByEngineByDay[i];
        const rs = [];
        for (let j = 0; j < arr.length; j++) {
            rs[j] = arr[j].toSpeedUnit(speedUnits);
        }
        results[i] = rs;
    }
    return results;
}
function getEngines() {
    const role = getRole();
    const trackGauge = getTrackGauge();
    const generation = getGeneration();
    const gameplayMode = getGameplayMode();
    let engines = [];
    // filter out roles that are not selected
    switch (role) {
        case 'All':
            engines = allEngines;
            break;
        default:
            let matchingRoles = [];
            switch (role) {
                case 'Freight':
                    matchingRoles.push(Role.Freight, Role.FreightJoker, Role.HeavyFreight, Role.HeavyFreightJoker, Role.LightFreight, Role.LightFreightJoker, Role.SuperHeavyFreight, Role.SuperHeavyFreightJoker, Role.UltraHeavyFreight);
                    break;
                case 'General Purpose / Express':
                    matchingRoles.push(Role.Express, Role.GeneralPurpose, Role.GeneralPurposeExpress, Role.GeneralPurposeExpressJoker, Role.HeavyGeneralPurposeExpress, Role.HeavyGeneralPurposeExpressJoker, Role.SuperHeavyGeneralPurposeExpress, Role.SuperHeavyGeneralPurposeExpressJoker, Role.UltraHeavyGeneralPurposeExpress);
                    break;
                case 'Railcars / Multiple-Unit Trains':
                    matchingRoles.push(Role.MailRailcar, Role.PassengerRailcarHighCapacitySuburban);
                    break;
                case 'High Speed':
                    matchingRoles.push(Role.HighSpeed);
                    break;
                case 'Very High Speed':
                    matchingRoles.push(Role.VeryHighSpeed);
                    break;
                case 'Lolz':
                    matchingRoles.push(Role.Joker);
                    break;
            }
            engines = allEngines.filter(x => matchingRoles.indexOf(x.role) !== -1);
            break;
    }
    // filter out gauges that are not selected
    switch (trackGauge) {
        case 'All':
            engines = engines;
            break;
        default:
            engines = engines.filter(x => x.gauge === trackGauge);
            break;
    }
    switch (gameplayMode) {
        case 'Full':
            break;
        case 'Simplified':
            engines = engines.filter(x => x.gameplayMode === gameplayMode);
            break;
    }
    // filter out engines from generations that are not selected
    engines = engines.filter(x => x.generation === generation);
    return engines;
}
function createLabel(maxActualSpeed, engine, trainMass) {
    const speedUnits = getSpeedUnits();
    let actualMaxSpeedText = maxActualSpeed.toText(speedUnits);
    let maxSpeedText = engine.maxSpeed.toText(speedUnits);
    const minTe = TractiveEffort.Kn(trainMass.mul(35).toTon() / 1000);
    const isUnderTe = engine.te.toKn() < minTe.toKn();
    const minPower = Power.KilowattHour(minTe.toKn() * engine.maxSpeed.toKmPerHour() / 3.6);
    const isUnderpowered = engine.power.tokWh() < minPower.tokWh();
    const isSlow = maxActualSpeed.toKmPerHour() / engine.maxSpeed.toKmPerHour() < 0.77;
    if (isSlow || isUnderTe || isUnderpowered) {
        let en = engine.name + ' \uD83D\uDC0C';
        if (isSlow) {
            en += ` (${actualMaxSpeedText} of ${maxSpeedText}) `;
        }
        else {
            en += ` (${actualMaxSpeedText}) `;
        }
        return en;
    }
    else {
        return engine.name + ` (${actualMaxSpeedText}) `;
    }
}
function createLabels(engines, speedsByEngineByDay, trainMasses) {
    const engineLabels = [];
    for (let i = 0; i < engines.length; i++) {
        const engine = engines[i];
        const speedsByDay = speedsByEngineByDay[i];
        const maxActualSpeed = speedsByDay.reduce((c, acc) => Speed.max(c, acc));
        engineLabels.push(createLabel(maxActualSpeed, engine, trainMasses[i]));
    }
    return engineLabels;
}
function calculateEquilibriumSpeeds(engines) {
    const engineCount = getEngineCount();
    const trainLength = getTrainLength();
    const carLength = getCarLength();
    const loadedCarMass = getLoadedCarMass();
    const equilibirumSpeeds = [];
    for (const engine of engines) {
        const engineLength = engine.length;
        const totalEngineLength = engineCount * engineLength;
        const carCount = Math.trunc((trainLength - totalEngineLength) / carLength);
        const totalCarMass = loadedCarMass.mul(carCount);
        const totalTrainMass = engine.mass.mul(engineCount).add(totalCarMass);
        const totalEnginePower = engine.power.mul(engineCount);
        const totalTe = engine.te.mul(engineCount);
        const eqSpeed = calculateEquilibriumSpeed(totalTrainMass, carCount + engineCount, totalEnginePower, engine.maxSpeed, totalTe, false);
        const minTe = TractiveEffort.Kn(totalTrainMass.mul(35).toTon() / 1000);
        const isUnderTe = engine.te.toKn() < minTe.toKn();
        const minPower = Power.KilowattHour(minTe.toKn() * engine.maxSpeed.toKmPerHour() / 3.6);
        const isUnderpowered = engine.power.tokWh() < minPower.tokWh();
        const isSlow = eqSpeed.toKmPerHour() / engine.maxSpeed.toKmPerHour() < 0.77;
        equilibirumSpeeds.push({ engine: engine, speed: eqSpeed, mass: totalTrainMass, isSlow: isSlow, isUnderTe: isUnderTe, isUnderpowered: isUnderpowered });
    }
    equilibirumSpeeds.sort((a, b) => {
        if (a.isUnderTe && !b.isUnderTe) {
            return 1;
        }
        if (!a.isUnderTe && b.isUnderTe) {
            return -1;
        }
        if (a.isUnderpowered && !b.isUnderpowered) {
            return 1;
        }
        if (!a.isUnderpowered && b.isUnderpowered) {
            return -1;
        }
        if (a.isSlow && !b.isSlow) {
            return 1;
        }
        if (!a.isSlow && b.isSlow) {
            return -1;
        }
        return b.speed.toKmPerHour() - a.speed.toKmPerHour();
    });
    return equilibirumSpeeds;
}
function displayEquilibriumSpeeds(equilibirumSpeeds) {
    const speedUnits = getSpeedUnits();
    const table = document.querySelector('#engine-speeds-table');
    // first row is header row; keep it
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
    for (const e of equilibirumSpeeds) {
        const row = table.insertRow(-1);
        const nameCell = row.insertCell(0);
        const engine = e.engine;
        let engineLabel = null;
        if (e.isSlow || e.isUnderTe || e.isUnderpowered) {
            engineLabel = engine.name + ' \uD83D\uDC0C';
        }
        else {
            engineLabel = engine.name;
        }
        const nameTextNode = document.createTextNode(engineLabel);
        nameCell.appendChild(nameTextNode);
        const speedCell = row.insertCell(1);
        const speedTextNode = document.createTextNode(e.speed.toText(speedUnits));
        speedCell.appendChild(speedTextNode);
    }
}
let requestId = 0;
function recalculateChartDataRequested() {
    const onTimeout = (currentRequestId) => {
        if (requestId !== currentRequestId) {
            return;
        }
        recalculateChartData();
    };
    requestId++;
    window.setTimeout(onTimeout, 500, requestId);
}
let lineChart;
let legend;
function recalculateChartData() {
    const engines = getEngines();
    if (engines.length === 0) {
        document.querySelector('#all-trains-filtered').style.display = "block";
        document.querySelector('#chart').style.display = "none";
        return;
    }
    else {
        document.querySelector('#all-trains-filtered').style.display = "none";
        document.querySelector('#chart').style.display = "block";
    }
    const equilibriumSpeeds = calculateEquilibriumSpeeds(engines);
    // equilibriumSpeeds.length = Math.min(15, equilibriumSpeeds.length);
    engines.length = 0;
    for (const s of equilibriumSpeeds) {
        engines.push(s.engine);
    }
    displayEquilibriumSpeeds(equilibriumSpeeds);
    const engineCount = getEngineCount();
    const trainLength = getTrainLength();
    const carLength = getCarLength();
    const loadedCarMass = getLoadedCarMass();
    const speedsByEngineByDay = [];
    let topSpeed = Speed.KmPerHour(0);
    const totalTrainMasses = [];
    for (const engine of engines) {
        topSpeed = Speed.max(engine.maxSpeed, topSpeed);
        const engineLength = engine.length;
        const totalEngineLength = engineCount * engineLength;
        const carCount = Math.trunc((trainLength - totalEngineLength) / carLength);
        const totalCarMass = loadedCarMass.mul(carCount);
        const totalTrainMass = engine.mass.mul(engineCount).add(totalCarMass);
        totalTrainMasses.push(totalTrainMass);
        const totalEnginePower = engine.power.mul(engineCount);
        const totalTe = engine.te.mul(engineCount);
        const dragCoefficient = 20 + 3 * (carCount + engineCount);
        // const maxDays = 25; // this is actually 10 days (25 / 2.5) -> 10 days
        const maxDays = 75;
        // const initialSpeed = Speed.KmPerHour(2);
        const initialSpeed = Speed.KmPerHour(14); // trains appear to hit 14km/h on first day
        let currentSpeed = initialSpeed;
        const speedsByDay = [initialSpeed];
        let subspeed = 0;
        for (let day = 0; day < maxDays; day++) {
            const useSourceCode = false;
            let nextSpeed;
            if (!useSourceCode) {
                // const dragCoefficient = 20 + 3 * (carCount + engineCount);
                // nextSpeed = calculateNextSpeed(currentSpeed, totalTrainMass, carCount, dragCoefficient, totalEnginePower, engine.maxSpeed);
                nextSpeed = calculateNextSpeed2(currentSpeed, totalTrainMass, carCount + engineCount, dragCoefficient, totalEnginePower, engine.maxSpeed, totalTe);
            }
            else {
                const trainTe = engine.te.mul(engineCount);
                let [ns, s] = calculateNextSpeedFromSourceCode(currentSpeed, totalTrainMass, totalEnginePower, trainTe, engine.maxSpeed, subspeed);
                nextSpeed = ns;
                subspeed = s;
            }
            if (Speed.Zero.greaterThan(nextSpeed)) {
                nextSpeed = Speed.Zero;
            }
            speedsByDay.push(nextSpeed);
            currentSpeed = nextSpeed;
            // topSpeed = Speed.max(currentSpeed, topSpeed);
        }
        speedsByEngineByDay.push(speedsByDay);
    }
    // TODO: pick top 5 engines & order by achieved max speed
    const engineLabels = createLabels(engines, speedsByEngineByDay, totalTrainMasses);
    const speedUnits = getSpeedUnits();
    const data = convertToDisplayUnits(speedUnits, speedsByEngineByDay);
    if (data[0] !== undefined) {
        // engineLabels.length = Math.min(5, engineLabels.length);
        legend = Chartist.plugins.legend({
            legendNames: engineLabels,
        });
        // data.length = Math.min(5, data.length);
        lineChart = new Chartist.Line('#chart', {
            labels: Object.keys(data[0]),
            series: data,
        }, {
            high: topSpeed.toSpeedUnit(speedUnits),
            low: 0,
            fullWidth: true,
            axisX: { showLabel: false, showGrid: false },
            showPoint: false,
            plugins: [
                legend
            ]
        });
    }
}
function calculateNextSpeed(currentSpeed, totalTrainMass, carCount, dragCoefficient, totalEnginePower, maxSpeed) {
    // approx 120
    const a = 120;
    // maybe 35 only on flat terrain? 335 on uphill?
    const u = 35;
    const q = 60 * carCount * getSi();
    // from https://wiki.openttd.org/en/Archive/Source/OpenTTDDevBlackBook/Simulation/Train%20Acceleration
    const currentSpeedInMph = currentSpeed.toMilesPerHour();
    const frictionForceInN = 4 * ((1.3 * totalTrainMass.toTon()) +
        (60 * carCount) + (u * totalTrainMass.toTon() * currentSpeedInMph * 0.001) +
        ((a * dragCoefficient * currentSpeedInMph * currentSpeedInMph) / 10000) +
        q);
    const accelerationForceInN = (2.2 * totalEnginePower.tokWh() * 1000) / currentSpeedInMph;
    // acceleration is in units of 256 of a km/h-ish per half-tick
    const acceleration = (accelerationForceInN - frictionForceInN) / (4 * totalTrainMass.toTon());
    // approx matches game results
    const accelPerDay = 185; // 185 = 74 + 74 + (74/2) = 2.5 days?
    const nextSpeed = Speed.min(currentSpeed.add(Speed.KmPerHour((acceleration / 1000) * accelPerDay)), maxSpeed);
    return nextSpeed;
}
/**
 * from https://wiki.openttd.org/en/Manual/Game%20Mechanics/#trains , OpenTTD 1.6.1
 */
function calculateNextSpeed2(currentSpeed, totalTrainMass, trainParts, dragCoefficient, totalEnginePower, maxSpeed, maxTe) {
    const maxTeInKn = maxTe.toKn();
    const maxPowerInHp = totalEnginePower.toHp();
    const massInTonnes = totalTrainMass.toTonne();
    const maxSpeedInKmH = maxSpeed.toKmPerHour();
    const airDragValue = Math.min(192, Math.max(1, Math.floor(2048 / maxSpeedInKmH)));
    const currentSpeedInKmH = currentSpeed.toKmPerHour();
    const forceInN = Math.min(maxTeInKn * 1000, Math.floor((maxPowerInHp * 746) / (currentSpeedInKmH * 5 / 18)));
    const slopeForceInN = 0;
    const axleFrictionInN = massInTonnes * 10;
    const rollingFrictionInN = Math.floor((currentSpeedInKmH + 512) * 15 / 512) * massInTonnes;
    const airDragCoefficient = 14 * Math.floor(airDragValue * (1 + trainParts * 3 / 20)) / 1000;
    const airDragInN = Math.floor(airDragCoefficient * currentSpeedInKmH * currentSpeedInKmH);
    // in 256th of a km/h per half-tick -> 128th of a km/h per tick?
    const accelerationInN = (forceInN - (slopeForceInN + axleFrictionInN + rollingFrictionInN + airDragInN)) / (massInTonnes * 4);
    const accelPerDay = 185; // 185 = 74 + 74 + (74/2) = 2.5 days?
    const nextSpeed = Speed.min(currentSpeed.add(Speed.KmPerHour((accelerationInN / (512 * 2)) * accelPerDay)), maxSpeed);
    return nextSpeed;
}
/**
 *
 * @param massOfPartsOnInclineInT
 * @param massOfPartsOnDeclineInT
 * @param slopeSteepness 1-10, default 3
 */
function getSlopeResistanceFromSourceCode(massOfPartsOnInclineInT, massOfPartsOnDeclineInT, slopeSteepness) {
    return massOfPartsOnInclineInT * slopeSteepness * 100 - massOfPartsOnDeclineInT * slopeSteepness * 100;
}
/**
 *
 * @param {Speed} currentSpeed
 * @param {Mass} trainMass
 * @param {Power} trainPower
 * @param {TractiveEffort} trainMaxTe
 * @param {number} slopeResistanceInN
 * @param {Speed} maxSpeed
 * @param {boolean} isMaglev
 * @param {boolean} isInTunnel
 * @returns {number} in 256th of a km/hish per half-tick
 */
function getAccelerationFromSourceCode(currentSpeed, trainMass, trainPower, trainMaxTe, slopeResistanceInN, maxSpeed, isMaglev, isInTunnel) {
    // OpenTTD v1.11.2
    // ground_vehicle.cpp::GetAcceleration()
    const speed = currentSpeed.toKmPerHour();
    let resistance = 0;
    // train.h::GetAirDragArea()
    const area = isInTunnel ? 28 : 14;
    if (!isMaglev) {
        const axleResistance = 10 * trainMass.toTon();
        // cached_axle_resistance
        resistance = axleResistance;
        // train.h::GetRollingFriction()
        const rollingFriction = 15 * (512 + currentSpeed.toKmPerHour()) / 512;
        resistance += trainMass.toTon() * rollingFriction;
    }
    // air drag co-efficient of vehicle (only affects first engine)
    // assume depends on max speed; ground_vehicle.cpp::PowerChanged()
    // assume all engines have air drag
    let airDrag = 0;
    if (maxSpeed.lessThanOrEqualTo(Speed.KmPerHour(10))) {
        airDrag = 192;
    }
    else {
        airDrag = Math.max(Speed.KmPerHour(2028).divSpeed(maxSpeed), 1);
    }
    resistance += (area * airDrag * speed * speed) / 1000;
    // train.h::GetSlopeResistance()
    resistance += slopeResistanceInN;
    // train.h::GetAccelerationStatus()
    const isAccelerating = true;
    // to Kw
    const power = trainPower.toHp() * 74611; // OpenTTD HP is in mechanical/imperial horsepower
    let force;
    const isMoving = currentSpeed.greaterThan(Speed.Zero);
    if (isMoving) {
        if (!isMaglev) {
            force = power * 18 / currentSpeed.mul(5).toMilesPerHour();
        }
        else {
            force = power / 25;
        }
    }
    else { // "kickoff" acceleration from a standstill
        force = (isAccelerating && !isMaglev) ? Math.min(trainMaxTe.toKn(), power) : power;
        force = Math.max(force, (trainMass.toTon() * 8) + resistance);
    }
    if (isAccelerating) {
        // determine if two numbers are "equal"
        if (Math.abs(force - resistance) < Number.EPSILON) {
            return 0;
        }
        const accel = (force - resistance) / (trainMass.toTon() * 4);
        return force < resistance ? Math.min(-1, accel) : Math.max(1, accel);
    }
    else { // is braking
        return Math.min(-force - resistance, -10000) / trainMass.toTon();
    }
}
function calculateNextSpeedFromSourceCode(currentSpeed, trainMass, trainPower, trainMaxTe, maxSpeed, subspeed) {
    const massOfPartsOnInclineInT = 0;
    const massOfPartsOnDeclineInT = 0;
    const slopeSteepness = 3;
    const slopeResistanceInN = getSlopeResistanceFromSourceCode(massOfPartsOnInclineInT, massOfPartsOnDeclineInT, slopeSteepness);
    const isMagLev = false;
    const isInTunnel = false;
    const accel = getAccelerationFromSourceCode(currentSpeed, trainMass, trainPower, trainMaxTe, slopeResistanceInN, maxSpeed, isMagLev, isInTunnel);
    // ground_vehicle.hpp::DoUpdateSpeed
    // subspeed starts at 0.
    const spd = subspeed + accel;
    subspeed = spd & 0xFF;
    let tempMax = maxSpeed;
    if (currentSpeed.greaterThan(maxSpeed)) {
        tempMax = Speed.max(currentSpeed.sub(currentSpeed.div(10).sub(Speed.KmPerHour(1))), maxSpeed);
    }
    console.log(spd >> 8);
    currentSpeed = Speed.max(Speed.min(currentSpeed.add(Speed.KmPerHour(spd >> 8)), tempMax), Speed.KmPerHour(2));
    return [currentSpeed, subspeed];
}
function calculateEquilibriumSpeed(totalTrainMass, trainPartCount, totalEnginePower, maxSpeed, totalEngineTe, isInTunnel) {
    const maxPowerInHp = totalEnginePower.toHp();
    const maxSpeedInKmH = maxSpeed.toKmPerHour();
    // NewGRF-specific; using default calculation here
    const airDragOfFirstEngine = Math.min(192, Math.max(1, Math.floor(2048 / maxSpeedInKmH)));
    const massOfPartsOnInclineInT = 0;
    const massOfPartsOnDeclineInT = 0;
    // 1-10, default is 3
    const slopeSteepness = 3;
    const currentSpeedInKmH = maxSpeed.toKmPerHour();
    const slopeForceInN = massOfPartsOnInclineInT * slopeSteepness * 100 - massOfPartsOnDeclineInT * slopeSteepness * 100;
    const axleFrictionForceInN = totalTrainMass.toTon() * 10;
    const rollingFrictionInN = 
    // train.h: GetRollingFriction
    Math.floor((currentSpeedInKmH + 512) * 15 / 512) * totalTrainMass.toTon();
    let airDragCoefficient = 14 * Math.floor(airDragOfFirstEngine * (1 + trainPartCount * 3 / 20)) / 1000;
    let airDragInN = Math.floor(airDragCoefficient * currentSpeedInKmH * currentSpeedInKmH);
    if (isInTunnel) {
        airDragInN = airDragInN * 2;
    }
    const p = (slopeForceInN + axleFrictionForceInN + rollingFrictionInN) / airDragCoefficient;
    const q = (-maxPowerInHp * 746 * 18 / 5) / airDragCoefficient;
    const c = Math.pow(27 / 2 * q + Math.pow(Math.pow((27 / 2 * q), 2) + 27 * Math.pow(p, 3), (1 / 2)), (1 / 3));
    const equilibriumSpeed = Math.max(1, Math.min(maxSpeedInKmH, Math.min(p / c - c / 3, Math.pow(Math.max(0, totalEngineTe.toKn() * 1000 / airDragCoefficient - p), (1 / 2)))));
    return Speed.KmPerHour(equilibriumSpeed);
}
function checkNull(t) {
    return t !== null;
}
function getSpeedUnits() {
    return document.querySelector('#speedUnits').value;
}
function getTrainLength() {
    return parseFloat(document.querySelector('#trainLength').value);
}
function getEngineCount() {
    return parseInt(document.querySelector('#engineCount').value);
}
function getSi() {
    return parseInt(document.querySelector('#slope').value);
}
function getCarLength() {
    const v = document.querySelector('#carLength').value;
    return parseFloat(v);
}
function getLoadedCarMass() {
    return Mass.Tonne(parseInt(document.querySelector('#carMass').value));
}
function getRole() {
    return document.querySelector('#roles').value;
}
function getTrackGauge() {
    return document.querySelector('#trackGauge').value;
}
function getGeneration() {
    return parseInt(document.querySelector('#generation').value);
}
function getGameplayMode() {
    return document.querySelector('#gameplayMode').value;
}
document.addEventListener('DOMContentLoaded', function () {
    recalculateChartDataRequested();
});
const elementIds = [
    '#speedUnits',
    '#trainLength',
    '#engineCount',
    '#carLength',
    '#carMass',
    '#roles',
    '#trackGauge',
    '#generation',
    '#gameplayMode'
];
for (const elementId of elementIds) {
    document.querySelector(elementId).addEventListener('change', () => recalculateChartDataRequested());
}
//# sourceMappingURL=Script.js.map