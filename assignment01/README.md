# Assignment 1: Expense tracker app

## Use cases

![Use cases](docs/use-cases.drawio.svg)

## Class diagram & layout/component hierarchy diagram

![diagram](docs/diagram.drawio.svg)

## Project structure

This project utilizes Expo Router, which is a file-based router. The routes are defined as files in the [`src/app`](src/app) directory.

The app consists of two screens:

- [Home/overview screen (start)](src/app/index.tsx)
- [Add expense screen](src/app/add.tsx)

These two screens are rendered within the Stack as defined in the [layout file](src/app/_layout.tsx).

Any shared functionality or abstracted components are moved into the `src/components` directory and other directories outside the `app` directory.

Due to the add screen and the view screen being separate routes needing to interact with a shared piece of state, I use [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) as opposed to React Context.

## Additional features

- Persistent storage of expenses (zustand middleware using AsyncStorage)
- Period views (this week, this month, this year, total)
