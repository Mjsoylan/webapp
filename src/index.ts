// Importerer nødvendige moduler
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from 'node:fs/promises'

// Oppretter en ny Hono-applikasjon
const app = new Hono();

// Aktiverer CORS (Cross-Origin Resource Sharing) for alle ruter
app.use("/*", cors());

// Setter opp statisk filbetjening for filer i "static" mappen
app.use("/static/*", serveStatic({ root: "./" }));

const projeckt = [
  {
    projectName: "cheese",
    link:"https://no.wikipedia.org/wiki/Cheese",
    date:"1990-06-01","img":"/static/imgs/cheese.jpg",
    image:"./static/imgs/cheese.jpg",
    projectInfo:"the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax,the cheese tax this is refrence to a meme i do belive"
  },
  {
    projectName: "milk",
    link:"https://no.wikipedia.org/wiki/Milk",
    date:"2023-07-21",
    image:"./static/imgs/milk.jpg",
    projectInfo:"milk is a thing you can drink or sell? or make into other stuff like cheese and then you use that cheese to make pizza and thats a other projcet here!"
  },
  {
    projectName:  "onions",
    link:"https://no.wikipedia.org/wiki/R%C3%B8dl%C3%B8k",
    date:"2023-08-02",
    image:"./static/imgs/onions.jpg",
    projectInfo:"its a food item that while preparing can cause you to cry very sad, its becuase the onion relases a gas that iratetes the eye as a self defensemechanisme"
  },
  {
    projectName: "pizza",
    link:"https://no.wikipedia.org/wiki/Pizza",
    date:"2023-09-19",
    image:"./static/imgs/pizza.jpg",
    projectInfo:"its food item that should have pinaple on it, its pretty good, for some reason ppl can get very heated over this topic and thats odd since its such a simple thing if we are gonna complain on what to have on pizza there is pizza with bannan on it and it seems cursed but you make your pizza how you want to"
  },
  {
    projectName: "ikea",
    link:"https://no.wikipedia.org/wiki/IKEA",
    date:"2024-01-30",
    image:"./static/imgs/ikea.png",
    projectInfo:"ikea is a store that sell stuff now for eksemple text i will add a bunch of copies of that text:ikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuffikea is a store that sell stuff"
  },
];

app.get("/json", async (c) => {
  const data = await fs.readFile('./static/data.json', 'utf8')
  const dataAsJson = JSON.parse(data)
  return c.json(dataAsJson);
});

app.post("/add", async (c) => {
  const newProjectName = await c.req.json();
  const newLink = await c.req.json();
  const newDate = await c.req.json();
  const newImg = await c.req.json();
  projeckt.push({  ...newProjectName ,  ...newLink , ...newDate, ...newImg  });
  return c.json(projeckt, { status: 201 });
});
app.get("/", (c) => {
  return c.json(projeckt);
});
const port = 8008;
console.log(`Server is running on port ${port}`);

// Starter serveren
serve({
  fetch: app.fetch,
  port,
});
