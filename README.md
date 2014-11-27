ngDonut
=======

![Travis](http://img.shields.io/travis/Wildhoney/ngDonut.svg?style=flat)
&nbsp;
![npm](http://img.shields.io/npm/v/ng-donut.svg?style=flat)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat)
&nbsp;
![Experimental](http://img.shields.io/badge/%20!%20%20-experimental-blue.svg?style=flat)

* **Heroku**: [http://ng-donut.herokuapp.com/](http://ng-donut.herokuapp.com/)
* **Bower:** `bower install ng-donut`

`ngDonut` is a tiny Angular and D3 component which renders a donut graph &ndash; which is capable of animation when the values change!

<img width="300" height="300" src="https://dl-web.dropbox.com/get/Screenshots/Screenshot%202014-11-27%2022.43.42.png?_subject_uid=210261&w=AABxgjP0-8Sa1atGtXonqlkagjbf82XYxdyGnmQxfSDq5A" />

---

# Getting Started

All that you need to do to begin is add the `donut` node to the DOM and attach your dataset using the `ng-model` attribute:

```html
<donut ng-model="myDataset"></donut>
```

`myDataset` should be defined as an array of values:

```javascript
$scope.myDataset = [100, 200, 300, 400, 500];
```

`ngDonut` currently supports the following attributes: `width`, `height`, `radius`, `colours`.

## Colours

You should define your `colours` attribute as an array of possible colours &ndash; otherwise `ngDonut` will utilise D3's [ordinal colours](https://github.com/mbostock/d3/wiki/Ordinal-Scales).