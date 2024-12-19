import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'http://localhost:8080/api/users'; // Spring Boot API base URL

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login user
  loginUser(loginData: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, loginData, { headers });
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`);
  }

  // Update user details
  updateUser(userId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, updatedData);
  }

  // Delete a user
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
