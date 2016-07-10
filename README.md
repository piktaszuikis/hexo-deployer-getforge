# hexo-deployer-getforge

GetForge deployer plugin for [Hexo].

## Installation

``` bash
$ npm install hexo-deployer-getforge --save
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
# You can use this:
deploy:
  type: getforge
  username: <your username>
  password: <your password>
  domain: <your website domain>
```

- **username**: GetForge username (email)
- **password**: GetForge password in plain text
- **domain**: Your site domain (i.e. my-blog.getforge.io)

## How it works

It creates a temporary zip file and on successful upload deletes it.

## License

WTFPL

[Hexo]: http://hexo.io/
