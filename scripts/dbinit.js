"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.init = void 0;
var client_1 = require("@prisma/client");
function init(prisma) {
    return __awaiter(this, void 0, void 0, function () {
        var houses, railroad, utilities, drawable, special, card, property;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.houses.createMany({
                        data: [
                            { color: client_1.Color.BROWN, price: 50 },
                            { color: client_1.Color.LIGHTBLUE, price: 50 },
                            { color: client_1.Color.PINK, price: 100 },
                            { color: client_1.Color.ORANGE, price: 100 },
                            { color: client_1.Color.RED, price: 150 },
                            { color: client_1.Color.YELLOW, price: 150 },
                            { color: client_1.Color.GREEN, price: 200 },
                            { color: client_1.Color.BLUE, price: 200 },
                        ],
                        skipDuplicates: true
                    })];
                case 1:
                    houses = _a.sent();
                    return [4 /*yield*/, prisma.railroad.createMany({
                            data: [
                                { id: 5, name: 'Reading Railroad', price: 200, rent: [25, 50, 100, 200] },
                                { id: 15, name: 'Pennsylvania Railroad', price: 200, rent: [25, 50, 100, 200] },
                                { id: 25, name: 'B&O Railroad', price: 200, rent: [25, 50, 100, 200] },
                                { id: 35, name: 'Short Line', price: 200, rent: [25, 50, 100, 200] }
                            ],
                            skipDuplicates: true
                        })];
                case 2:
                    railroad = _a.sent();
                    return [4 /*yield*/, prisma.utilities.createMany({
                            data: [
                                { id: 12, name: 'Electric Company', price: 150, rent: [4, 10] },
                                { id: 28, name: 'Water Works', price: 150, rent: [4, 10] },
                            ],
                            skipDuplicates: true
                        })];
                case 3:
                    utilities = _a.sent();
                    return [4 /*yield*/, prisma.drawable.createMany({
                            data: [
                                { id: 2, type: client_1.Cardtype.COMMUNITYCHEST },
                                { id: 7, type: client_1.Cardtype.CHANCE },
                                { id: 17, type: client_1.Cardtype.COMMUNITYCHEST },
                                { id: 22, type: client_1.Cardtype.CHANCE },
                                { id: 33, type: client_1.Cardtype.COMMUNITYCHEST },
                                { id: 36, type: client_1.Cardtype.CHANCE },
                            ],
                            skipDuplicates: true
                        })];
                case 4:
                    drawable = _a.sent();
                    return [4 /*yield*/, prisma.special.createMany({
                            data: [
                                { id: 0, name: 'Go', description: 'Collect 200 Salary as You Pass' },
                                { id: 4, name: 'Income Tax', description: 'Pay 200' },
                                { id: 10, name: 'Jail', description: 'In Jail/Just Visiting' },
                                { id: 20, name: 'Free Parking', description: 'Free Parking' },
                                { id: 30, name: 'Go to Jail', description: 'Go to Jail' },
                                { id: 38, name: 'Luxury Tax', description: 'Pay 100' },
                            ],
                            skipDuplicates: true
                        })];
                case 5:
                    special = _a.sent();
                    return [4 /*yield*/, prisma.card.createMany({
                            data: [
                                // INFO: Chance: Community Chest
                                { description: "Advance to Go (Collect $200)", type: client_1.Cardtype.CHANCE },
                                { description: "Advance to Illinois Ave—If you pass Go, collect $200", type: client_1.Cardtype.CHANCE },
                                { description: "Advance to St. Charles Place – If you pass Go, collect $200", type: client_1.Cardtype.CHANCE },
                                { description: "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.", type: client_1.Cardtype.CHANCE },
                                { description: "Advance token to the nearest Railroad and pay owner twice the rental to which he/she {he} is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.", type: client_1.Cardtype.CHANCE },
                                { description: "Bank pays you dividend of $50", type: client_1.Cardtype.CHANCE },
                                { description: "Get Out of Jail Free", type: client_1.Cardtype.CHANCE },
                                { description: "Go Back 3 Spaces", type: client_1.Cardtype.CHANCE },
                                { description: "Go to Jail–Go directly to Jail–Do not pass Go, do not collect $200", type: client_1.Cardtype.CHANCE },
                                { description: "Make general repairs on all your property–For each house pay $25–For each hotel $100", type: client_1.Cardtype.CHANCE },
                                { description: "Pay poor tax of $15", type: client_1.Cardtype.CHANCE },
                                { description: "Take a trip to Reading Railroad–If you pass Go, collect $200", type: client_1.Cardtype.CHANCE },
                                { description: "Take a walk on the Boardwalk–Advance token to Boardwalk", type: client_1.Cardtype.CHANCE },
                                { description: "You have been elected Chairman of the Board–Pay each player $50", type: client_1.Cardtype.CHANCE },
                                { description: "Your building and loan matures—Collect $150", type: client_1.Cardtype.CHANCE },
                                { description: "You have won a crossword competition—Collect $100", type: client_1.Cardtype.CHANCE },
                                // INFO: Community Chest
                                { description: "Advance to Go (Collect $200)", type: client_1.Cardtype.COMMUNITYCHEST },
                                // { description: "Bank error in your favor—Collect $200", type: Cardtype.COMMUNITYCHEST },
                                { description: "Doctor's fee—Pay $50", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "From sale of stock you get $50", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Get Out of Jail Free", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Go to Jail–Go directly to jail–Do not pass Go–Do not collect $200", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Grand Opera Night—Collect $50 from every player for opening night seats", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Holiday Fund matures—Receive $100", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Income tax refund–Collect $20", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "It is your birthday—Collect $10", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Life insurance matures–Collect $100", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Pay hospital fees of $100", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Pay school fees of $150", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "Receive $25 consultancy fee", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "You are assessed for street repairs–$40 per house–$115 per hotel", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "You have won second prize in a beauty contest–Collect $10", type: client_1.Cardtype.COMMUNITYCHEST },
                                { description: "You inherit $100", type: client_1.Cardtype.COMMUNITYCHEST },
                            ],
                            skipDuplicates: true
                        })];
                case 6:
                    card = _a.sent();
                    return [4 /*yield*/, prisma.property.createMany({
                            data: [
                                { id: 1, name: 'Mediterranean Avenue', color: client_1.Color.BROWN, price: 60, rent: [2, 4, 10, 30, 90, 160, 250] },
                                { id: 3, name: 'Baltic Avenue', color: client_1.Color.BROWN, price: 60, rent: [4, 8, 20, 60, 180, 320, 450] },
                                { id: 6, name: 'Oriental Avenue', color: client_1.Color.LIGHTBLUE, price: 100, rent: [6, 12, 30, 90, 270, 400, 550] },
                                { id: 8, name: 'Vermont Avenue', color: client_1.Color.LIGHTBLUE, price: 100, rent: [6, 12, 30, 90, 270, 400, 550] },
                                { id: 9, name: 'Connecticut Avenue', color: client_1.Color.LIGHTBLUE, price: 120, rent: [8, 16, 40, 100, 300, 450, 600] },
                                { id: 11, name: 'St. Charles Place', color: client_1.Color.PINK, price: 140, rent: [10, 20, 50, 150, 450, 625, 725] },
                                { id: 13, name: 'States Avenue', color: client_1.Color.PINK, price: 140, rent: [10, 20, 50, 150, 450, 625, 725] },
                                { id: 14, name: 'Virginia Avenue', color: client_1.Color.PINK, price: 160, rent: [12, 24, 60, 180, 600, 700, 900] },
                                { id: 16, name: 'St. James Place', color: client_1.Color.ORANGE, price: 180, rent: [14, 28, 70, 200, 550, 750, 950] },
                                { id: 18, name: 'Tennessee Avenue', color: client_1.Color.ORANGE, price: 180, rent: [14, 28, 70, 200, 550, 750, 950] },
                                { id: 19, name: 'New York Avenue', color: client_1.Color.ORANGE, price: 200, rent: [16, 32, 80, 220, 600, 800, 1000] },
                                { id: 21, name: 'Kentucky Avenue', color: client_1.Color.RED, price: 220, rent: [18, 36, 90, 250, 700, 875, 1050] },
                                { id: 23, name: 'Indiana Avenue', color: client_1.Color.RED, price: 220, rent: [18, 36, 90, 250, 700, 875, 1050] },
                                { id: 24, name: 'Illinois Avenue', color: client_1.Color.RED, price: 240, rent: [20, 40, 100, 300, 750, 900, 1100] },
                                { id: 26, name: 'Atlantic Avenue', color: client_1.Color.YELLOW, price: 260, rent: [22, 44, 110, 330, 800, 975, 1150] },
                                { id: 27, name: 'Ventnor Avenue', color: client_1.Color.YELLOW, price: 260, rent: [22, 44, 110, 330, 800, 975, 1150] },
                                { id: 29, name: 'Marvin Gardens', color: client_1.Color.YELLOW, price: 280, rent: [24, 48, 120, 360, 850, 1025, 1200] },
                                { id: 31, name: 'Pacific Avenue', color: client_1.Color.GREEN, price: 260, rent: [26, 52, 130, 390, 900, 1100, 1275] },
                                { id: 32, name: 'North Carolina Avenue', color: client_1.Color.GREEN, price: 260, rent: [26, 52, 130, 390, 900, 1100, 1275] },
                                { id: 34, name: 'Pennsylvania Gardens', color: client_1.Color.GREEN, price: 280, rent: [28, 56, 150, 450, 1000, 1200, 1400] },
                                { id: 37, name: 'Park Place', color: client_1.Color.BLUE, price: 350, rent: [35, 70, 175, 500, 1100, 1300, 1500] },
                                { id: 39, name: 'Boardwalk', color: client_1.Color.BLUE, price: 400, rent: [50, 100, 200, 600, 1400, 1700, 2000] },
                            ],
                            skipDuplicates: true
                        })];
                case 7:
                    property = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.init = init;
init(new client_1.PrismaClient);
