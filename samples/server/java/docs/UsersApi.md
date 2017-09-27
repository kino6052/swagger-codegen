# UsersApi

All URIs are relative to *https://localhost:9080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**userGET**](UsersApi.md#userGET) | **GET** /users/{id} | Get User
[**userPATCH**](UsersApi.md#userPATCH) | **PUT** /users/{id} | Update User
[**usersGET**](UsersApi.md#usersGET) | **GET** /users | Get All Users


<a name="userGET"></a>
# **userGET**
> User userGET(id)

Get User

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.UsersApi;


UsersApi apiInstance = new UsersApi();
String id = "id_example"; // String | ID of user to retrieve
try {
    User result = apiInstance.userGET(id);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling UsersApi#userGET");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| ID of user to retrieve |

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="userPATCH"></a>
# **userPATCH**
> User userPATCH(id, user)

Update User

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.UsersApi;


UsersApi apiInstance = new UsersApi();
String id = "id_example"; // String | ID of user to update
UserUpdate user = new UserUpdate(); // UserUpdate | User Update Data
try {
    User result = apiInstance.userPATCH(id, user);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling UsersApi#userPATCH");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| ID of user to update |
 **user** | [**UserUpdate**](UserUpdate.md)| User Update Data |

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="usersGET"></a>
# **usersGET**
> Users usersGET()

Get All Users

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.UsersApi;


UsersApi apiInstance = new UsersApi();
try {
    Users result = apiInstance.usersGET();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling UsersApi#usersGET");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Users**](Users.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

