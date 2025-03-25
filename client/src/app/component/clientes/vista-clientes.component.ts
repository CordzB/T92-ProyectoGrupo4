import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface Cliente {
  id_cliente: number;
  nombre: string;
  correo: string;
  telefono: string;
  fecha_registro: string;
}
@Component({
  selector: 'app-vista-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vista-clientes.component.html',
  styleUrl: './vista-clientes.component.scss'
})


export class VistaClientesComponent implements OnInit {
  clientes: Cliente[] = []
  errorMessage: string = ''
  nuevoCliente = {id_cliente: 0, nombre: '', correo: '', telefono: ''}
  constructor(private clienteService: ClientesService ){}

  ngOnInit(){
      this.obtenerClientes()
  }

  obtenerClientes() {
    this.errorMessage = ''
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        console.log('Clientes recibidos:', data);
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
    // Si existe un id, se supone que se trata de una edición.
    if (this.nuevoCliente.id_cliente) {
      this.clienteService.updateCliente(this.nuevoCliente.id_cliente, this.nuevoCliente).subscribe(() => {
        this.obtenerClientes();
        this.limpiar();
        Swal.fire('Actualizado', 'El cliente ha sido actualizado.', 'success')
      });
    } else {
      // Si no existe id, se crea un nuevo cliente.
      this.clienteService.addCliente(this.nuevoCliente).subscribe(() => {
        this.obtenerClientes();
        this.limpiar();
        Swal.fire('Exito', 'El cliente ha sido creado.', 'success');

      });
    }
  }

  editarCliente(cliente: any) {
    this.nuevoCliente = { ...cliente };
  }

  actualizarCliente(id: number) {
    this.clienteService.updateCliente(id, this.nuevoCliente).subscribe(() => {
      this.obtenerClientes();
      this.nuevoCliente = { id_cliente: 0,nombre: '', correo: '', telefono: '' };
    });
  }

  eliminarCliente(id: number) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¿Esta seguro de eliminar al cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result)=>{
      if(result.isConfirmed){
      // si decidio eliminar el usuario
      this.clienteService.deleteCliente(id).subscribe(() => {
        this.obtenerClientes();
        Swal.fire('Eliminado', 'El cliente ha sido eliminado.', 'success');
      })
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        // si da clic en no se cancela la eliminación.
        Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'error');
      }
    })
 
  }
  limpiar() {
    this.nuevoCliente = { id_cliente: 0, nombre: '', correo: '', telefono: '' };
  }



}
