#!/usr/bin/env node

require("dotenv").config();
const Airtable = require('airtable');
const chalk = require('chalk');
const dayjs = require('dayjs');
const readline = require('readline');

const postsBase = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
          .base(process.env.AIRTABLE_POSTS_BASE_ID)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function interactPrompt(question) {
  return new Promise((resolve, error) => {
    rl.question(question, answer => {
      resolve(answer)
    });
  })
}

function toSentenceCase(str) {
  return str.toLowerCase().replace(/[a-z]/i, (letter) => {
    return letter.toUpperCase();
  }).trim();
}

function lookupAuthor(name) {
  const nameQuery = name
            .split(/\s/)
            .map(toSentenceCase)
            .join(' ');
  
  return new Promise((resolve, reject) => {
    postsBase('People').select({
      maxRecords: 3,
      fields: ['id', 'name', 'number of posts'],
      sort: [{field: 'number of posts', direction: 'desc'}],
      filterByFormula: `FIND('${nameQuery}', {name})`
    }).firstPage(function(err, records) {
      if (err) {
        reject(err);
      }

      if (records.length == 0) {
        errorMsg = chalk.red(
          `No matching person records found. 
          You will need to update Airtable via the web.`
        );
        console.log(errorMsg);
        process.exit();
      }

      let likeliestHit = records[0];
      postsBase('People').find(likeliestHit.id, function(err, persRecord) {
        if (err) { console.error(err); return; }
        resolve({
          displayName: persRecord.get('name'),
          authorId: likeliestHit.id
        });
      });

    });
  });
}

function createPostEntry(params) {
  let postAuthor = params.author
  let postTitle = toSentenceCase(params.title)
  let postSlug = postTitle.replace(/\W+/g, ' ').replace(/\s/g, '-').toLowerCase();

  return new Promise((resolve, error) => {
    postsBase('Posts').create({
      "slug": postSlug,
      "post title": postTitle,
      "post date": dayjs().format(),
      "author": [postAuthor],
      // At least one category is required; make this smarter
      "categories": ["Uncategorized"]
    }, function(err, record) {
      if (err) { console.error(err); return; }
      console.log(`${chalk.greenBright('Success!')} Entry ${record.getId()} created`)
      /* TODO: Actually create the page stub? */ 
      console.log(
        `${chalk.yellowBright("Don't forget to create:")} /src/news/${postSlug}.md`
      );
    })
  })
}

async function askQuestions() {
  var name = await interactPrompt('What is your name?\n');
  let author = await lookupAuthor(name);
  var rawTitle = await interactPrompt('Give your post a title. (You can change it later.)\n')
  let title = toSentenceCase(rawTitle);

  const postData = {
    author: author.authorId,
    title: rawTitle
  }

  console.log(`
  ${chalk.blueBright("Based on your responses, we'll create the following post entry:")}

  ${chalk.yellow("Title:")} ${title}
  ${chalk.yellow("Author:")} ${author.displayName}
  `);
  
  rl.question('Does this look correct? [Y]/n: ', answer => {
    if (answer.toLowerCase() === 'n' ) {
      errorMsg = chalk.red("That's not good. Ending program")
      console.error(errorMsg);
      process.exit();
    }
    createPostEntry(postData);
    rl.close();
  });
}

askQuestions();
