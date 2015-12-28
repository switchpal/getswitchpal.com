# SwitchPal Website

To start development:

    $ npm install -g bower gulp
    $ bower install && npm install
    $ gem install jekyll

During development:

    $ gulp sass # generate css
    $ jekyll serve # automatically generate html files

To build to `dist` folder (prepare deployment):

    $ gulp build

To deploy to GitHub Pages:

    $ gulp deploy

## Reference

- Based on the [StartBootstrap Creative Theme](https://github.com/IronSummitMedia/startbootstrap-creative)
