/* global hexo */
'use strict';

hexo.extend.deployer.register('getforge', require('./lib/deployer'));
