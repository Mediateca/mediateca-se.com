import { Component, ElementRef, OnInit } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';

interface PosElemento {
  inicial: string;
  final: string;
}

@Component({
  selector: 'div[mse-fondo]',
  templateUrl: './fondo.component.html',
  styleUrls: ['./fondo.component.scss'],
  animations: [
    trigger('fondoAnimado', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('3s ease-in-out', style({ opacity: 0 }))
      ]),
    ]),
  ]
})
export class FondoComponent implements OnInit {
  private fondoAnimado!: HTMLElement;
  private urlRuido: string = 'url("/assets/fondo/ruido.svg")';
  private primarioClaro: string = '#91a0c0';
  private primarioOscur: string = '#152a64';
  private acentoClaro: string = '#ffefc7';
  private acentoOscur: string = '#ffa71f';
  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
    const numRadiales: number = Math.floor(Math.random() * 5) + 3;
    window.setTimeout(() => {
      const background: string = [this.generaRadiales(numRadiales).join(', '), this.generaLinear(), this.urlRuido].join(', ');
      this.fondoAnimado = this.elementRef.nativeElement.firstElementChild;
      this.fondoAnimado.style.backgroundImage = background;
    }, 500);
  }
  getColor(nombre: string): string {
    const est: CSSStyleDeclaration = window.getComputedStyle(document.body);
    const salida: string = est.getPropertyValue('--' + nombre);
    return salida;
  }
  generaRadiales(numRadiales: number): string[] {
    const salida: string[] = [];
    let maxTam: number = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    maxTam = Math.floor(maxTam * 0.9);
    for (let num: number = 0; num < numRadiales; num++) {
      const tamCir: string = Math.floor((Math.random() * maxTam) + (maxTam * 0.1)) + 'px';
      const posCir: PosElemento = {
        inicial: Math.floor(Math.random() * 100) + '%',
        final: Math.floor(Math.random() * 100) + '%',
      };
      const claro: number = (Math.floor(Math.random() * 3) + 1) * 100;
      const oscur: number = (Math.floor(Math.random() * 3) + 7) * 100;
      const tipo: string = Math.random() < 0.5 ? 'colorPrimario' : 'colorAcento';
      const colorOscur: string = this.getColor(tipo + oscur);
      const colorClaro: string = this.getColor(tipo + claro);
      const radial: string[] = [
        `radial-gradient(${tamCir} circle at ${posCir.inicial} ${posCir.final}`,
        (colorOscur !== '' ? colorOscur : this.acentoOscur) + '78',
        (colorClaro !== '' ? colorClaro : this.acentoClaro) + '00)'
      ];
      salida.push(radial.join(','));
    }
    return salida;
  }
  generaLinear(): string {
    const inclina: string = Math.floor(Math.random() * 360) + 'deg';
    const claro: number = (Math.floor(Math.random() * 3) + 5) * 100;
    const oscur: number = (Math.floor(Math.random() * 3) + 7) * 100;
    const tipo: string = Math.random() < 0.5 ? 'colorPrimario' : 'colorAcento';
    const colorOscur: string = this.getColor(tipo + oscur);
    const colorClaro: string = this.getColor(tipo + claro);
    return `linear-gradient(${inclina},
                            ${colorOscur !== '' ? colorOscur : this.primarioOscur}78,
                            ${colorClaro !== '' ? colorClaro : this.primarioClaro}00)`;
  }
}
