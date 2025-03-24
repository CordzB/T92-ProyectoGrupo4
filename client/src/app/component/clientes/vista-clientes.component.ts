import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-vista-clientes',
  imports: [CommonModule],
  templateUrl: './vista-clientes.component.html',
  styleUrl: './vista-clientes.component.scss'
})
export class VistaClientesComponent implements OnInit {
  clientes: any[] = []
  errorMessage: string = ''
  nuevoCliente = {nombre: '', correo: '', telefono: ''}
  constructor(private clienteService: ClientesService ){}

  ngOnInit(){
      this.obtenerClientes()
  }

  obtenerClientes() {
    this.errorMessage = ''
    this.clienteService.getClientes().subscribe({
      next: (data) => {
      this.clientes = data;
      },
      error: (error) => {
        console.error('Error al obtener clientes:', error);

        if (error.status === 401) {
          this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }

      }
    });
  }

  agregarCliente() {
    this.clienteService.addCliente(this.nuevoCliente).subscribe(() => {
      this.obtenerClientes();
      this.nuevoCliente = { nombre: '', correo: '', telefono: '' };
    });
  }

  editarCliente(cliente: any) {
    this.nuevoCliente = { ...cliente };
  }

  actualizarCliente(id: number) {
    this.clienteService.updateCliente(id, this.nuevoCliente).subscribe(() => {
      this.obtenerClientes();
      this.nuevoCliente = { nombre: '', correo: '', telefono: '' };
    });
  }

  eliminarCliente(id: number) {
    this.clienteService.deleteCliente(id).subscribe(() => {
      this.obtenerClientes();
    });
  }


}
