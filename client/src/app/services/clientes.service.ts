import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
 private  apiUrl = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }

  getClientes(): Observable<any>{
    const token = localStorage.getItem('token')

    const headers= new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get(this.apiUrl+'/clientes', {headers})
  }

  addCliente(cliente:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
    });
    return this.http.post(this.apiUrl+'/clientes', cliente, { headers })
  }

  updateCliente(id:number, cliente:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl+'/clientes'}/${id}`, cliente,{ headers })
  }

  deleteCliente(id:number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl+'/clientes'}/${id}`, { headers })
  }
}
