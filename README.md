[![Build Status](https://travis-ci.org/cstudio7/TeamWork.svg?branch=dev)](https://travis-ci.org/cstudio7/TeamWork) [![Coverage Status](https://coveralls.io/repos/github/cstudio7/TeamWork/badge.svg?branch=dev)](https://coveralls.io/github/cstudio7/TeamWork?branch=dev)
 
Teamwork

Teamwork is an remote online platform where employees of a particular company meets for social reason, where everyone can communicate for mutual benefits.


 ## Features

1. Admin can create a new employee account.
2. User can sign in.
3. User (employee) can post an article.
4. User (employee) can update an article.
5. User (employee) can delete an article.
6. User (employee) can comment on an article.
7. User (employee) can get a specific route.
8. User (employee) can get all articles.
9. User (employee) can post a gif.
10. User (employee) can delete a gif.
11. User (employee) can comment on a particular gif
12. User (employee) can view all gifs post.
13. User (employee) can flag a comment.
14. Admin can delete a posted AD record.



## Optional Features


 1. User can view all gifs.
 2. User can flag/report a posted AD as fraudulent.
 3. Admin can delete a comment.


 
## Technologies utilised

- HTML, CSS and Javascript (UI interface),
- Node js (Server environment),
- Express (Web framework),
- Mocha, chai (Testing framework),
- Babel (Compiler),
- Eslint; Airbnb (Coding style),
- Travis CI (Continuous integration),
- Swagger (API Documentation),
- Coveralls (test coverage)









| Verb     | Endpoint                                                           | Action
| :------- | :---------------------------------------------------------------   | :---------------------------------------------
| POST     | /api/v1/auth/create-up                                             | Create a new user
| POST     | /api/v1/auth/signin                                                | Signin an existing user
| POST     | /api/v1/article                                                    | Post an article
| POST     | /api/v1/article/:articleId/comment                                 | Post a comment
| GET      | /api/v1/article/:articleId                                         | get a specific article
| GET      | /api/v1/feed                                                       | View all articles
| PATCH    | /api/v1/article/:articleId                                         | Update a specific article
| DELETE   | /api/v1/article/:articleId                                         | Delete a specific article
| POST     | /api/v1/gifs                                                       | Post a gif
| DELETE   | /api/v1/gif/:gifId                                                 | Delete a gif post
| POST     | /api/v1/gifs/:gifId/comment                                        | Post a comment
| GET      | /api/v1/gif/:gifId                                                 | Get a specific gif post
| GET      | /api/v1/feeds                                                      |Get all gifs posted
| POST     | /api/v1/flag                                                       | Post a flagged comment to admin
| DELETE   | /api/v1/flag/:flagId                                               | Delete a flagged post



## Author

**Victor Godwin**
