# Mid Term Gigih Backend Project


## Live Deployment
The API Server are deployed on Vercel that can be accessed with the following link https://gigih3-gy95.vercel.app/videos
## Database Schema
Database: `tokopedia-play`

Colletions:
1. `videoThumbnail` : This collection will store information about each video data.

    document structure
    
    ### Videos Object
    ```
    {
        _id: number,
        title: string,
        thumbnailURL: string.
        createdAt: Date,
        updatedAt: Date.
    }
    ```

2. `products` : This collection will store information about each product data.

    document structure
    
    ### Products Object
    ```
    {
        _id: number,
        title: string,
        url: string,
        price: string,
        videoID: string,
        createdAt: Date,
        updatedAt: Date        
    }
    ```

3. `comments` : This collection will store information about each comment data.

    document structure
    
    **#Comments Object**
    ```
    {
        _id: number,
        username: string,
        comment: string,
        videoID: string,
        createdAt: Date,
        updatedAt: Date,
        timestamps: Date,
    }
    ```

## API Structure
Flow from request to get response.
### Videos
---
**GET /videos/:id**
```
request ->  controller [findVideoByID()] -> TypeGoose model -> response
```

**POST /videos/**
```
request ->  controller [addVideo()] -> TypeGoose model -> response
```
**PUT /videos/:id**
```
request ->  controller [updateVideoByID()] -> TypeGoose model -> response
```
**DELETE /videos/:id**
```
request ->  controller [deleteVideoByID()] -> TypeGoose model -> response
```

### Products
---
**GET /products/video/:id**
```
request ->  controller [findProductByVideoID()] -> TypeGoose model -> response
```

**GET /products/:id**
```
request ->  controller [findProductByID()] -> TypeGoose model -> response
```

### Comments
---
**GET /comments/video/:videoID**
```
request ->  controller [getComments()] -> TypeGoose model -> response
```
**POST /comments/video/:videoID**
```
request -> controller [postComment()] -> TypeGoose Model -> response
```

## List API Request Response
### Videos
#### **GET /video/:id**
---
Return videos by id.

* **URL Params**
    id: string
    
* **Headers**
  
    Content-Type: application/json
* **Body**

    None
* **Success Response**
    - Code: 200 (OK)
    - Content:
```json
{
  "msg": "Sucessfully find the video",
  "data": {
      "id": "number",
      "title": "string",
      "thumbnailURL": "string"
  }
}
```
* **Error Response**
    - Code: 404 (NOT FOUND)
    - Content: 
    ```json
    { 
        "msg":"Video not found",
    }
    ```

    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }
    ```
#### **DELETE /video/:id**
---
Delete video by id.

* **URL Params**
    id: string
    
* **Headers**
  
    Content-Type: application/json
* **Body**

    None
* **Success Response**
    - Code: 200 (OK)
    - Content:
```json
{
  "msg": "Video with ID ${id} sucessfully deleted.",
}
```
* **Error Response**
    - Code: 404 (NOT FOUND)
    - Content: 
    ```json
    { 
        "msg":"Video not found",
    }
    ```

    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }
    ```
#### **POST /video/**
---
Delete video by id.

* **URL Params**
    None
      
* **Headers**
  
    Content-Type: application/json
* **Body**
    title: string
    thumbnailURL: stirng
    
* **Success Response**
    - Code: 200 (OK)
    - Content:
```json
{
  "msg": "Sucessfully created the video"
}
```
* **Error Response**
    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }
    ```

#### **PUT /video/:id**
---
Update video by id.

* **URL Params**
    None
      
* **Headers**
  
    Content-Type: application/json
* **Body**
    id: number
    title: string
    thumbnailURL: stirng
  
* **Success Response**
    - Code: 200 (OK)
    - Content:
```json
{
  "msg": "Video is updated"
}
```
* **Error Response**
    - Code: 404 (NOT FOUND)
    - Content: 
    ```json
    { 
        "msg":"Video not found",
    }
    ```

    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }
    ```
    
### Products
#### **GET /products/:id**
---
Return product by id.

* **URL Params**
    id: string
    
* **Headers**
  
    Content-Type: application/json
* **Body**

    None
* **Success Response**
    - Code: 200 (OK)
    - Content:
```json
{
  "msg": "Sucessfully find the video",
  "data": {
      "id": "number",
      "title": "string",
      "url": "string",
      "price": "number"
  }
}
```
* **Error Response**
    - Code: 404 (NOT FOUND)
    - Content: 
    ```json
    { 
        "msg":"Product not found",
    }
    ```

    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }
    ```
#### **DELETE /products/:id**
---
Delete product by id.

* **URL Params**
    id: string
    
* **Headers**
  
    Content-Type: application/json
* **Body**

    None
* **Success Response**
    - Code: 200 (OK)
    - Content:
```json
{
  "msg": "Product with ID ${id} sucessfully deleted.",
}
```
* **Error Response**
    - Code: 404 (NOT FOUND)
    - Content: 
    ```json
    { 
        "msg":"Product not found",
    }
    ```

    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }
    ```

#### **PUT /products/:id**
---
Update product by id.

* **URL Params**
    None
      
* **Headers**
  
    Content-Type: application/json
* **Body**
    id: number
    title: string
    url: stirng
    price: number
* **Success Response**
    - Code: 200 (OK)
    - Content:
```json
{
  "msg": "Product is updated"
}
```
* **Error Response**
    - Code: 404 (NOT FOUND)
    - Content: 
    ```json
    { 
        "msg":"Product not found",
    }
    ```

    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }
    ```

### Comments
#### **GET /comments/video/:videoID**
---
Return all comments from videoID.

* **URL Params**
  videoID: number
    
* **Headers**
  
    Content-Type: application/json
* **Body**

    None
* **Success Response**
    - Code: 200 (OK)
    - Content:
```json
"msg": "Successfully find the comments",
"data" : [
    {...},
    {...},
    {...},[
        {
            "id": "number",
            "username": "string",
            "comment": "string",
            "timestamp": "string",
        },
    ]
]
```
* **Error Response**
    - Code: 404 (NOT FOUND)
    - Content: 
    ```json
    { 
        "msg":"Video not found",
    }
    ```
    
    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }
    ```
#### **POST /comments/video/:videoID**
---
Create a new comment for a video
* **URL Params**
    id: string
* **Headers**
  
    Content-Type: application/json
* **Body**
    username: string
    comment: string
* **Success Response**
    - Code: 201 (CREATED)
    - Content:
```json
{
    "msg": "Successfully added the comment!"
}
```
* **Error Response**
    - Code: 404 (NOT FOUND)
    - Content: 
    ```json
    { 
        "msg":"Video not found",
    }
    ```
    
    - Code: 500 (Internal Server Error)
    - Content:
    ```json
    {
      "error": "error.message"
    }

## How to Run the Server
To run this server API, you have to follow instruction below:

1. **Clone this github**, run this command line: `https://github.com/rifqoi/gigih3`
2. **Change directory to midterm**, `cd midterm`
3. **Open your code editor** and access the project folder.
4. **Install dependencies** on project by running this command line: `npm install`. Make sure you are running in exact same folder project.
5. Open terminal and run this this command line `docker compose up -d` make sure to run it in the folder you just cloned .
6. **Open mongosh console**, `mongosh -u admin -p admin`
7. Create new database, `use tokopedia-play`
8. Create new user with specified roles,`db.createUser({user: "tokopediaAdmin", pwd: "password", roles: [{role: "readWrite", db: "tokopedia-play"}]})`
9. Back to the **project folder** and **rename .env.example** file into **.env** and do the instruction inside the file for configuration MongoDB connection Host.
10. Now you can **run the server** by following this command line: `npm run start`.
11. After make sure the server not getting any error, **open Postman or other app** to test the API.
12. Finally, you can **test the API** by hit the request as much as you want.
