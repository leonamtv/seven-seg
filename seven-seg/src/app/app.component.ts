import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  bitMask: number = 0
  char1: string = ''
  char2: string = ''
  char3: string = ''
  char4: string = ''
  char5: string = ''
  char6: string = ''
  char7: string = ''
  char8: string = ''
  char9: string = ''
  char10: string = ''
  i: number = 0

  text: string = "Leonam Teixeira de Vasconcelos"

  chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]

  constructor () {
    const index =  ( n : number ) => {
      return n % this.text.length
    }

    setInterval (() => {
      this.char1 = this.text.charAt(index( this.i ))
      this.char2 = this.text.charAt(index( this.i + 1 ))
      this.char3 = this.text.charAt(index( this.i + 2 ))
      this.char4 = this.text.charAt(index( this.i + 3 ))
      this.char5 = this.text.charAt(index( this.i + 4 ))
      this.char6 = this.text.charAt(index( this.i + 5 ))
      this.char7 = this.text.charAt(index( this.i + 6 ))
      this.char8 = this.text.charAt(index( this.i + 7 ))
      this.char9 = this.text.charAt(index( this.i + 8 ))
      this.char10 = this.text.charAt(index( this.i + 9 ))
      this.i = ( this.i + 1 ) % this.text.length
    }, 600)
  }

}
