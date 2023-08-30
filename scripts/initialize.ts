import 'dotenv/config'
import { db } from "../server/util/db"
import { card, drawable, houses, property, special } from "../server/util/schema"

db.transaction(async tx => {
  await tx.insert(houses)
    .values([
      { color: 'BROWN', price: 50 },
      { color: 'LIGHTBLUE', price: 50 },
      { color: 'PINK', price: 100 },
      { color: 'ORANGE', price: 100 },
      { color: 'RED', price: 150 },
      { color: 'YELLOW', price: 150 },
      { color: 'GREEN', price: 200 },
      { color: 'BLUE', price: 200 },
    ])
  await tx.insert(drawable)
    .values([
      { id: 2, type: 'COMMUNITYCHEST' },
      { id: 7, type: 'CHANCE' },
      { id: 17, type: 'COMMUNITYCHEST' },
      { id: 22, type: 'CHANCE' },
      { id: 33, type: 'COMMUNITYCHEST' },
      { id: 36, type: 'CHANCE' },
    ])

  await tx.insert(special)
    .values([
      { id: 0, name: 'Go', description: 'Collect 200 Salary as You Pass' },
      { id: 4, name: 'Income Tax', description: 'Pay 200' },
      { id: 10, name: 'Jail', description: 'In Jail/Just Visiting' },
      { id: 20, name: 'Free Parking', description: 'Free Parking' },
      { id: 30, name: 'Go to Jail', description: 'Go to Jail' },
      { id: 38, name: 'Luxury Tax', description: 'Pay 100' },
    ])

  await tx.insert(card)
    .values([
      { description: "Advance to Go (Collect $200)", type: 'CHANCE' },
      { description: "Advance to Illinois Ave—If you pass Go, collect $200", type: 'CHANCE' },
      { description: "Advance to St. Charles Place – If you pass Go, collect $200", type: 'CHANCE' },
      { description: "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.", type: 'CHANCE' },
      { description: "Advance token to the nearest Railroad and pay owner twice the rental to which he/she {he} is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.", type: 'CHANCE' },
      { description: "Bank pays you dividend of $50", type: 'CHANCE' },
      { description: "Get Out of Jail Free", type: 'CHANCE' },
      { description: "Go Back 3 Spaces", type: 'CHANCE' },
      { description: "Go to Jail–Go directly to Jail–Do not pass Go, do not collect $200", type: 'CHANCE' },
      { description: "Make general repairs on all your property–For each house pay $25–For each hotel $100", type: 'CHANCE' },
      { description: "Pay poor tax of $15", type: 'CHANCE' },
      { description: "Take a trip to Reading Railroad–If you pass Go, collect $200", type: 'CHANCE' },
      { description: "Take a walk on the Boardwalk–Advance token to Boardwalk", type: 'CHANCE' },
      { description: "You have been elected Chairman of the Board–Pay each player $50", type: 'CHANCE' },
      { description: "Your building and loan matures—Collect $150", type: 'CHANCE' },
      { description: "You have won a crossword competition—Collect $100", type: 'CHANCE' },
      // INFO: Community Chest
      { description: "Advance to Go (Collect $200)", type: 'COMMUNITYCHEST' },
      { description: "Doctor's fee—Pay $50", type: 'COMMUNITYCHEST' },
      { description: "From sale of stock you get $50", type: 'COMMUNITYCHEST' },
      { description: "Get Out of Jail Free", type: 'COMMUNITYCHEST' },
      { description: "Go to Jail–Go directly to jail–Do not pass Go–Do not collect $200", type: 'COMMUNITYCHEST' },
      { description: "Grand Opera Night—Collect $50 from every player for opening night seats", type: 'COMMUNITYCHEST' },
      { description: "Holiday Fund matures—Receive $100", type: 'COMMUNITYCHEST' },
      { description: "Income tax refund–Collect $20", type: 'COMMUNITYCHEST' },
      { description: "It is your birthday—Collect $10", type: 'COMMUNITYCHEST' },
      { description: "Life insurance matures–Collect $100", type: 'COMMUNITYCHEST' },
      { description: "Pay hospital fees of $100", type: 'COMMUNITYCHEST' },
      { description: "Pay school fees of $150", type: 'COMMUNITYCHEST' },
      { description: "Receive $25 consultancy fee", type: 'COMMUNITYCHEST' },
      { description: "You are assessed for street repairs–$40 per house–$115 per hotel", type: 'COMMUNITYCHEST' },
      { description: "You have won second prize in a beauty contest–Collect $10", type: 'COMMUNITYCHEST' },
      { description: "You inherit $100", type: 'COMMUNITYCHEST' },
    ])

  await tx.insert(property)
    .values([
      { id: 1, name: 'Mediterranean Avenue', color: 'BROWN', price: 60, rent: [2, 4, 10, 30, 90, 160, 250] },
      { id: 3, name: 'Baltic Avenue', color: 'BROWN', price: 60, rent: [4, 8, 20, 60, 180, 320, 450] },

      { id: 6, name: 'Oriental Avenue', color: 'LIGHTBLUE', price: 100, rent: [6, 12, 30, 90, 270, 400, 550] },
      { id: 8, name: 'Vermont Avenue', color: 'LIGHTBLUE', price: 100, rent: [6, 12, 30, 90, 270, 400, 550] },
      { id: 9, name: 'Connecticut Avenue', color: 'LIGHTBLUE', price: 120, rent: [8, 16, 40, 100, 300, 450, 600] },

      { id: 11, name: 'St. Charles Place', color: 'PINK', price: 140, rent: [10, 20, 50, 150, 450, 625, 725] },
      { id: 13, name: 'States Avenue', color: 'PINK', price: 140, rent: [10, 20, 50, 150, 450, 625, 725] },
      { id: 14, name: 'Virginia Avenue', color: 'PINK', price: 160, rent: [12, 24, 60, 180, 600, 700, 900] },

      { id: 16, name: 'St. James Place', color: 'ORANGE', price: 180, rent: [14, 28, 70, 200, 550, 750, 950] },
      { id: 18, name: 'Tennessee Avenue', color: 'ORANGE', price: 180, rent: [14, 28, 70, 200, 550, 750, 950] },
      { id: 19, name: 'New York Avenue', color: 'ORANGE', price: 200, rent: [16, 32, 80, 220, 600, 800, 1000] },

      { id: 21, name: 'Kentucky Avenue', color: 'RED', price: 220, rent: [18, 36, 90, 250, 700, 875, 1050] },
      { id: 23, name: 'Indiana Avenue', color: 'RED', price: 220, rent: [18, 36, 90, 250, 700, 875, 1050] },
      { id: 24, name: 'Illinois Avenue', color: 'RED', price: 240, rent: [20, 40, 100, 300, 750, 900, 1100] },

      { id: 26, name: 'Atlantic Avenue', color: 'YELLOW', price: 260, rent: [22, 44, 110, 330, 800, 975, 1150] },
      { id: 27, name: 'Ventnor Avenue', color: 'YELLOW', price: 260, rent: [22, 44, 110, 330, 800, 975, 1150] },
      { id: 29, name: 'Marvin Gardens', color: 'YELLOW', price: 280, rent: [24, 48, 120, 360, 850, 1025, 1200] },

      { id: 31, name: 'Pacific Avenue', color: 'GREEN', price: 260, rent: [26, 52, 130, 390, 900, 1100, 1275] },
      { id: 32, name: 'North Carolina Avenue', color: 'GREEN', price: 260, rent: [26, 52, 130, 390, 900, 1100, 1275] },
      { id: 34, name: 'Pennsylvania Gardens', color: 'GREEN', price: 280, rent: [28, 56, 150, 450, 1000, 1200, 1400] },

      { id: 37, name: 'Park Place', color: 'BLUE', price: 350, rent: [35, 70, 175, 500, 1100, 1300, 1500] },
      { id: 39, name: 'Boardwalk', color: 'BLUE', price: 400, rent: [50, 100, 200, 600, 1400, 1700, 2000] },

      { id: 5, name: 'Reading Railroad', price: 200, rent: [25, 50, 100, 200], color: 'NONE' },
      { id: 15, name: 'Pennsylvania Railroad', price: 200, rent: [25, 50, 100, 200], color: 'NONE' },
      { id: 25, name: 'B&O Railroad', price: 200, rent: [25, 50, 100, 200], color: 'NONE' },
      { id: 35, name: 'Short Line', price: 200, rent: [25, 50, 100, 200], color: 'NONE' },

      { id: 12, name: 'Electric Company', price: 150, rent: [4, 10], color: 'NONE' },
      { id: 28, name: 'Water Works', price: 150, rent: [4, 10], color: 'NONE' },
    ])
})
  .then(() => console.log('Populated Values Successfully'))
  .catch(e => console.log(e))
  // .catch(() => console.log('Failed to Populate Values'))

