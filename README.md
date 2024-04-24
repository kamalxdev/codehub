

### Build

To build all apps and packages, run the following command:

Go to the root folder
```
cd codehub
```

Install all the packages
```
npm i
```

Copy .env.example to .env(run tis command both in frontend and backend)
```
cp .env.example .env
```

Go the the backend folder and generate prisma client
```
cd backend
npx prisma generate
```
