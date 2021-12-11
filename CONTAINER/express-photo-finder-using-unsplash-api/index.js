const express = require('express');
const app = express();
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const { getRandomWord } = require('./utils.js');
const PORT = process.env.PORT || 3000;
const ACCESSKEY = process.env.ACCESSKEY;
const BASEURL = process.env.BASEURL;
const PERPAGE = 30;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use((req, res, next) =>  {
  res.locals.uri = req.originalUrl;
  next();
})

app.post('/search', (req, res) => {
  const { searchquery } = req.body;
  const page = 1;
  try {
    fetchImages(searchquery, page).then(output => {
      res.render('pages/search', { 
        output, 
        uri:res.locals.uri 
      })
    });
  } catch(err) {
    next(err);
  }
});

app.get('/search', (req, res) => {
  const { query, page, totalpages } = req.query;
  let p = 0;
  if (totalpages) {
    p = Number(page) > 0 ? Number(page) : 1;
    if (p > Number(totalpages)) p = Number(totalpages);
  }
  fetchImages(query, p).then(output => {
    res.render('pages/search', {
      output, 
      uri:res.locals.uri
    });
  });
});

app.get('/', (req, res) => {
  const searchquery = getRandomWord();
  const page = 1;
  try {
    fetchImages(searchquery, page).then(output => {
      res.render('pages/search', { 
        output, 
        uri:res.locals.uri 
      })
    });
  } catch(err) {
    next(err);
  }
});

app.get('/new-search', (req, res) => {
  res.render('pages/index', { uri:res.locals.uri });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { uri:res.locals.uri });
});

app.get('/favourites', (req, res) => {
  const { page, query } = req.query;
  res.render('pages/favourites', { 
    page, 
    query, 
    uri:res.locals.uri
  });
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

function fetchImages(query, page) {
  const url = `${BASEURL}?page=${page}&query=${query}&per_page=${PERPAGE}&client_id=${ACCESSKEY}`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(handleErrors)
    .then(data => {
      const { results, total, total_pages } = data;
      const output = {
        query,
        page,
        total,
        total_pages,
        results
      };
      resolve(output);
    })
    .catch(err => {
      console.log(err);
    });
  });
}

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

/*////////////////*/
/* Error handling */
/*////////////////*/

// page not found (404)
app.get('/not-found', (req, res) => {
  res.status(404);
  res.render('pages/not-found');
});

// wildcard route throws 302 error (temporary redirect)
app.get('*', (req, res, next) => {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 302;
  next(error);
});

// middleware for handing errors
app.use((error, req, res, next) => {
  // if status code not defined set to generic HTTP status code (500)
  if (!error.statusCode) error.statusCode = 500;
  // redirect if route is not found
  if (error.statusCode === 302) {
    return res.status(302).redirect('/not-found');
  }
  // render error page
  res.status(error.statusCode);
  res.render('pages/error', { error:error.toString() })
});
