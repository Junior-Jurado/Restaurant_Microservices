import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrl: './random.component.scss',
})
export class RandomComponent {
  constructor(private http: HttpClient) {}
  contador: number = 0;
  crearOrden() {
    var inputElement = document.getElementById('miInput') as HTMLInputElement;
    var valorInput = inputElement.value;

    if (valorInput.trim() === '') {
      alert('El campo no puede estar vacío');
    } else {
      this.contador++;
      const body = {
        orderNumber: this.contador,
        tableNumber: valorInput,
      };

      this.http.post('http://18.117.240.16/api/v1/order', body).subscribe(
        (response) => {
          console.log('Respuesta de la API:', response);
          // Aquí puedes manejar la respuesta de la API
        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
          // Aquí puedes manejar el error;
        }
      );
    }
  }
}
