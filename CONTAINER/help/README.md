# help

![Logo of the project](./frontend/public/images/help.png)

Get some help or help out today... follow this link to join help:

https://helpp.herokuapp.com/

> Welcome to help

help was created during the 2020 pandemic as a way to connect people who need help(helpees) with those who can help them out (helpers).  The app was designed especially for older people who may be limited in where they can go during the pandemic because of the risk of catching Covid-19.
Helpers can connect with local helpees in the area by searching their area or waiting for the page to dynamically load and display below on the homepage.  Each user can access the tasks they need to complete as helpers or can add a task to a list for helpees.  Tasks range from doing house chores to picking up groceries.

Users are designated as a helper or helpee and can use the google api services included to find and connect with them.

As a logged-in user, you will have access to:

* Tasks List (can be completed and assigned a helperId all with UI)
* SearchBar (can search for people or locations with both search bars)
* Giving Testimony (to be implemented in future upgrades)
* Giving helping hands (ratings for helpers or helpees)

(DISCLAIMER: This site is an App Academy project that is a light "clone" of the yelp.)

## Features

### Home Page

The Home Page will render a simple searchbar similar to yelp with a few links for accessibility navigating the site:

![Screen Shot of Home Page](./frontend/public/images/screen_shot_1.png)

The Home Page also offers access to local users in the area which renders helpees within a 20 mile radius by using a geolocation service on the frontend to compare to the database which uses a node package to translate addresses to lattitude and longitude.  Everything then goes through a sorting algorhythm to render the nearest helper first, up to six helpers.

![Screen Shot of Home Page Helpees](./frontend/public/images/screen_shot_2.png)

The Helpers are also rendered below this using the same sorting methods and routes on the backend.

![Screen Shot of Home Page Helpers](./frontend/public/images/screen_shot_3.png)

### Searchbar

The searchbar was an interesting challenge as I tried to implement the best sorting algorhythm while also using a complex sequelize query that added users depending on location and/or a general search:

* Use possible multiple parameters to search location and general search(similar to yelp)

    To implement this, I used a react/redux store on the frontend which checked on the backend for a particular search.
    
    ```js
  export const localsFindLocation = (keyword) => async (dispatch) => {
    const { keywordSearch, locationSearch } = keyword;
    const res = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        keywordSearch,
        locationSearch
      }),
    })
    dispatch(findLocalsSearch(res.data.locals));
    return
  }
    ```

* On the backend use the search options to query the database using a complex sequelize query.  This was complicated at times as the sequelize syntax is a bit convoluted at points.

    ```js
    const { keywordSearch, locationSearch } = req.body;

    let locals;

    if (locationSearch) {
      let { lat, lng } = await geocodeAddress(locationSearch)
      lat = parseFloat(lat, 10)
      lng = parseFloat(lng, 10)
      locals = await User.findAll({
        where: {
          lat: {
            [Op.between]: [(lat - .5), (lat + .5)]
          },
          lng: {
            [Op.between]: [(lng - .5), (lng + .5)]
          },
          [Op.or]: [{
            username: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }, {
            firstName: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }, {
            lastName: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }]
        },
      })
    } else {
      locals = await User.findAll({
        where: {
          [Op.or]: [{username: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}, {firstName: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}, {lastName: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}]
        }
      })
    }

    if (locals.length === 0) {
      let err = 'No results found'
      return res.json({
        err,
      });
    }

    return res.json({
      locals,
      apiKey: process.env.GOOGLE_API,
    });
    
    ```

### Tasks

The tasks list renders a list of complete and incomplete tasks for the user to see their own and others:

![Screen Shot of Tasks](./frontend/public/images/screen_shot_5.png)

* Create a completed and incomplete task list
* If task needs to be completed for helper it has a checkmark and moves to completed list once checked
* If task needs to be completed for a helpee it includes a clickable image of the helping hands to add to your list.

The greatest challenge of this project was using many conditionals and nested conditionals to render the correct information depending on a helper or helpee

```js
let complete;
  let incomplete;
  if (isLoaded) {
    complete = Object.values(currentTasks).map((task, idx) => {
        if (task.completed) {
          return(
            <div className='task-container__list__completed' key={idx}>
              <i className="far fa-check-square completed-icon"></i>
              <p>{task.category} - {task.details}</p><br />
            </div>
          )
        }
      })
      incomplete = Object.values(currentTasks).map((task, idx) => {
        if (id === urlId && !currentHelpType && !task.completed) {
          return (
            <div className='task-container__list__incomplete' key={idx}>
              <div className="tasks__checkbox" key={idx}>{task.category} - {task.details}</div><br />
            </div>
          )
        } else if (!task.completed && currentHelpType) {
          return(
            <div className='task-container__list__incomplete' key={idx}>
              <input className='task-list__checkbox' type="checkbox" id={task.id} name='checkbox' onClick={alterTask} />
              <label className="tasks__checkbox" key={task.id} htmlFor={task.id}>{task.category} - {task.details}</label><br />
            </div>
          )
        } else if (!task.completed){
          return(
            <div className='task-container__list__incomplete' key={idx}>
              {!task.helperId ? 
              <i id={task.id} name='iWillHelp' onClick={alterTask} className="fas fa-hands-helping tasks__helping-hands-icon"></i> : null  }
              <div className="tasks__checkbox">{task.category} - {task.details}</div><br />
            </div>
          )
        }
      })
  }
```

The tasks list also utilized a react/redux store along with several queries on the backend for this information including patch requests to udpate information in the database when a task is completed or when a task is set to a helper.

```js

router.patch('/', requireAuth, asyncHandler(async (req, res) => {
    let { taskId, name, userId } = req.body
    const id = parseInt(taskId)
    const user = parseInt(userId)
    let task;
    if (!name) {
      task = await Task.update({ helperId: user }, {
        where: {
          id: id
        }
      });
    } else {
      task = await Task.update({ completed: true }, {
        where: {
          id: id
        }
      });
    }
      return res.json({
        task
      });
  }));

```


## FAQ

### What is a helper and helpee?

A helper is someone who is willing to run errands, do household chores, help mow the lawn, etc. for someone.  A helpee is someone who needs help or assistance in one of these areas

### Why help?

The purpose of this app is to create a sense of community between all the users.  As our society becomes more engrossed with technology it is important we don't forget those who are left behind who still need our help.

## Links

Get some help or help out today... follow this link to join help:

https://helpp.herokuapp.com/

## Contributor

* Dale Sakamoto - DaleTsakamoto @ GitHub
