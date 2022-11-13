# API-NODE-XPRESS

REST API to cordinate vaccination registries.

## SETUP

Create an .env based in .env.example file and set environment variables.

## INSTALL

```bash
npm install
```

## RUN IN DEV

```bash
npm run dev
```

## BUILD

```bash
npm run build
```

## USAGE

### POSTMAN

Use the postman collection saved in postman folder, in the main root.

- Create a user in 'Auth' folder
- Login (to get the Auth Token)
- Set Token to 'Drugs' & 'Vaccinations' folders
- Set the params to each request to test

### TEST (JEST)

```bash
npm run test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
