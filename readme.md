![CI](https://github.com/StefanKoenen/ToastrNative/workflows/CI/badge.svg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/e935f4ebc172ab4af432/maintainability)](https://codeclimate.com/github/StefanKoenen/ToastrNative/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e935f4ebc172ab4af432/test_coverage)](https://codeclimate.com/github/StefanKoenen/ToastrNative/test_coverage)
[![CodeFactor](https://www.codefactor.io/repository/github/stefankoenen/toastrnative/badge)](https://www.codefactor.io/repository/github/stefankoenen/toastrnative)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/StefanKoenen/ToastrNative.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/StefanKoenen/ToastrNative/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/StefanKoenen/ToastrNative.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/StefanKoenen/ToastrNative/context:javascript)
[![Known Vulnerabilities](https://snyk.io/test/github/StefanKoenen/ToastrNative/badge.svg?targetFile=package.json)](https://snyk.io/test/github/StefanKoenen/ToastrNative?targetFile=package.json)

# toastr2

**toastr2** is a Javascript library for non-blocking notifications, in this version **jQuery is no longer required**.

## Install

#### [NuGet Gallery](http://nuget.org/packages/toastr)

```
Install-Package toastr
```

#### [Bower](http://bower.io/search/?q=toastr)

```
bower install toastr
```

#### [npm](https://www.npmjs.com/package/toastr)

```
npm install --save toastr
```

#### [yarn](https://yarnpkg.com/en/package/toastr)

```
yarn add toastr
```

## Building Toastr

To build the minified and css versions of Toastr you will need [node](http://nodejs.org) installed.

```
npm install -g gulp karma-cli
npm install
```

At this point the dependencies have been installed and you can build Toastr

-   Run the analytics `gulp analyze`
-   Run the test `gulp test`
-   Run the build `gulp`

## Contributing

For a pull request to be considered it must resolve a bug, or add a feature which is beneficial to a large audience.

Pull requests must pass existing unit tests, CI processes, and add additional tests to indicate successful operation of a new feature, or the resolution of an identified bug.

Requests must be made against the `develop` branch. Pull requests submitted against the `master` branch will not be considered.

All pull requests are subject to approval by the repository owners, who have sole discretion over acceptance or denial.

## Authors

**Stefan Koenen**

## Credits

Inspired by https://github.com/Srirangan/notifer.js/.

Special thanks to the jQuery version https://github.com/CodeSeven/toastr.

## Copyright

Copyright © 2020-2021

## License

toastr is under MIT license - http://www.opensource.org/licenses/mit-license.php
