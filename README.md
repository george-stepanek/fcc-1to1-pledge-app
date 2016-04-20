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

* You can update or add pledges, and added pledges must contain all of the fields shown below.
* Make sure the syntax is *exactly* as shown, otherwise it will fail to deploy.
* The "no" field is used to identify a specific pledge, and must be unique for each pledge.
* The "title" field is used in the URLs for social share (e.g. http://fcc-1to1-pledge-app.herokuapp.com/pledge/straws-suck)  so it's recommended to not change it too often.
* The "category" must be in lower case, and one of *energy, food, transportation, waste* or *water.*
* The "impactUnits" should be plural.
* Images should be 1800 pixels wide by 1200 high, and saved as medium/low quality (ideally no more than 300 kB).
* Thumbnails should be 600 pixels wide by 400 high, and also saved as medium/low quality (ideally no more than 75 kB).
```
{
	"no": 1,
	"title": "Straws Suck",
	"explanation": "Refuse straws when eating out. People in the US throw away over 500 million straws a day!",
	"category": "waste",
	"impactPerWeek": 12,
	"impactUnits": "straws",
	"source": "Eco-cycle",
	"citation": "http://www.ecocycle.org/bestrawfree/faqs",
	"imageUrl": "/public/images/straws-suck.jpg",
	"thumbnailUrl": "/public/images/straws-suck-thumb.jpg"
},
```
