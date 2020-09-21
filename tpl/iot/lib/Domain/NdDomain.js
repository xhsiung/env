"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var Parser;
(function (Parser) {
    function Parse(payload) {
        const obj = JSON.parse(payload.toString());
        return {
            _id: ``,
            timestamp: obj.data.timestamp,
            gatewayId: obj.gateway_id,
            customerId: obj.customer_id,
            districtId: obj.district_id,
            meterId: obj.meter_id,
            energyN: obj.data.energy_n,
            energyR: obj.data.energy_r,
        };
    }
    Parser.Parse = Parse;
})(Parser = exports.Parser || (exports.Parser = {}));
