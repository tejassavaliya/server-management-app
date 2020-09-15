![CI-Workflow](https://github.com/tejassavaliya/server-management-app/workflows/CI-Workflow/badge.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/77a0bb8e-9bca-4277-a42b-fbde7f41a7fd/deploy-status)](https://app.netlify.com/sites/ngrx-server-management/deploys)

# Demo Link
https://ngrx-server-management.netlify.app/

# ServerManagement - Angular Ngrx Crud Example

This project displays a simple list of servers that can be viewed, created, updated and deleted using http services ( using HttpClient) and @ngRx/store and @ngRx/effects state management libraries grouping information by modules. This ngRx is a Redux inspired library created for Angular to manage the state changes.

#Getting Started
To start using the application follow the next steps:

## Get the Code
```
git clone https://github.com/tejassavaliya/server-management-app.git
cd server-management-app
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Functionalities

## How to EDIT a server using Ngrx/store & Effects:
1. To edit a server, the system **dispatch** an event with the action **"UPDATE_SERVER"**.
2. The **reducer** related to the module **servers** is executed and the state is changed updating the information of specific server.
3. An **“ngRx effect”** class is implemented (ServerEffects) by module and will be triggered when we dispatch actions with the store.
4. Using some selectors defined in my **reducer** class, we can monitor the success of each action and exceute some specific code after that (like display a success message and/or come back to the home page).


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests with code coverage

Run `ng test --watch --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io).

## To see code coverage After running above test command 
```
cd coverage/server-management
open index.html file into the browser
```

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
