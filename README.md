# GroceryList 
User can add, edit, delete items on different Lists.
User will be able to add, edit, delete tasks and responsibilites.

## Pre-Requisites
- node.js
- npm

## Installation
After cloning the git repository, from the root run:
```bash
npm install
```
After node_modules finishes installing, cd into client and run it again:
```bash
cd client
npm install
```

### Server
To run the server, move one level up from the client to the root directory.
```bash
cd ..
npx ts-node server/server.ts
```

### Client 
To run the client, cd back into the client directory.
```bash
cd client
ng serve
```
