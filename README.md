# Online HTML5 & CSS3 Resume

Live version available at [evilkanoa.github.io/WebResume](https://evilkanoa.github.io/WebResume/static/).

### Goals for my personal web resume  
1. Build a resume using static HTML and CSS files that can be viewed and hosted directly as well as prints nicely.
2. Convert the static resume to data only and use a (probably) node based generator to create the static files.
3. Create a "front-end" SPA to allow online, in browser editing of the resume, as well as saving and printing.

## Resume data format
```
{
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

