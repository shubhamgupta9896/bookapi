let books = [
    {
        ISBN:"12345one",
        title:"getting started with MErN",
        authors:[1,2],
        language:"en",
        pubdate:"2021-07-07",
        numofpage:225,
        category:["fiction","programming","tech","web dev"],
        publication:1,
    },
    {
        ISBN:"12345two",
        title:"getting started with python",
        authors:[1,2],
        language:"en",
        pubdate:"2021-07-07",
        numofpage:225,
        category:["fiction","programmin","tech","web dev"],
        publication:1,
    },
];

const authors = [
    {
        id:1,
        name:"pavan",
        books:["12345one"],
    },
    {
        id:2,
        name:"deepak",
        books:["12345one"],
    },
    
];

const publications = [
    {
        id:1,
        name:"chakra",
        books:["12345one"],
    },
    {
        id:2,
        name:"vicky",
        books:["12345two"],
    },
];
module.exports={books,authors,publications};