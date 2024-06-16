# Running the site

## Running the Backend
```bash
$ cd BlueTriangleGame
$ cd server
$ npm install

```
## .env file configuration
```bash
$ DATABASE_URL=""      //Postgresdatabaseurl
$ JWT_SECRET=""         //Your Secret Key
```

## Prisma setup  
```bash
$ npm i prisma @prisma client
$ npx prisma migrate dev
        or
$ prisma migrate dev
$ npx prisma generate

```

## Change the localhost port or it will automatically run on 4000 port 

## To start the backend
```bash
$ npm start
```
## Your backend will successfully start on localhost 4000;




## Running the frontend
```bash
cd BlueTriangleGame
cd frontend
npm install

```

## After this go to components folder and find Game.jsx and Leaderboard.jsx 
## Inside this find const socket = io("")  line
```bash
const socket = io('http://localhost:4000')         //url should be your localhost url where your server is running 
```

## Some ScreenShots of the Game


![Screenshot 2024-06-17 043311](https://github.com/captaincoro11/BlueTriangleGame/assets/121259483/4b1f1a64-dd44-458e-a933-acc83026b66f)


![Screenshot 2024-06-17 043257](https://github.com/captaincoro11/BlueTriangleGame/assets/121259483/6482d7db-3335-4e28-9acf-3b0cc91b573e)


![Screenshot 2024-06-17 043125](https://github.com/captaincoro11/BlueTriangleGame/assets/121259483/0da9f167-0ae4-405f-9787-504869a33c46)


![Screenshot 2024-06-17 043244](https://github.com/captaincoro11/BlueTriangleGame/assets/121259483/e0adfe97-ac0c-4feb-8f13-57aacc1746d0)









