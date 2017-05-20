Install NodeJs for your platform https://nodejs.org/en/download/package-manager/
then

```bash
$ sudo npm install -g ionic cordova && npm install
```
for IOS build

```bash
$ ionic cordova platform add ios
$ ionic cordova build ios
```
for Android build
```bash
$ ionic cordova platform add android
$ ionic cordova build ios
```

Substitute ios for android if not on a Mac.
1. for runnning on IOS read 'iOS Devices' on https://ionicframework.com/docs/intro/deploying/
you must have Xcode, and developer certificate
2. for running on Android install  apk from platforms/android/build/outputs/apk

