# Appost!

App created to manage your posts!

## Description

Appost allows you to register an account and manage your posts easily from any device. 
Registration is completely free without any third-party services.

BASED ON: Go REST: https://gorest.co.in/

## Built With

* [![React][React.js]][React-url]
* [![Redux][Redux.js]][Redux-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Ionic][Ionic]][Ionic-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Vite][Vite]][Vite-url]

## Dependencies

* NodeJS >= 20.9.0
* NO GIT dependency, this project has no versioning
* A free account registered on https://gorest.co.in/

## Getting Started

### Register account on Go REST

1) Visit the site https://gorest.co.in and register your free account
2) On the header, click your profile and select "API Tokens"
3) Copy the Access Token you want to use for next steps, or create a new one with your custom parameters

### Environment configuration

Application needs some Environment configuration

1) Create a .env file in your root folder, or if you want you can create additional .env.[mode] files
for every environment (More info: https://vite.dev/guide/env-and-mode)

2) Insert into the newly created files these variables
```
APP_GOREST_ACCESS_TOKEN={GOREST_ACCESS_TOKEN_COPIED_IN_PREVIOUS_STEPS}
APP_GOREST_BASE_URL=https://gorest.co.in
APP_GOREST_BASE_PATH=/public/v2
APP_STORAGE={session | local}
```

### Executing program

1) Install all dependencies
```
npm install
```

#### For develop experience

2) Run the project on develop mode (default port is 4000, but you can change it package.json -> scripts -> dev)
```
npm run dev 
```

3) Visit application on your Browser 
```
http://localhost:4000
```
#### For production like experience

2) Run the project on production mode (default port is 5000, but you can change it package.json -> scripts -> preview)
```
npm run build
npm run preview
```

3) Visit application on your Browser 
```
http://localhost:5000
```

### Final steps

* Register or login your free user and enjoy creating your own posts!

## Authors

Contributors names

* Daniele Serra
* [![Linkedin][Linkedin]][Linkedin-profile-url]

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Ionic]: https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white
[Ionic-url]: https://ionicframework.com
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org
[Vite]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vite.dev
[Linkedin]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[Linkedin-profile-url]: https://www.linkedin.com/in/daniele-serra-b1a033172