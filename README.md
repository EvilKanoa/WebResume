# Online HTML5 & CSS3 Resume Editor

## Demos
* Online editor demo available at [kanoa-resume.herokuapp.com/](https://kanoa-resume.herokuapp.com/#/).
* Live version of static resume available at [evilkanoa.github.io/WebResume](https://evilkanoa.github.io/WebResume/static/).

## Project goals and progress
### Goals for my personal web resume  
1. Build a resume using static HTML and CSS files that can be viewed and hosted directly as well as prints nicely.
2. Convert the static resume to data only and use a (probably) node based generator to create the static files.
3. Create a "front-end" SPA to allow online, in browser editing of the resume, as well as saving and printing.

### Actual process
1. Built a static resume using HTML and CSS3 that is now live on `gh-pages`.
2. Used that static resume as a stepping stone to create a React site that takes in a resume in the format specified below and produces the same output as the static resume.
3. Modified the React based generator to add a JSON editor and some common actions.
4. Used the current React editor and a new Express server to enable instant collaboration and data persistence with WebSockets (Sockets.io) and a persistent cache (MongoDB).

## Resume editor
Available at root repo level. Requires NodeJS 10+ and MongoDB.

#### Developing Editor
For development:
1. Clone repo.
2. Copy `.env.sample` into `.env` and configure it as required.
3. Run `npm install`.
4. Start the development server using `npm run dev`.

#### Building and Deploying Editor
For a production ready build and server:
1. Clone repo.
2. Copy `.env.sample` into `.env` and configure it as required.
3. Run `npm install`, then `npm run build`. Static files are ready to be served in the `dist` folder.
4. Use `npm run prod` to run the production server and serve the `dist` folder.

## Resume data format
```
{
	"type": "res" | "ltr" (defaults to res),
	"meta": {
		"author": string,
		"date": string,
		"description": string
	},
	"data": {
		"name": string,
		"title": string,
		"contact": [{
			"icon": string (currently restricted to FontAwesome),
			"link": string,
			"label": string,
		}],
		"details": [
			{
				"type": "summary",
				"label": string,
				"summary": string
			},
			{
				"type": "skills",
				"skillsets": [{
					"label": string,
					"skills": string
				}]
			},
			{
				"type": "details",
				"label": string,
				"items": [{
					"title": string,
					"description": string
				]}
			}
		],
		"events": [{
			"label": string (e.g., "experience", "education", "projects"),
			"icon": string (currently restricted to FontAwesome),
			"items": [{
				"title": string,
				"subtitle": string,
				"date": string,
				"description": string,
				"details": [string]
			}]
		}]
	}
}
```
