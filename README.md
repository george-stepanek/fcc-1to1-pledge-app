This application was created by [Herman Fassett](http://freecodecamp.com/hermanfassett) and [George Stepanek](http://www.freecodecamp.com/george-stepanek) for the [1to1 Movement](http://1to1movement.org/).

How to Edit Pledges
------------

1. Navigate to http://github.com/george-stepanek/fcc-1to1-pledge-app/edit/master/app/seed/pledges.json
2. Edit the file to make the required changes (see below for suggestions and advice).
3. Scroll down to the *Commit Changes* section, add a comment in the "Update pledges.json" textbox, and click the **Commit Changes** button.
3. Navigate to http://dashboard.heroku.com/apps/fcc-1to1-pledge-app/deploy/github
4. Scroll down to the the *Manual Deploy* section at the bottom of the page, making sure that "master" is selected in the dropdown, and click the **Deploy Branch** button.
5. Wait until the deploy finishes and it says "Your app was successfully deployed."

Pledge Json File FAQ
------------

* The "no" field is used to identify a specific pledge, and must be unique for each pledge.
* The "title" field is used in the URLs for social share (e.g. http://fcc-1to1-pledge-app.herokuapp.com/pledge/recycle)  so it's recommended to not change it too often.
