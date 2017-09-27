/*
 * Pure Access REST API
 * REST API Specification for Pure Access/TruCred Integration. 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: kirill@isonas.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


package io.swagger.client.model;

import java.util.Objects;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;

/**
 * User
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaClientCodegen", date = "2017-09-26T14:18:58.574-06:00")
public class User {
  @SerializedName("id")
  private Integer id = null;

  @SerializedName("displayName")
  private String displayName = null;

  @SerializedName("firstName")
  private String firstName = null;

  @SerializedName("lastName")
  private String lastName = null;

  @SerializedName("mi")
  private String mi = null;

  @SerializedName("employeeId")
  private Integer employeeId = null;

  @SerializedName("image")
  private String image = null;

  @SerializedName("notificationEmail")
  private String notificationEmail = null;

  @SerializedName("userDefinedFields")
  private Object userDefinedFields = null;

  @SerializedName("disable")
  private Boolean disable = null;

  public User id(Integer id) {
    this.id = id;
    return this;
  }

   /**
   * Get id
   * @return id
  **/
  @ApiModelProperty(value = "")
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public User displayName(String displayName) {
    this.displayName = displayName;
    return this;
  }

   /**
   * Get displayName
   * @return displayName
  **/
  @ApiModelProperty(value = "")
  public String getDisplayName() {
    return displayName;
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }

  public User firstName(String firstName) {
    this.firstName = firstName;
    return this;
  }

   /**
   * Get firstName
   * @return firstName
  **/
  @ApiModelProperty(value = "")
  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public User lastName(String lastName) {
    this.lastName = lastName;
    return this;
  }

   /**
   * Get lastName
   * @return lastName
  **/
  @ApiModelProperty(value = "")
  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public User mi(String mi) {
    this.mi = mi;
    return this;
  }

   /**
   * Get mi
   * @return mi
  **/
  @ApiModelProperty(value = "")
  public String getMi() {
    return mi;
  }

  public void setMi(String mi) {
    this.mi = mi;
  }

  public User employeeId(Integer employeeId) {
    this.employeeId = employeeId;
    return this;
  }

   /**
   * Get employeeId
   * @return employeeId
  **/
  @ApiModelProperty(value = "")
  public Integer getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Integer employeeId) {
    this.employeeId = employeeId;
  }

  public User image(String image) {
    this.image = image;
    return this;
  }

   /**
   * Get image
   * @return image
  **/
  @ApiModelProperty(value = "")
  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public User notificationEmail(String notificationEmail) {
    this.notificationEmail = notificationEmail;
    return this;
  }

   /**
   * Get notificationEmail
   * @return notificationEmail
  **/
  @ApiModelProperty(value = "")
  public String getNotificationEmail() {
    return notificationEmail;
  }

  public void setNotificationEmail(String notificationEmail) {
    this.notificationEmail = notificationEmail;
  }

  public User userDefinedFields(Object userDefinedFields) {
    this.userDefinedFields = userDefinedFields;
    return this;
  }

   /**
   * Get userDefinedFields
   * @return userDefinedFields
  **/
  @ApiModelProperty(value = "")
  public Object getUserDefinedFields() {
    return userDefinedFields;
  }

  public void setUserDefinedFields(Object userDefinedFields) {
    this.userDefinedFields = userDefinedFields;
  }

  public User disable(Boolean disable) {
    this.disable = disable;
    return this;
  }

   /**
   * Get disable
   * @return disable
  **/
  @ApiModelProperty(value = "")
  public Boolean isDisable() {
    return disable;
  }

  public void setDisable(Boolean disable) {
    this.disable = disable;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return Objects.equals(this.id, user.id) &&
        Objects.equals(this.displayName, user.displayName) &&
        Objects.equals(this.firstName, user.firstName) &&
        Objects.equals(this.lastName, user.lastName) &&
        Objects.equals(this.mi, user.mi) &&
        Objects.equals(this.employeeId, user.employeeId) &&
        Objects.equals(this.image, user.image) &&
        Objects.equals(this.notificationEmail, user.notificationEmail) &&
        Objects.equals(this.userDefinedFields, user.userDefinedFields) &&
        Objects.equals(this.disable, user.disable);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, displayName, firstName, lastName, mi, employeeId, image, notificationEmail, userDefinedFields, disable);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class User {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    displayName: ").append(toIndentedString(displayName)).append("\n");
    sb.append("    firstName: ").append(toIndentedString(firstName)).append("\n");
    sb.append("    lastName: ").append(toIndentedString(lastName)).append("\n");
    sb.append("    mi: ").append(toIndentedString(mi)).append("\n");
    sb.append("    employeeId: ").append(toIndentedString(employeeId)).append("\n");
    sb.append("    image: ").append(toIndentedString(image)).append("\n");
    sb.append("    notificationEmail: ").append(toIndentedString(notificationEmail)).append("\n");
    sb.append("    userDefinedFields: ").append(toIndentedString(userDefinedFields)).append("\n");
    sb.append("    disable: ").append(toIndentedString(disable)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}

