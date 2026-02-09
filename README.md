# EFY Apps

The website + a collection of static apps built with [efy](https://github.com/dragos-efy/efy).

Try the [live demos](https://efy.ooo) for testing, but if you want to personally use the apps regularly, download them to your device or set up your own instance, to not consume server resources here and benefit from them working offline as well. You don't need a server or nodejs, just a browser and to open the html files, but it works either way.

## Use Apps Locally
1. run these in a terminal:
```
git clone https://github.com/dragos-efy/efy-apps
cd efy-apps
git submodule update --init --remote efy
```
2. open `index.html`

## Testing

1. Install `jasmine-core`.
2. Run `npx jasmine-browser-runner serve --esm`.
3. Open http://localhost:8888 in your web browser.

Documentation is coming soon...
