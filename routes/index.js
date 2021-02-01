var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contentIndex', {
    head: {
      title: 'Bla', styles: [
        { rel: 'stylesheet', href: '/stylesheets/style.css', type:'text/css'},
        { rel: 'icon', href: '/images/icon.png', type:'image/png'}
      ], metas: [
        [['charset', 'UTF-8']],
        [['name', 'description'], ['content', 'Json to Website']],
        [['name', 'viewport'], ['content', 'width=device-width, initial-scale=1.0']]
      ]
    },
    content: [
      {
        type: 'parts', name: 'header', data: {
          title: { title: 'Bla', subtitle: 'Blo' },
          menu: [{ href: '#', text: 'Blo', class: 'active', dropdown: [{ href: '#', text: 'Blo', class: 'active' }, { href: '#', text: 'Blo', class: 'active' }] }]
        }
      }
    ]
  });
});

module.exports = router;
