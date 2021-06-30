package com.healthcare.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;

@Entity
@Table(name="users",uniqueConstraints= {
		@UniqueConstraint(columnNames="username"),
		@UniqueConstraint(columnNames="email"),
})
public class User {
	@Id
	@Size(max = 10)
	private String id;
	@Size(max = 50)
	private String name;
	@Size(max = 50)
	private String email;
	@Size(min=8,max = 20)
	private String username;
	@Size(min=6,max = 20)
	private String password;
	private String mobileNumber;
	private String role;
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	
}
