require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URL).then(()=>console.log("done00000000000000"));

//database

const database = require("./database/index");

//initializing express
const shapeAI = express();

//congfigure

shapeAI.use(express.json());

//create first API//to get all books
/*
    route:/
    description:to get all books
    access:public
    parameter:none
    method:get
*/
shapeAI.get("/",(req,res)=>{
    return res.json({books:database.books});
});

// create api to get specifix books
/*
    route:/:isbn
    description:to get specific book based on isbn
    access:public
    parameter:isbn
    method:get
*/
shapeAI.get("/is/:isbn",(req,res)=>{
    const getspecificbook = database.books.filter((book)=>book.ISBN===req.params.isbn);
    if(getspecificbook.length===0){
        return res.json({Error:`no book found with ISBN ${req.params.isbn}`,
    });
    }
    return res.json({book:getspecificbook});
});

//create api to get book based on category
/*
route:/c
description:to get books based on category
access:public
parameter:category
method:get
*/

shapeAI.get("/c/:category",(req,res)=>{
    const getspecificbooks = database.books.filter((book)=>book.category.includes(req.params.category));
    if(getspecificbooks.length===0){
        return res.json({Error:`no book found with category of ${req.params.category}`,
    });
    }
    return res.json({book:getspecificbooks});
});

//////////////////////////////////////////
//create api to get book based on authors
/*
route:/a
description:to get books based on authors
access:public
parameter:authors
method:get
*/

shapeAI.get("/a/:authors",(req,res)=>{
    const getspecificbooks = database.books.filter((book)=>book.authors.includes(req.params.authors));
    if(getspecificbooks.length===0){
        return res.json({Error:`no book found with category of ${req.params.authors}`,
    });
    }
    return res.json({book:getspecificbooks});
});


//create api to get all authors
/*
route:/is
description:to get all authors
access:public
parameter:none
method:get
*/

shapeAI.get("/is/author",(req,res)=>{
   
    return res.json({authors:database.authors});
});


//create api to get specific authors
/*
route:/au
description:to get specific authors
access:public
parameter:id
method:get
*/

shapeAI.get("/au/:id",(req,res)=>{
    const getspecificauthor = database.authors.filter((author)=>author.id===parseInt(req.params.id));
    if(getspecificauthor.length===0){
        return res.json({Error:`no book found with author ${req.params.id}`,
    });
    }
    return res.json({author:getspecificauthor});
});



//create api to get list of authors based on isbn
/*
route:/author
description:to get specific authors
access:public
parameter:isbn
method:get
*/

shapeAI.get("/author/:isbn",(req,res)=>{
    const getspecificauthor = database.authors.filter((author)=>author.books.includes(req.params.isbn));
    if(getspecificauthor.length===0){
        return res.json({Error:`no book found with author ${req.params.isbn}`,
    });
    }
    return res.json({authors:getspecificauthor});
});


//create api to get all publications
/*
route:/p
description:to get all publications
access:public
parameter:none
method:get
*/

shapeAI.get("/publications",(req,res)=>{
   
    return res.json({publications:database.publications});
});

//create api to get specific publications
/*
route:/p
description:to get specific publications
access:public
parameter:id
method:get
*/

shapeAI.get("/p/:id",(req,res)=>{
   const publications = database.publications.filter((publication)=>publication.id===parseInt(req.params.id));
   if(publications.length===0){
       return res.json({error:"no such exist"});
   }
    return res.json({publicationss:database.publications});
});

//create api to get publications based on books
/*
route:/p
description:to get publications based on books
access:public
parameter:book
method:get
*/

shapeAI.get("/pb/:book",(req,res)=>{
   const publication = database.publications.filter((publication)=>publication.books.includes(req.params.book));
   if(publication.length===0){
       return res.json({error:"no such exist"});
   }
    return res.json({publicationns:database.publication});
});


//POST*************************



//create api to post books
/*
route:/p
description:to post books
access:public
parameter:book
method:post
*/

shapeAI.post("/book/new",(req,res)=>{
    const {newbook} = req.body;
    database.books.push(newbook);

    return res.json({books:database.books,message:"book was added"});
});

//create api add new author
/*
route:/author/new
description:to add new author
access:public
parameter:author
method:post
*/

shapeAI.post("/author/new",(req,res)=>{
    const {newauthor} = req.body;
    // const {newbook} = req.body;
    database.authors.push(newauthor);

    return res.json({authors:database.authors,message:"book was added"});
});


//PUT

/*
route:/book/update
description:update title of book
access:public
parameter:isbn
method:put
*/
shapeAI.put("/book/update/:isbn",(req,res)=>{
    //forEach directly modifies the array
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.title= req.body.bookTitle;
            return;
        }
    });

    return res.json({books:database.books});
});

/*
route:/book/author/update
description:update author of book
access:public
parameter:isbn
method:put
*/
shapeAI.put("/book/author/update/:isbn",(req,res)=>{
    //forEach directly modifies the array
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            
            return book.authors.push(req.body.newauthor);
        }
    });
    //update author database
    database.authors.forEach((author)=>{
        if(author.id===req.body.newauthor){
            return author.books.push(req.params.isbn);
        }
    });
    return res.json({books:database.books,authors:database.authors});
});


/*
route:/publications/update/book
description:to update new book to publication
access:public
parameter:isbn
method:put
*/
shapeAI.put("/publication/update/book/:isbn",(req,res)=>{
    //forEach directly modifies the array
    //update publication database
    database.publications.forEach((publication)=>{
        if(publication.id===req.body.pubid){
            
            return publication.books.push(req.params.isbn);
        }
    });
    //update author database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publication=req.body.pubid;
            return;
        }
    });
    return res.json({books:database.books,publications:database.publications});
});

//DELETE
/*
route:/book/delete
description:to delete a book
access:public
parameter:isbn
method:delete
*/
shapeAI.delete("/book/delete/:isbn",(req,res)=>{
    const updateddatabase=database.books.filter((book)=>{
        book.ISBN!==req.params.isbn;
    });
    database.books=updateddatabase;
    return res.json({books:database.books});
});

/*
route:/book/delete/author
description:to delete a author form book
access:public
parameter:isbn
method:delete
*/
shapeAI.delete("/book/delete/author/:isbn/:authorid",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const newauthorlist = book.authors.filter((author)=>{
                author !==parseInt(req.params.authorid);
            });
            book.authors= newauthorlist;
            return ;
        }
    });
    //update author database
    database.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.authorid)){
            const newbooklist = author.books.filter((book)=>{
                book !==req.params.isbn;
            });
            author.books=newbooklist;
            return;
        }
    });
    return res.json({book:database.books,author:database.authors});
});

/*
route:/publications/delete/book
description:to delete a book from publications
access:public
parameter:isbn publication id
method:delete
*/

shapeAI.delete("/publications/delete/book/:isbn/:pubid",(req,res)=>{
        database.publications.forEach((publication)=>{
            if(publication.id ===parseInt(req.params.pubid)){
                const newbooklist = publication.books.filter((book)=>{
                    book!==req.params.isbn;
                });
                publication.books=newbooklist;
                return;
            }

        });
        database.books.forEach((book)=>{
            book.publication=0;
            return;
        });
        return res.json({books:database.books,publication:database.publications});
});



shapeAI.listen(5000,()=>console.log("server is running"));

