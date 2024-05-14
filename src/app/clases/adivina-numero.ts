export class AdivinaNumero {

    numeroSecreto: number = 0;
    numeroIngresado: number = 0;
    nombre="Adivina el numero";
    gano: boolean = false;
    intentos: number = 0;
    constructor(nombre?: string, gano?: boolean, intentos?:any,resultado?:string) {
     
    
      
      }
    public verificar() {
        if (this.numeroIngresado == this.numeroSecreto) {
          this.gano = true;
        }
        if (this.gano) {
          return true;
        } else {
          return false;
        }
     }
     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        console.info('numero Secreto:' + this.numeroSecreto);
        this.gano = false;
      }
      public retornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return "Falta";
        }
        return "Te pasaste";
      }
}
