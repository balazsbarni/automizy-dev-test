## Management endpoints

### List
#### request URL: {root}/api/management
#### method: GET
#### path parameter: none
#### query string paremeter: none
#### request type: JSON
#### request body parameters: none
#### limitation: none
#### example request:
```
    curl --request GET 
         --url {root}/api/management 
         --header 'content-type: application/json'
```
#### example response 200
```
{
    "managements": [
        {
            "id": "1",
            "student_id": "1",
            "project_id": "1",
            "createdAt": "Thu Jun 18 2020 11:50:53 GMT+0000 (Coordinated Universal Time)",
            "updatedAt": "Thu Jun 18 2020 11:50:53 GMT+0000 (Coordinated Universal Time)"
        }
    ]
}
```

### Read
#### request URL: {root}/api/management/{:id}
#### method: GET
#### path parameter: id(req): the unique identifier for the management item
#### query string paremeter: none
#### request type: JSON
#### request body parameters: none
#### limitation: none
#### example request:
```
    curl --request GET 
         --url {root}/api/management/1 
         --header 'content-type: application/json'
```
#### example response 200
```
{
    "managements": [
        {
            "id": "1",
            "student_id": "1",
            "project_id": "1",
            "createdAt": "Thu Jun 18 2020 11:50:53 GMT+0000 (Coordinated Universal Time)",
            "updatedAt": "Thu Jun 18 2020 11:50:53 GMT+0000 (Coordinated Universal Time)"
        }
    ]
}
```

### Create
#### request URL: {root}/api/management
#### method: POST
#### path parameter: none
#### query string paremeter: none
#### request type: JSON
#### request body parameters: 
  * student_id(req, num):  the unique identifier for the student
  * project_id(req, num):  the unique identifier for the project
#### limitation: none
#### example request:
```
    curl --request POST 
         --url {root}/api/management 
         --header 'content-type: application/json'
         --data { "student_id": 1, "project_id": 1 }
```
#### example response 201
```
{
    "id": "1",
    "student_id": "1",
    "project_id": "1",
    "createdAt": "Thu Jun 18 2020 11:50:53 GMT+0000 (Coordinated Universal Time)",
    "updatedAt": "Thu Jun 18 2020 11:50:53 GMT+0000 (Coordinated Universal Time)"
}
```

### Delete
#### request URL: {root}/api/management/{:id}
#### method: DELETE
#### path parameter: id(req): the unique identifier for the management item
#### query string paremeter: none
#### request type: JSON
#### request body parameters: none
#### limitation: none
#### example request:
```
    curl --request DELETE
         --url {root}/api/management/1 
         --header 'content-type: application/json'
```
#### example response 200
```
{
    "id": "1"
}
```

### Read by student
#### request URL: {root}/api/management/student/{:id}
#### method: GET
#### path parameter: id(req): the unique identifier for the student
#### query string paremeter: none
#### request type: JSON
#### request body parameters: none
#### limitation: none
#### example request:
```
    curl --request GET 
         --url {root}/api/management/student/1 
         --header 'content-type: application/json'
```
#### example response 200
```
{
    "projects": [
        {
            "id": "1",
            "name": "MyProjectChanged",
            "description": "my awsome project description changed",
            "createdAt": "Thu Jun 18 2020 11:07:16 GMT+0000 (Coordinated Universal Time)",
            "updatedAt": "Thu Jun 18 2020 11:09:00 GMT+0000 (Coordinated Universal Time)"
        }
    ]
}
```

### Read by project
#### request URL: {root}/api/management/project/{:id}
#### method: GET
#### path parameter: id(req): the unique identifier for the project
#### query string paremeter: none
#### request type: JSON
#### request body parameters: none
#### limitation: none
#### example request:
```
    curl --request GET 
         --url {root}/api/management/project/1 
         --header 'content-type: application/json'
```
#### example response 200
```
{
    "students": [
        {
            "id": "1",
            "first_name": "Bat",
            "last_name": "man",
            "email": "barman@gmail.com",
            "createdAt": "Thu Jun 18 2020 10:51:33 GMT+0000 (Coordinated Universal Time)",
            "updatedAt": "Thu Jun 18 2020 10:56:12 GMT+0000 (Coordinated Universal Time)"
        }
    ]
}
```