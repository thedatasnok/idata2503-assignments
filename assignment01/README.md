# Assignment 1: Expense tracker app

## Use cases

![Use cases](docs/use-cases.drawio.svg)

## Architecture

![Architecture](docs/architecture.drawio.svg)

## Project structure

This project utilizes Expo Router, which is a file-based router. The routes are defined as files in the [`src/app`](src/app) directory.
Any shared functionality or abstracted components are moved into the `src/components` directory and other directories outside the `app` directory.

Due to the add screen and the view screen being separate routes needing to interact with a shared piece of state, I use [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction).

## Additional features

- Persistent storage of expenses
- Period views (this week, this month, this year, total)
