import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'seven-segment-digit',
  templateUrl: './seven-segment-digit.component.html',
  styleUrls: ['./seven-segment-digit.component.scss']
})
export class SevenSegmentDigitComponent implements OnInit {
  
  public bitMask: number = 0b0000000
  private _character!: string;

  @Input() randomNoise: boolean = false;
  @Input() width: number = 360
  @Input() height: number = 500
  @Input() shadowColor: string = '#51ff00'
  @Input() shadowBlur: number = 10
  @Input() backgroundColor: string = '#000000'
  @Input() colorOn: string = '#51ff00'
  @Input() colorOff: string = 'rgba(255, 255, 255, 0.1)'
  
  @Input() set character ( val:  string ) {
    this._character = val
    this.setBitMask()
  }

  get character () {
    return this._character
  }

  private bitMaskMap: any = {
    '0' : 126,
    '1' : 48,
    '2' : 109,
    '3' : 121,
    '4' : 51,
    '5' : 91,
    '6' : 95,
    '7' : 112,
    '8' : 127,
    '9' : 123,
    'a' : 119,
    'b' : 31,
    'c' : 78,
    'd' : 61,
    'e' : 79,
    'f' : 71,
    'g' : 95,
    'h' : 55,
    'i' : 6,
    'j' : 60,
    'k' : 47,
    'l' : 14,
    'm' : 21,
    'n' : 118,
    'o' : 29,
    'p' : 103,
    'q' : 115,
    'r' : 5,
    's' : 91,
    't' : 15,
    'u' : 62,
    'v' : 62,
    'w' : 28,
    'x' : 55,
    'y' : 59,
    'z' : 109,
    ' ' : 0,
    '-' : 1
  }

  private setBitMask () {
    if ( this._character && this._character.length > 0 ) {
      if ( this._character.toLowerCase() in this.bitMaskMap ) {
        this.bitMask = this.bitMaskMap[this._character.toLowerCase().charAt(0)]
      }
    }
  }

  constructor() {  }

  ngOnInit(): void { }

}
