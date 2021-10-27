import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sixteen-segment-digit',
  templateUrl: './sixteen-segment-digit.component.html',
  styleUrls: ['./sixteen-segment-digit.component.scss']
})
export class SixteenSegmentDigitComponent implements OnInit {

  public bitMask: number = 0b0000000
  private _character!: string;

  @Input() width: number = 360
  @Input() height: number = 500

  @Input() randomNoise: boolean = false;

  @Input() set character ( val: string ) {
    this._character = val
    this.setBitMask()
  }
  get character () { return this._character }

  @Input() shadowColor: string = '#51ff00'
  @Input() shadowBlur: number = 15
  @Input() backgroundColor: string = '#000000'
  @Input() colorOn: string = '#51ff00'
  @Input() colorOff: string = 'rgba(255, 255, 255, 0.1)'

  private bitMaskMap: any = {
    '0' :  75687,
    '1' :  38,
    '2' :  70541,
    '3' :  65965,
    '4' :  12332,
    '5' :  78225,
    '6' :  78761,
    '7' :  65573,
    '8' :  78765,
    '9' :  78253,
    'A' :  78381,
    'B' :  100781,
    'C' :  74625,
    'D' :  100773,
    'E' :  78721,
    'F' :  78337,
    'G' :  74665,
    'H' :  12844,
    'I' :  100737,
    'J' :  932,
    'K' :  12818,
    'L' :  9088,
    'M' :  25126,
    'N' :  25140,
    'O' :  74661,
    'P' :  78349,
    'Q' :  74677,
    'R' :  78365, 
    'S' :  78249,
    'T' :  100353,
    'U' :  9124,
    'V' :  9730,
    'W' :  9780,
    'X' :  17426,
    'Y' :  12716,
    'Z' :  66947,
    'a' :  7040,
    'b' :  15104,
    'c' :  4864,
    'd' :  2220,
    'e' :  5888,
    'f' :  38921,
    'g' :  112896,
    'h' :  14848,
    'i' :  2048,
    'j' :  35584,
    'k' :  34834,
    'l' :  8704,
    'm' :  6696,
    'n' :  6656,
    'o' :  6912,
    'p' :  111104,
    'q' :  112640,
    'r' :  4608,
    's' :  80128,
    't' :  13056,
    'u' :  2816,
    'v' :  1536,
    'w' :  1584,
    'x' :  17426,
    'y' :  32940,
    'z' :  5376,
    ' ' : 0
  }

  constructor() { }

  ngOnInit(): void { }

  private setBitMask () {
    if ( this._character && this._character.length > 0 ) {
      if ( this._character in this.bitMaskMap ) {
        this.bitMask = this.bitMaskMap[this._character.charAt(0)]
      }
    }
  }

}
