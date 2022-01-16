# Trading Ally

## Project Status
This project is currently in development. Users can manually log a trade through the LogTrade component. A collection of all logged trades appears under the Trade History section, allowing users to sort trades by column, edit trades, and delete trades. Functionality for multi-selection to delete multiple trades is currently in progress. Functionality to view more specific user performance through a stat component is also in progress.

Live example: [https://tradingally.netlify.app](https://tradingally.netlify.app/)

## Set up & Installation

In order to run this app, you'll have to clone down this repo using npm.  You will need node and npm installed globally on your machine. You will also need the netlify cli to be able to start the server with “netlify dev”. If you don't already have the netlify cli, install it with: 
```
npm install netlify-cli -g
```
Clone down this repo using your preferred method (HTTPS or SSH)

#### Fauna DB
> This project uses Fauna DB as its cloud database, and integrates the FQL API for querying data.

You will need to have a Fauna account in order to create a database. A general set up is below. (For a further in-depth guide on setting up your dashboard, follow their [quick-start here](https://docs.fauna.com/fauna/current/learn/quick_start/quick_start)).

- Sign up for a free account
- Create a database (i.e. test_db)
	- Select your region and don’t use the demo data
- Create a collection named trades
	- `{ name: "trades", history_days: null, ttl_days: null }`
- Create an Index named trades_all
	- `{ name: "trades_all", unique: false, serialized: true, source: "trades" }`
- Create another index called trades_by_id
	- Under the Terms field, type data.id
	- `{ name: "trades_by_id", unique: false, serialized: true, source: "trades", terms: [ { field: ["data", "id"] } ] }`
- Back in your machine, go to the directory where you cloned this repo and create a `.env` file at the root of the directory
- Back in the Fauna DB dashboard create an admin key
	- Click 'Security' on the left-hand nav and create a new key for your db. **The key’s secret is only displayed once so don't lose it**
	- Go back to the `.env` file and paste the following:
		- `EXTEND_ESLINT=TRUE`
		- `FAUNADB_KEY={your-fauna-admin-key-here}`
- Open the config.ts file ( `./functions/config.ts` ) and check the domain variable.
	-   If you created your database in US region, replace domain value to be  `db.us.fauna.com`
	-   For other regions, check out the [region groups doc here](https://docs.fauna.com/fauna/current/learn/understanding/region_groups).

You’re ready to run this project now!
cd into the project directory, and install the dependencies.

Installation
`npm install`

Start server
`netlify dev`

Vist app:
`localhost:8888`

## Reflection / Info

Trading Ally is a trade logging web app I started to help expand my skillset in developing React applications. More specifically I wanted to further improve in the following areas:

-   Create reusable functional components
-   Separate concerns and decouple logic with utilities and helpers
-   Use context providers to help with data and state flow
-   Integrate Typescript for reliability and maintenance

I chose to apply this project towards trading because it’s a field I'm interested in and would ultimately like to create a simple tool that helps traders manage their positions.

As it stands, this project is a simple C.R.U.D application talking to an external Fauna database. However, I’m looking forward to adding features that will help track specific performance metrics and allow users to create and customize trading plans.

MIT license [@edwindanlopez](https://github.com/edwindanlopez)

## Diagrams & screenshots
![trading-ally-diagram-1](https://res.cloudinary.com/bldrscove/image/upload/v1642362720/Readmes/Trading-Ally/trading-ally-diagram-1_jtc908.png)

![trading-ally-diagram-2](https://res.cloudinary.com/bldrscove/image/upload/v1642362720/Readmes/Trading-Ally/trading-ally-diagram-2_wuwe8l.png)

![trading-ally-screenshot-1](https://res.cloudinary.com/bldrscove/image/upload/v1642362719/Readmes/Trading-Ally/trading-ally-screenshot-1_yvyeym.png)

![trading-ally-screenshot-2](https://res.cloudinary.com/bldrscove/image/upload/v1642362720/Readmes/Trading-Ally/trading-ally-screenshot-2_kqpujy.png)

![trading-ally-screenshot-3](https://res.cloudinary.com/bldrscove/image/upload/v1642362720/Readmes/Trading-Ally/trading-ally-screenshot-3_isfd5l.png)